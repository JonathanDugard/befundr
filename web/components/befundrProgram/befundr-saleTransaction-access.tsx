/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getOrCreateATA } from '@/utils/functions/AtaFunctions';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertNumberToSplAmount } from '@/utils/functions/utilFunctions';

//* TYPE
interface CreateSaleTransactionArgs {
  contributionPdaPublicKey: PublicKey;
  userPdaPublicKey: PublicKey;
  userWallet: PublicKey;
  sellingPrice: number;
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
      contributionPdaPublicKey,
      userPdaPublicKey,
      userWallet,
      sellingPrice,
    }) => {
      const [saleTransactionPdaPublicKey] = await PublicKey.findProgramAddress(
        [Buffer.from('sale_transaction'), contributionPdaPublicKey.toBuffer()],
        programId
      );

      const convertedPrice = new BN(convertNumberToSplAmount(sellingPrice));

      return await program.methods
        .createTransaction(convertedPrice)
        .accountsPartial({
          saleTransaction: saleTransactionPdaPublicKey,
          user: userPdaPublicKey,
          contribution: contributionPdaPublicKey,
          owner: userWallet,
        })
        .rpc();
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Contribution on sale !');
    },
    onError: () => toast.error('Error selling contribution...'),
  });

  return {
    allSaleTransactions,
    getSaleTxFromContributionPdaPublicKey,
    createSaleTransaction,
  };
}
