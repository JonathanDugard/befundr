'use client';
import { useBefundrProgramProject } from '@/components/befundrProgram/befundr-project-access';
import ProjectMarketplace from '@/components/marketplace/projectMarketplace';
import { projects } from '@/data/localdata';
import { transformAccountToProject } from '@/utils/functions/projectsFunctions';
import { PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

type Props = {
  params: {
    projectId: string;
  };
};

const Page = (props: Props) => {
  //* GLOBAL STATE
  const { projectAccountFromAccountPublicKey: projectAccountFromPublicKey } =
    useBefundrProgramProject();

  //* LOCAL STATE
  const [projectToDisplay, setProjectToDisplay] = useState<Project | undefined>(
    undefined
  );

  // Use React Query to fetch project based on public key
  const {
    data: projectData,
    isLoading: isFetchingProject,
    refetch,
  } = projectAccountFromPublicKey(new PublicKey(props.params.projectId));

  // store a transformed data for UI
  useEffect(() => {
    if (projectData) {
      setProjectToDisplay(transformAccountToProject(projectData));
    }
  }, [projectData]);

  if (projectToDisplay)
    return <ProjectMarketplace project={projectToDisplay} />;
};

export default Page;
