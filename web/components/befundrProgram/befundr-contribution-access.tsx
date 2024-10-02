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
  projectPubkey: PublicKey;
  userPubkey: PublicKey;
  projectContributionCounter: number;
  amount: number;
  rewardId: number | null;
}

export function useBefundrProgramContribution() {
  const { program, programId, transactionToast, router } =
    useBefundrProgramGlobal();

  //* QUERIES
  //* Fetch all contributions --------------------
  const allContributionsAccounts = useQuery({
    queryKey: ['contribution', 'all'],
    queryFn: () => program.account.contribution.all(),
    staleTime: 60000,
  });

  //* MUTATIONS
  //* Add a contribution --------------------
  const addContribution = useMutation<string, Error, AddContributionArgs>({
    mutationKey: ['befundr', 'addContribution'],
    mutationFn: async ({
      projectPubkey,
      userPubkey,
      projectContributionCounter,
      amount,
      rewardId,
    }) => {
      const [contributionPdaPublicKey] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('contribution'),
          projectPubkey.toBuffer(),
          new BN(projectContributionCounter + 1).toArray('le', 2),
        ],
        programId
      );

      // Get projectContributions PDA Pubkey
      const [projectContributionsPubkey] =
        await PublicKey.findProgramAddressSync(
          [Buffer.from('project_contributions'), projectPubkey.toBuffer()],
          program.programId
        );
      // Get userContributions PDA Pubkey
      const [userContributionsPubkey] = await PublicKey.findProgramAddressSync(
        [Buffer.from('user_contributions'), userPubkey.toBuffer()],
        programId
      );

      // // Get SPL Token transfer accounts
      // const { fromAta, toAta } = await getSplTransferAccounts(
      //   wallet,
      //   projectPubkey
      // );
      // if (mintAmount && mintAmount !== undefined) {
      //   // Add 500 mocked up USDC to the wallet before sending contribution
      //   await MintAmountTo(wallet, fromAta, mintAmount);
      // }

      // Call the addContribution method
      return await program.methods
        .addContribution(
          new BN(amount),
          rewardId !== null ? new BN(rewardId) : null
        )
        .accountsPartial({
          project: projectPubkey,
          projectContributions: projectContributionsPubkey,
          user: userPubkey,
          userContributions: userContributionsPubkey,
          contribution: contributionPdaPublicKey,
        })
        .rpc(); // Launch the transaction
    },
    onSuccess: async () => {
      toast.success('Contribution made successfully!');
      allContributionsAccounts.refetch();
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
