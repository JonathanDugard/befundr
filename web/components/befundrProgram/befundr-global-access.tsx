'use client';

import { getBefundrProgram, getBefundrProgramId } from '@befundr/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster } from '@solana/web3.js';
import { useMemo } from 'react';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import { useRouter } from 'next/navigation';

//* Global common setup for the Befundr program
export function useBefundrGlobalAccess() {
  const router = useRouter();
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();

  // Getting the programId and program instance
  const programId = useMemo(
    () => getBefundrProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getBefundrProgram(provider);

  return {
    connection,
    cluster,
    transactionToast,
    router,
    program,
    programId,
  };
}
