/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';
import { useState } from 'react';

//* TYPE
interface AddContributionArgs {
  userAccountPDA: PublicKey;
  projectPublicKey: PublicKey;
  amount: number;
  rewardId?: number; // Optional field for reward ID
}

export function useBefundrProgramContribution() {
  const { program, programId, transactionToast, router } =
    useBefundrProgramGlobal();

  //* QUERIES
  //* Fetch all projects --------------------

  //* MUTATIONS
  //* Add a contribution --------------------
  const addContribution = useMutation<string, Error, AddContributionArgs>({
    mutationKey: ['befundr', 'addContribution'],
    mutationFn: async ({
      userAccountPDA,
      projectPublicKey,
      amount,
      rewardId,
    }) => {
      // Generate the seed for the new Contribution PDA
      const [contributionPDA] = await PublicKey.findProgramAddress(
        [
          Buffer.from('contribution'), // Seed: "contribution"
          projectPublicKey.toBuffer(), // Seed: Project public key
          new BN(1).toArray('le', 8), // You can use the project contribution counter as well
        ],
        programId
      );

      const [userContributionsPDA] = await PublicKey.findProgramAddress(
        [Buffer.from('user_contributions'), userAccountPDA.toBuffer()],
        programId
      );

      // Call the method for adding a contribution
      return await program.methods
        .addContribution(
          new BN(amount), // Contribution amount
          rewardId ? new BN(rewardId) : null // Reward ID (optional)
        )
        .accounts({
          project: projectPublicKey,
          projectContributions: projectPublicKey, // Assuming you have a PDA for contributions
          user: userAccountPDA,
          userContributions: userContributionsPDA,
          contribution: contributionPDA,
          signer: userAccountPDA,
          systemProgram: PublicKey.default, // The System Program is usually passed this way
        })
        .rpc(); // Launch the transaction
    },
    onSuccess: async (signature) => {
      toast.success(`Contribution made successfully! Signature: ${signature}`);
      // Optionally refetch any relevant queries or navigate to a different page
    },
    onError: async () => {
      toast.error('Error adding contribution');
    },
  });

  return {
    addContribution,
  };
}
