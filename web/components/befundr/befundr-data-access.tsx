'use client';

import { getBefundrProgram, getBefundrProgramId } from '@befundr/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useBefundrProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getBefundrProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getBefundrProgram(provider);

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  // const greet = useMutation({
  //   mutationKey: ['befundr', 'greet', { cluster }],
  //   mutationFn: (keypair: Keypair) => program.methods.greet().rpc(),
  //   onSuccess: (signature) => {
  //     transactionToast(signature);
  //   },
  //   onError: () => toast.error('Failed to run program'),
  // });

  return {
    program,
    programId,
    getProgramAccount,
    // greet,
  };
}
