'use client';
import { projects, user1 } from '@/data/localdata';
import { getProjectsByOwnerId } from '@/utils/functions/projectsFunctions';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../z-library/card/ProjectCard';
import CreatedProjectCard from '../z-library/card/CreatedProjectCard';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

type Props = {};

const MyCreatedProjects = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const router = useRouter();

  //* LOCAL STATE
  const [projectsToDisplay, setProjectsToDisplay] = useState<
    Project[] | null | undefined
  >(null);

  useEffect(() => {
    setProjectsToDisplay(getProjectsByOwnerId(projects, user1.owner));
  }, [user1]);

  // nagiguate to homepage is user disconnected
  if (!publicKey) router.push('/');

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h1 className="textStyle-title">My created projects</h1>
      <div className="flex justify-between items-center w-full -mt-4 mb-6">
        <h2 className="textStyle-headline">
          Below are all the projects you launched
        </h2>
      </div>
      <div
        className="grid justify-center gap-6 w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,320px))',
        }}
      >
        {projectsToDisplay &&
          projectsToDisplay.map((project, index) => (
            <CreatedProjectCard key={index} project={project} />
          ))}
      </div>
    </div>
  );
};

export default MyCreatedProjects;
