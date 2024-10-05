'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';
import { getATA } from '@/utils/functions/AtaFunctions';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

//* TYPE
interface AddContributionArgs {
  projectPubkey: PublicKey;
  userPubkey: PublicKey;
  userWalletPubkey: PublicKey;
  projectContributionCounter: number;
  amount: number;
  rewardId: number | null;
}

export function useBefundrProgramContribution() {
  const { program, programId, transactionToast, router, connection } =
    useBefundrProgramGlobal();

  //* QUERIES
  //* Fetch all contributions --------------------
  const allContributionsAccounts = useQuery({
    queryKey: ['contribution', 'all'],
    queryFn: () => program.account.contribution.all(),
    staleTime: 60000,
  });

  //* Fetch user contributions PDA --------------
  const getUserContributionsPda = (userPdaPublicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['userContributionsPda', userPdaPublicKey?.toString()],
      queryFn: async () => {
        if (!userPdaPublicKey) throw new Error('PublicKey is required');
        const [contributionsPdaKey] = await PublicKey.findProgramAddress(
          [Buffer.from('user_contributions'), userPdaPublicKey.toBuffer()],
          programId
        );
        return program.account.userContributions.fetch(contributionsPdaKey);
      },
    });
  };

  //* Fetch a contributions PDA --------------
  const getContributionPda = (
    projectPdaPublicKey: PublicKey | null,
    contributionCounter: number
  ) => {
    return useQuery({
      queryKey: ['contributionPda', projectPdaPublicKey?.toString()],
      queryFn: async () => {
        if (!projectPdaPublicKey) throw new Error('PublicKey is required');
        const [contributionPdaKey] = await PublicKey.findProgramAddress(
          [
            Buffer.from('contribution'),
            projectPdaPublicKey.toBuffer(),
            new BN(contributionCounter + 1).toArray('le', 2),
          ],
          programId
        );
        return program.account.contribution.fetch(contributionPdaKey);
      },
    });
  };

  //* MUTATIONS
  //* Add a contribution --------------------
  const addContribution = useMutation<string, Error, AddContributionArgs>({
    mutationKey: ['befundr', 'addContribution'],
    mutationFn: async ({
      projectPubkey,
      userPubkey,
      userWalletPubkey,
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

      // Get SPL Token transfer accounts
      const { account: fromAta } = await getATA(userWalletPubkey, connection);
      const { account: toAta } = await getATA(projectPubkey, connection);

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
          fromAta: fromAta?.address,
          toAta: toAta?.address,
          tokenProgram: TOKEN_PROGRAM_ID,
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
    allContributionsAccounts,
    getUserContributionsPda,
    getContributionPda,
    addContribution,
  };
}
