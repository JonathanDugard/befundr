/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramGlobal } from './befundr-global-access';
import { BN } from '@coral-xyz/anchor';
import { useState } from 'react';

//* TYPE
interface CreateProjectArgs {
  userAccountPDA: PublicKey;
  project: Project;
  userProjectCounter: number;
}

export function useBefundrProgramProject() {
  const { program, programId, transactionToast, router } =
    useBefundrProgramGlobal();

  const [newProjectAddress, setNewProjectAddress] = useState<PublicKey | null>(
    null
  );

  //* QUERIES
  //* Fetch all projects --------------------
  const allProjectsAccounts = useQuery({
    queryKey: ['project', 'all'],
    queryFn: () => program.account.project.all(),
    staleTime: 60000,
  });

  //* Fetch single project by public key --------------------
  //   const projectAccount = (publicKey: PublicKey | null) => {
  //     return useQuery({
  //       queryKey: ['user', publicKey?.toString()],
  //       queryFn: async () => {
  //         if (!publicKey) throw new Error('PublicKey is required');
  //         const [userEntryAddress] = await PublicKey.findProgramAddress(
  //           [Buffer.from('user'), publicKey.toBuffer()],
  //           programId
  //         );
  //         return program.account.user.fetch(userEntryAddress);
  //       },
  //       staleTime: 60000,
  //       enabled: !!publicKey,
  //     });
  //   };

  //* MUTATIONS
  //* Create project --------------------
  const createProject = useMutation<string, Error, CreateProjectArgs>({
    mutationKey: ['befundr', 'createProject'],
    mutationFn: async ({ userAccountPDA, project, userProjectCounter }) => {
      // generation of the seeds for the PDA
      const [newProjectAddress] = await PublicKey.findProgramAddress(
        [
          Buffer.from('project'), // seeds: "project"
          userAccountPDA.toBuffer(), // seeds: the user account PDA public key
          new BN(userProjectCounter + 1).toArray('le', 2), // seeds: the user project counter
        ],
        programId
      );
      setNewProjectAddress(newProjectAddress);

      // Rewards serialization
      const serializedRewards = project.rewards.map((reward) => ({
        name: reward.name,
        description: reward.description,
        price: new BN(reward.price),
        maxSupply: reward.maxSupply ? new BN(reward.maxSupply) : null, // if unlimited supply, set to null
      }));

      // call of the method
      return await program.methods
        .createProject(
          project.name,
          project.imageUrl,
          project.projectDescription,
          new BN(project.goalAmount),
          new BN(project.endTime),
          serializedRewards,
          new BN(project.safetyDeposit),
          project.xAccountUrl,
          project.category
        )
        .accountsPartial({
          user: userAccountPDA,
          project: newProjectAddress,
        }) // definition of the PDA address with the seed generated
        .rpc(); // launch the transaction
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Project created');
      allProjectsAccounts.refetch();
      router.push(`/`);
    },
    onError: async () => toast.error('Error creating project'),
  });

  return {
    allProjectsAccounts,
    createProject,
  };
}
