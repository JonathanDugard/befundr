'use client';

import { getBefundrProgram, getBefundrProgramId } from '@befundr/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import { useRouter } from 'next/navigation';

//* TYPE
interface CreateUserArgs {
  signer: PublicKey;
  name: string;
  avatarUrl: string;
  bio: string;
  city: string;
}

export function useBefundrProgram() {
  const router = useRouter();
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

  //* QUERIES
  //* Fetch all user --------------------
  const allUsersAccounts = useQuery({
    queryKey: ['user', 'all', { cluster }],
    queryFn: () => program.account.user.all(),
    staleTime: 60000,
  });

  //* Fetch single user by public key --------------------
  const userAccount = (publicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['user', publicKey?.toString(), { cluster }],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        const [userEntryAddress] = await PublicKey.findProgramAddress(
          [
            Buffer.from('user'), // seed: "user"
            publicKey.toBuffer(), // seed: user public key
          ],
          programId
        );

        // Fetch the user account by its PDA
        const userAccount = await program.account.user.fetch(userEntryAddress);
        return userAccount;
      },
      staleTime: 60000, // Données fraîches pendant 1 minute
      enabled: !!publicKey, // Désactive la requête s'il n'y a pas de clé publique
    });
  };

  //* MUTATIONS ======================
  //* Create user --------------------
  const createUser = useMutation<string, Error, CreateUserArgs>({
    // mutation key to identify the mutation
    mutationKey: ['befundr', 'createUser', { cluster }],
    // function call from the program
    mutationFn: async ({ signer, name, avatarUrl, bio, city }) => {
      //the input needed by the program function
      // generation of the seeds for the PDA
      const [userEntryAddress] = await PublicKey.findProgramAddress(
        [
          Buffer.from('user'), // seeds: "user"
          signer.toBuffer(), // seeds: the user wallet public key
        ],
        programId
      );
      // call of the method
      return await program.methods
        .createUser(name, avatarUrl, bio, city)
        .accountsPartial({ user: userEntryAddress }) // definition of the PDA address with the seed generated
        .rpc(); // launch the transaction
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Profile created');
      await allUsersAccounts.refetch();
      router.push('/profile/myprofile');
    },
    onError: () => toast.error('Error creating profile...'),
  });

  //* Update user --------------------
  const updateUser = useMutation<string, Error, CreateUserArgs>({
    // mutation key to identify the mutation
    mutationKey: ['befundr', 'updateUser', { cluster }],
    // function call from the program
    mutationFn: async ({ signer, name, avatarUrl, bio, city }) => {
      // the input needed by the program function
      // generation of the seeds for the PDA
      const [userEntryAddress] = await PublicKey.findProgramAddress(
        [
          Buffer.from('user'), // seeds: "user"
          signer.toBuffer(), // seeds: the user wallet public key
        ],
        programId
      );

      // call of the method
      return await program.methods
        .updateUser(name, avatarUrl, bio, city)
        .accountsPartial({
          user: userEntryAddress,
          owner: signer, // The owner of the account must sign the transaction
        })
        .rpc(); // launch the transaction
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Profile updated');
      await allUsersAccounts.refetch();
      router.push('/profile/myprofile');
    },
    onError: () => toast.error('Error updating profile...'),
  });

  return {
    // base export
    program,
    programId,
    getProgramAccount,
    // queyries
    allUsersAccounts,
    userAccount,
    // mutations
    createUser,
    updateUser,
  };
}
