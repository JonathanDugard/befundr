'use client';
import { transformProgramAccountToProject } from '@/utils/functions/projectsFunctions';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../z-library/card/ProjectCard';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';
import { useRouter } from 'next/navigation';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';

type Props = {};

const MyCreatedProjects = (props: Props) => {
  //* GLOBAL STATE
  const { getProjectsByCreator: getAllCreatedProjectsByAUser } =
    useBefundrProgramProject();
  const {
    getUserPdaPublicKey: getUserEntryAddress,
    userAccountFromWalletPublicKey,
  } = useBefundrProgramUser();
  const { publicKey } = useWallet();
  const router = useRouter();

  //* LOCAL STATE
  const [projectsToDisplay, setProjectsToDisplay] = useState<
    AccountWrapper<Project>[]
  >([]); // use the AccountWrapper type to handle the publicKey

  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromWalletPublicKey(publicKey);

  // Use React Query to fetch userPDA address based on public key
  const { data: userEntryAddress, isLoading: isFetchingUserEntryAddress } =
    getUserEntryAddress(publicKey);

  // get all user created projects
  const { data: projects, isLoading: isFetchingProjectsToDisplay } =
    getAllCreatedProjectsByAUser(
      userEntryAddress,
      userProfile?.createdProjectCounter
    );

  // handle project data transformation
  useEffect(() => {
    if (projects && projects.length > 0) {
      const transformedProjects: AccountWrapper<Project>[] = projects.map(
        (project) => transformProgramAccountToProject(project)
      );

      setProjectsToDisplay(transformedProjects);
    }
  }, [projects]);

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
          gridTemplateColumns: 'repeat(auto-fit,minmax(400px,400px))',
        }}
      >
        {projectsToDisplay &&
          projectsToDisplay.map((project, index) => (
            <ProjectCard
              key={index}
              project={project.account}
              projectAccountPublicKey={project.publicKey}
            />
          ))}
      </div>
    </div>
  );
};

export default MyCreatedProjects;
