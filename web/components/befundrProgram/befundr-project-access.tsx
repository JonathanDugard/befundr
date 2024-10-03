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

  //* QUERIES
  //* Fetch all projects --------------------
  const allProjectsAccounts = useQuery({
    queryKey: ['project', 'all'],
    queryFn: () => program.account.project.all(),
    staleTime: 60000,
  });

  //* Fetch single project by public key --------------------
  const projectAccountFromAccountPublicKey = (publicKey: PublicKey | null) => {
    return useQuery({
      queryKey: ['project', publicKey?.toString()],
      queryFn: async () => {
        if (!publicKey) throw new Error('PublicKey is required');
        return program.account.project.fetch(publicKey);
      },
      staleTime: 60000,
      enabled: !!publicKey,
    });
  };

  //* fetch all project created by a user
  const getAllCreatedProjectsByAUser = (
    userPublicKey: PublicKey | undefined,
    createdProjectCounter: number | undefined
  ) => {
    return useQuery({
      queryKey: ['createdProjects', userPublicKey?.toString()],
      queryFn: async () => {
        // security check
        if (!userPublicKey) throw new Error('PublicKey is required');
        if (!createdProjectCounter)
          throw new Error('Created project counter is required');

        const projects = [];
        // loop to get all project
        for (let i = 0; i < createdProjectCounter; i++) {
          try {
            // Generate the seed
            const [projectPDA] = await PublicKey.findProgramAddress(
              [
                Buffer.from('project'),
                userPublicKey.toBuffer(),
                new BN(i + 1).toArray('le', 2),
              ],
              programId
            );

            // fetch the project
            const projectData = await program.account.project.fetch(projectPDA);

            // push the projects to projects
            if (projectData) {
              projects.push({
                publicKey: projectPDA,
                account: projectData,
              });
            }
          } catch (error) {
            console.error(`Error fetching project ${i}:`, error);
          }
        }
        // return the projects
        return projects;
      },
      staleTime: 6000,
    });
  };

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
          project.description,
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
    projectAccountFromPublicKey: projectAccountFromAccountPublicKey,
    allProjectsAccounts,
    createProject,
    getAllCreatedProjectsByAUser,
  };
}
