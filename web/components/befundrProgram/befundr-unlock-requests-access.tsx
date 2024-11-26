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

export function useBefundrProgramUnlockRequests() {
  const { sendTransaction } = useWallet();
  const { program, programId, transactionToast, router, connection } =
    useBefundrProgramGlobal();

  /*
   * Fetch all unlock requests accounts
   */
  const getAllUnlockRequestsAccounts = useQuery({
    queryKey: ['project_unlock_requests', 'all'],
    queryFn: () => program.account.unlockRequests.all(),
    staleTime: 60000,
  });

  /*
   * Fetch unlock requests account for one project
   */
  const getUnlockRequestsFromProjectPubkey = (
    publicKey: PublicKey | null | undefined
  ) => {
    return useQuery({
      queryKey: ['project_unlock_requests', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
      
        // Set project unlock requests seed
        const [projectUnlockRequestsPublicKey] = await PublicKey.findProgramAddressSync(
          [
            Buffer.from('project_unlock_requests'),
            publicKey.toBuffer(),
          ],
          programId
        );

        return program.account.unlockRequests.fetch(projectUnlockRequestsPublicKey);
      },
      staleTime: 60000,
      enabled: !!publicKey,
    });
  };

  return {
    getAllUnlockRequestsAccounts,
    getUnlockRequestsFromProjectPubkey,
  };
}
