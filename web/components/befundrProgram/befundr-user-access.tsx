'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { getATA } from '@/utils/functions/AtaFunctions';

//* TYPE
interface CreateUserArgs {
  signer: PublicKey;
  name: string;
  avatarUrl: string;
  bio: string;
  city: string;
}

export function useBefundrProgramUser() {
  const { program, programId, transactionToast, router, connection } =
    useBefundrProgramGlobal();
  const { sendTransaction } = useWallet();

  //* QUERIES
  //* Fetch all users --------------------
  const allUsersAccounts = useQuery({
    queryKey: ['user', 'all'],
    queryFn: () => program.account.user.all(),
    staleTime: 60000,
  });

  //* get user entry address
  const getUserEntryAddress = (publicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['userEntryAddress', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        const [userEntryAddress] = await PublicKey.findProgramAddress(
          [Buffer.from('user'), publicKey.toBuffer()],
          programId
        );
        return userEntryAddress;
      },
      staleTime: 6000,
    });
  };

  //* get user wallet ATA balance
  const getUserWalletATABalance = (walletPublicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['userATABalance', walletPublicKey?.toString()],
      queryFn: async () => {
        if (!walletPublicKey) throw new Error('PublicKey is required');
        const { account } = await getATA(
          walletPublicKey,
          connection,
          sendTransaction
        );
        return account;
      },
      staleTime: 6000,
    });
  };

  //* Fetch single user by user wallet public key --------------------
  const userAccountFromWalletPublicKey = (publicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['user', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        const [userEntryAddress] = await PublicKey.findProgramAddress(
          [Buffer.from('user'), publicKey.toBuffer()],
          programId
        );
        return program.account.user.fetch(userEntryAddress);
      },
      staleTime: 60000,
      enabled: !!publicKey,
    });
  };

  //* Fetch single user by its PDA public key --------------------
  const userAccountFromAccountPublicKey = (publicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['user', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        return program.account.user.fetch(publicKey);
      },
      staleTime: 60000,
      enabled: !!publicKey,
    });
  };

  //* MUTATIONS
  //* Create user --------------------
  const createUser = useMutation<string, Error, CreateUserArgs>({
    mutationKey: ['befundr', 'createUser'],
    mutationFn: async ({ signer, name, avatarUrl, bio, city }) => {
      const [userEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from('user'), signer.toBuffer()],
        programId
      );
      return await program.methods
        .createUser(name, avatarUrl, bio, city)
        .accountsPartial({ user: userEntryAddress })
        .rpc();
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
    mutationKey: ['befundr', 'updateUser'],
    mutationFn: async ({ signer, name, avatarUrl, bio, city }) => {
      const [userEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from('user'), signer.toBuffer()],
        programId
      );
      return await program.methods
        .updateUser(name, avatarUrl, bio, city)
        .accountsPartial({ user: userEntryAddress, owner: signer })
        .rpc();
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Profile updated');
      await allUsersAccounts.refetch();
      router.push('/profile/myprofile');
    },
    onError: () => toast.error('Error updating profile...'),
  });

  return {
    allUsersAccounts,
    getUserEntryAddress,
    getUserWalletATABalance,
    userAccountFromWalletPublicKey,
    userAccountFromAccountPublicKey,
    createUser,
    updateUser,
  };
}
