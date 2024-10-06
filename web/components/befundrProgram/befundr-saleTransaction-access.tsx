/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getATA, getOrCreateATA } from '@/utils/functions/AtaFunctions';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  confirmTransaction,
  convertNumberToSplAmount,
} from '@/utils/functions/utilFunctions';
import { transformAccountToSaleTransaction } from '@/utils/functions/saleTransactionFunctions';

//* TYPE
interface CreateSaleTransactionArgs {
  projectPdaPublicKey: PublicKey;
  contributionPdaPublicKey: PublicKey;
  userPdaPublicKey: PublicKey;
  userWallet: PublicKey;
  sellingPrice: number;
}

interface CompleteSaleTransactionArgs {
  projectPdaKey: PublicKey;
  contributionPdaKey: PublicKey;
  sellerUserPdaKey: PublicKey;
  buyerUserPdaKey: PublicKey;
  buyerWallet: PublicKey;
  sellerPubkey: PublicKey;
}

export function useBefundrProgramSaleTransaction() {
  const { sendTransaction } = useWallet();
  const { program, programId, transactionToast, router, connection } =
    useBefundrProgramGlobal();

  //* QUERIES
  //* Fetch all projects --------------------
  const allSaleTransactions = useQuery({
    queryKey: ['saleTransaction', 'all'],
    queryFn: () => program.account.saleTransaction.all(),
    staleTime: 60000,
  });

  //* get projectSale Pda from project Pda publicKey
  const getProjectSalesPdaFromProjectPdaKey = (
    projectPdaKey: PublicKey | null | undefined
  ) => {
    return useQuery({
      queryKey: ['projectSalesPda', projectPdaKey?.toString()],
      queryFn: async () => {
        if (!projectPdaKey) throw new Error('PublicKey is required');
        const [projectSalesPdaKey] = await PublicKey.findProgramAddress(
          [Buffer.from('project_sale_transactions'), projectPdaKey.toBuffer()],
          programId
        );

        return program.account.projectSaleTransactions.fetch(
          projectSalesPdaKey
        );
      },
    });
  };

  //* Fetch an array of sale transactions --------------------
  const salesAccountsFromPublicKeysArray = (
    publicKeys: PublicKey[] | null | undefined
  ) => {
    return useQuery({
      queryKey: ['sale', 'array', publicKeys?.[0]?.toString()],
      queryFn: async () => {
        if (!publicKeys || publicKeys.length === 0)
          throw new Error('PublicKeys are required');

        const sales = await Promise.all(
          publicKeys.map(async (key) => {
            const saleAccount = await program.account.saleTransaction.fetch(
              key
            );
            return {
              publicKey: key,
              account: transformAccountToSaleTransaction(saleAccount), // Transformation en type Project
            };
          })
        );

        return sales as AccountWrapper<SaleTransaction>[];
      },
      staleTime: 60000,
      enabled: !!publicKeys,
    });
  };

  //* get sale from contribution pda publicKey --------------------
  const getSaleTxFromContributionPdaPublicKey = (
    contributionPdaPublicKey: PublicKey | null | undefined
  ) => {
    return useQuery({
      queryKey: ['saleTransaction', contributionPdaPublicKey?.toString()],
      queryFn: async () => {
        if (!contributionPdaPublicKey) throw new Error('PublicKey is required');
        const [saleTransactionPdaPublicKey] =
          await PublicKey.findProgramAddress(
            [
              Buffer.from('sale_transaction'),
              contributionPdaPublicKey.toBuffer(),
            ],
            programId
          );

        return program.account.saleTransaction.fetch(
          saleTransactionPdaPublicKey
        );
      },
      staleTime: 6000,
    });
  };

  //* MUTATIONS
  //* Create sale transaction --------------------
  const createSaleTransaction = useMutation<
    string,
    Error,
    CreateSaleTransactionArgs
  >({
    mutationKey: ['befundr', 'createTransaction'],
    mutationFn: async ({
      projectPdaPublicKey,
      contributionPdaPublicKey,
      userPdaPublicKey,
      userWallet,
      sellingPrice,
    }) => {
      const [saleTransactionPdaPublicKey] =
        await PublicKey.findProgramAddressSync(
          [
            Buffer.from('sale_transaction'),
            contributionPdaPublicKey.toBuffer(),
          ],
          programId
        );

      const [projectSaleTransactionsPdaKey] =
        await PublicKey.findProgramAddressSync(
          [
            Buffer.from('project_sale_transactions'),
            projectPdaPublicKey.toBuffer(),
          ],
          program.programId
        );

      const convertedPrice = new BN(convertNumberToSplAmount(sellingPrice));

      const tx = await program.methods
        .createTransaction(convertedPrice)
        .accountsPartial({
          projectSaleTransactions: projectSaleTransactionsPdaKey,
          saleTransaction: saleTransactionPdaPublicKey,
          user: userPdaPublicKey,
          contribution: contributionPdaPublicKey,
          owner: userWallet,
        })
        .rpc();

      // wait for the confirmation of the tx
      await confirmTransaction(program, tx);

      return saleTransactionPdaPublicKey.toString();
    },
    onError: () => toast.error('Error selling contribution...'),
  });

  //* Complete sale transaction --------------------
  const completeSaleTransaction = useMutation<
    string,
    Error,
    CompleteSaleTransactionArgs
  >({
    mutationKey: ['befundr', 'completeTransaction'],
    mutationFn: async ({
      projectPdaKey,
      contributionPdaKey,
      sellerUserPdaKey,
      buyerUserPdaKey,
      buyerWallet,
      sellerPubkey,
    }) => {
      const [historyTransactionsPubkey] =
        await PublicKey.findProgramAddressSync(
          [Buffer.from('history_transactions'), contributionPdaKey.toBuffer()],
          programId
        );

      const [saleTransactionPubkey] = await PublicKey.findProgramAddressSync(
        [Buffer.from('sale_transaction'), contributionPdaKey.toBuffer()],
        programId
      );

      const [buyerContributionsPdaKey] = await PublicKey.findProgramAddressSync(
        [Buffer.from('user_contributions'), buyerUserPdaKey.toBuffer()],
        programId
      );

      const [sellerContributionsPdaKey] =
        await PublicKey.findProgramAddressSync(
          [Buffer.from('user_contributions'), sellerUserPdaKey.toBuffer()],
          programId
        );

      const [projectSaleTransactionsPdaKey] =
        await PublicKey.findProgramAddressSync(
          [Buffer.from('project_sale_transactions'), projectPdaKey.toBuffer()],
          programId
        );

      // Get SPL Token transfer accounts
      const { account: buyerAtaKey } = await getATA(buyerWallet, connection);
      const { account: sellerAtaKey } = await getATA(sellerPubkey, connection);

      const tx = await program.methods
        .completeTransaction()
        .accountsPartial({
          projectSaleTransactions: projectSaleTransactionsPdaKey,
          historyTransactions: historyTransactionsPubkey,
          saleTransaction: saleTransactionPubkey,
          buyerUserContributions: buyerContributionsPdaKey,
          sellerUserContributions: sellerContributionsPdaKey,
          buyerUser: buyerUserPdaKey,
          sellerUser: sellerUserPdaKey,
          contribution: contributionPdaKey,
          buyer: buyerWallet,
          buyerAta: buyerAtaKey?.address,
          seller: sellerPubkey,
          sellerAta: sellerAtaKey?.address,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      await confirmTransaction(program, tx);

      return tx;
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Reward purchased ! ');
    },
    onError: () => toast.error('Error selling contribution...'),
  });

  return {
    allSaleTransactions,
    getSaleTxFromContributionPdaPublicKey,
    createSaleTransaction,
    getProjectSalesPdaFromProjectPdaKey,
    salesAccountsFromPublicKeysArray,
    completeSaleTransaction,
  };
}
