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
  signer: PublicKey;
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
    mutationFn: async ({ signer, project, userProjectCounter }) => {
      // generation of the seeds for the PDA
      console.log('start function');

      const [newProjectAddress] = await PublicKey.findProgramAddress(
        [
          Buffer.from('project'), // seeds: "user"
          signer.toBuffer(), // seeds: the user account PDA public key
          new BN(userProjectCounter + 1).toArray('le', 2), // seeds: the user project counter
        ],
        programId
      );

      setNewProjectAddress(newProjectAddress);
      console.log('new project address :', newProjectAddress);

      // Rewards serialization
      const serializedRewards = project.rewards.map((reward) => ({
        name: reward.name,
        description: reward.description,
        price: new BN(reward.price),
        maxSupply: new BN(reward.maxSupply),
      }));

      console.log('serailized reward:', serializedRewards);
      console.log('project :', new BN(project.goalAmount));
      console.log('project :', new BN(project.endTime));
      console.log('project :', new BN(project.safetyDeposit));

      // call of the method
      return await program.methods
        .createProject(
          project.name,
          project.imageUrl,
          project.projectDescription,
          new BN(project.goalAmount),
          new BN(project.endTime),
          serializedRewards,
          new BN(project.safetyDeposit)
        )
        .accountsPartial({
          user: signer,
          project: newProjectAddress,
        }) // definition of the PDA address with the seed generated
        .rpc(); // launch the transaction
    },
    onSuccess: async (signature) => {
      transactionToast(signature, 'Project created');
      allProjectsAccounts.refetch();
      //   router.push(`/projects/${newProjectAddress}`);
    },
    onError: async () => toast.error("Erreur dans l'execution du programme"),
  });

  return {
    allProjectsAccounts,
    createProject,
  };
}
