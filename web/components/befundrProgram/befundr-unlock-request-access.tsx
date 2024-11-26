/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getATA } from '@/utils/functions/AtaFunctions';
import { useWallet } from '@solana/wallet-adapter-react';
import { confirmTransaction } from '@/utils/functions/utilFunctions';
import { transformAccountToUnlockRequest } from '@/utils/functions/unlockRequestFunctions';

interface CreateUnlockRequestArgs {
  projectPubkey: PublicKey;
  userPubkey: PublicKey;
  requestCounter: number;
  amount: number;
  endTime: number;
  title: string;
}

interface ClaimUnlockRequestArgs {
  unlockRequestPubkey: PublicKey;
  projectPubkey: PublicKey;
  userPubkey: PublicKey;
  createdProjectCounter: number;
}

export function useBefundrProgramUnlockRequest() {
  const { sendTransaction } = useWallet();
  const { program, programId, transactionToast, router, connection } =
    useBefundrProgramGlobal();

  /*
   * Fetch all unlock requests accounts
   */
  const getAllUnlockRequestAccounts = useQuery({
    queryKey: ['allUnlockRequest', 'all'],
    queryFn: () => program.account.unlockRequest.all(),
    staleTime: 60000,
  });

  /*
   * Fetch unlock requests account for one project
   */
  const getUnlockRequestFromPubkey = (
    publicKey: PublicKey | null | undefined
  ) => {
    return useQuery({
      queryKey: ['unlockRequest', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        return program.account.unlockRequest.fetch(publicKey);
      },
      staleTime: 60000,
      enabled: !!publicKey, // Ensure enabled is a boolean
    });
  };

  /*
   * Fetch unlock requests account for one project
   */
  const getAllUnlockRequestFromPubkeys = (
    publicKeys: PublicKey[] | null | undefined
  ) => {
    return useQuery({
      queryKey: ['unlockRequests', 'array', publicKeys?.[0]?.toString()],
      queryFn: async () => {
        if (!publicKeys || publicKeys.length === 0)
          throw new Error('PublicKeys are required');

        const unlockRequests = await Promise.all(
          publicKeys.map(async (key) => {
            console.log('Fetch key: {}', key.toString());
            const unlockRequestAccount =
              await program.account.unlockRequest.fetch(key);
            return {
              publicKey: key,
              account: transformAccountToUnlockRequest(unlockRequestAccount),
            };
          })
        );

        return unlockRequests as AccountWrapper<UnlockRequest>[];
      },
      staleTime: 60000,
      enabled: !!publicKeys,
    });
  };

  //* MUTATIONS
  //* Create a unlock request --------------------
  const createUnlockRequest = useMutation<
    PublicKey,
    Error,
    CreateUnlockRequestArgs
  >({
    mutationKey: ['befundr', 'createUnlockRequest'],
    mutationFn: async ({
      projectPubkey,
      userPubkey,
      requestCounter,
      amount,
      endTime,
      title,
    }) => {
      // Set new unlock request seed
      const [newUnlockRequestPublicKey] =
        await PublicKey.findProgramAddressSync(
          [
            Buffer.from('unlock_request'),
            projectPubkey.toBuffer(),
            new BN(requestCounter + 1).toArray('le', 2),
          ],
          programId
        );

      // Set current unlock request seed
      const [currentUnlockRequestPublicKey] =
        await PublicKey.findProgramAddressSync(
          [
            Buffer.from('unlock_request'),
            projectPubkey.toBuffer(),
            new BN(requestCounter + 0).toArray('le', 2),
          ],
          programId
        );
      const withCurrentUnlockRequest = {
        currentUnlockRequest: currentUnlockRequestPublicKey,
      };

      // Set project unlock requests seed
      const [projectUnlockRequestsPublicKey] =
        await PublicKey.findProgramAddressSync(
          [Buffer.from('project_unlock_requests'), projectPubkey.toBuffer()],
          programId
        );

      const tx = await program.methods
        .createUnlockRequest(title, new BN(amount), new BN(endTime))
        .accountsPartial({
          user: userPubkey,
          unlockRequests: projectUnlockRequestsPublicKey,
          newUnlockRequest: newUnlockRequestPublicKey,
          currentUnlockRequest: null,
          project: projectPubkey,
        })
        .rpc(); // Launch the transaction

      // wait for the confirmation of the tx
      await confirmTransaction(program, tx);

      return newUnlockRequestPublicKey;
    },
    onSuccess: async () => {
      toast.success('Unlock request created successfully!');
      // Optionally refetch any relevant queries or navigate to a different page
    },
    onError: async () => {
      toast.error('Error creating unlock request');
    },
  });

  const claimUnlockRequest = useMutation<void, Error, ClaimUnlockRequestArgs>({
    mutationKey: ['befundr', 'claimUnlockRequest'],
    mutationFn: async ({
      unlockRequestPubkey,
      projectPubkey,
      userPubkey,
      createdProjectCounter,
    }) => {
      if (!userPubkey) {
        throw new Error('User public key is required');
      }

      // get user pda
      const [userPda] = await PublicKey.findProgramAddressSync(
        [Buffer.from('user'), userPubkey.toBuffer()],
        programId
      );

      // Fetch necessary accounts
      const [projectPublicKey] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('project'),
          userPubkey.toBuffer(),
          new BN(createdProjectCounter).toArray('le', 2),
        ],
        programId
      );

      const [unlockRequestsPublicKey] = await PublicKey.findProgramAddressSync(
        [Buffer.from('project_unlock_requests'), projectPublicKey.toBuffer()],
        programId
      );

      const [currentUnlockRequestPublicKey] =
        await PublicKey.findProgramAddressSync(
          [
            Buffer.from('unlock_request'),
            projectPublicKey.toBuffer(),
            new BN(1).toArray('le', 2),
          ],
          programId
        );

      const { account: fromAta } = await getATA(projectPubkey, connection);
      const { account: toAta } = await getATA(userPubkey, connection);

      console.log('fromAta', fromAta?.address.toString());
      console.log('toAta', toAta?.address.toString());
      console.log('projectPubkey', projectPubkey.toString());
      console.log('userPubkey', userPubkey.toString());
      console.log(
        'unlockRequestsPublicKey',
        unlockRequestsPublicKey.toString()
      );
      console.log(
        'currentUnlockRequestPublicKey',
        currentUnlockRequestPublicKey.toString()
      );

      const tx = await program.methods
        .claimUnlockRequest(createdProjectCounter)
        .accountsPartial({
          user: userPda,
          unlockRequests: unlockRequestsPublicKey,
          currentUnlockRequest: currentUnlockRequestPublicKey,
          fromAta: fromAta?.address,
          toAta: toAta?.address,
          project: projectPubkey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      // Wait for the confirmation of the transaction
      await confirmTransaction(program, tx);
    },
    onSuccess: async () => {
      toast.success('Unlock request claimed successfully!');
    },
    onError: async () => {
      toast.error('Error claiming unlock request');
    },
  });

  return {
    getAllUnlockRequestAccounts,
    getUnlockRequestFromPubkey,
    getAllUnlockRequestFromPubkeys,
    createUnlockRequest,
    claimUnlockRequest,
  };
}
