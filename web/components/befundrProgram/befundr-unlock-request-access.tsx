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
import { transformAccountToProject } from '@/utils/functions/projectsFunctions';
import { confirmTransaction } from '@/utils/functions/utilFunctions';

interface CreateUnlockRequestArgs {
  projectPubkey: PublicKey;
  userPubkey: PublicKey;
  requestCounter: number;
  amount: number;
  endTime: number;
}

export function useBefundrProgramUnlockRequest() {
  const { sendTransaction } = useWallet();
  const { program, programId, transactionToast, router, connection } =
    useBefundrProgramGlobal();

  /*
   * Fetch all unlock requests accounts
   */
  const getAllUnlockRequestAccounts = useQuery({
    queryKey: ['unlock_request', 'all'],
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
      queryKey: ['unlock_request', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        return program.account.unlockRequest.fetch(publicKey);
      },
      staleTime: 60000,
      enabled: !!publicKey,
    });
  };

  /*
   * Fetch unlock requests account for one project
   */
  const getAllUnlockRequestFromPubkeys = (
    publicKeys: PublicKey[] | null | undefined
  ) => {
    return useQuery({
      queryKey: ['project', 'array', publicKeys?.[0]?.toString()],
      queryFn: async () => {
        if (!publicKeys || publicKeys.length === 0)
          throw new Error('PublicKeys are required');

        const projects = await Promise.all(
          publicKeys.map(async (key) => {
            const projectAccount = await program.account.project.fetch(key);
            return {
              publicKey: key,
              account: transformAccountToProject(projectAccount), // Transformation en type Project
            };
          })
        );

        return projects as AccountWrapper<Project>[];
      },
      staleTime: 60000,
      enabled: !!publicKeys,
    });
  };

  const createUnlockRequest = useMutation<PublicKey, Error, CreateUnlockRequestArgs>({
    mutationKey: ['befundr','createUnlockRequest'],
    mutationFn: async ({
      projectPubkey,
      userPubkey,
      requestCounter,
      amount,
      endTime,
    }) => {

      // Set new unlock request seed
      const [newUnlockRequestPublicKey] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('unlock_request'),
          projectPubkey.toBuffer(),
          new BN(requestCounter + 1).toArray('le', 2),
        ],
        programId
      );

      // Set current unlock request seed
      const [currentUnlockRequestPublicKey] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('unlock_request'),
          projectPubkey.toBuffer(),
          new BN(requestCounter + 0).toArray('le', 2),
        ],
        programId
      );
      const withCurrentUnlockRequest = {
        currentUnlockRequest: currentUnlockRequestPublicKey,
      }

      // Set project unlock requests seed
      const [projectUnlockRequestsPublicKey] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('project_unlock_requests'),
          projectPubkey.toBuffer(),
        ],
        programId
      );

      console.log('Project PublicKey:', projectPubkey.toString());
      console.log('User PublicKey:', userPubkey.toString());
      console.log('New Unlock Request PublicKey:', newUnlockRequestPublicKey.toString());
      console.log('Current Unlock Request PublicKey:', currentUnlockRequestPublicKey.toString());
      console.log('Project Unlock Requests PublicKey:', projectUnlockRequestsPublicKey.toString());

      const tx = await program.methods
        .createUnlockRequest(
          new BN(amount),
          new BN(endTime)
        )
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

  return {
    getAllUnlockRequestAccounts,
    getUnlockRequestFromPubkey,
    getAllUnlockRequestFromPubkeys,
    createUnlockRequest
  };
}
