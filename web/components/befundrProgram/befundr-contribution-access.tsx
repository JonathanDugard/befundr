'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';

//* TYPE
interface CreateContributionArgs {
  userAccountPDA: PublicKey;
  project: Project;
  userProjectCounter: number;
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

  return {
    allContributionsAccounts,
  };
}
