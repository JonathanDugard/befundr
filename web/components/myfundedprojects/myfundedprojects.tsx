'use client';
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import FundedProjectCard from '../z-library/card/FundedProjectCard';
import Divider from '../z-library/display_elements/Divider';
import { useRouter } from 'next/navigation';
import { useBefundrProgramContribution } from '../befundrProgram/befundr-contribution-access';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';

type Props = {
  /*empty*/
};

const MyFundedProjects = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const router = useRouter();
  const { getAllUserContributions } = useBefundrProgramContribution();
  const { getUserPdaPublicKey } = useBefundrProgramUser();
  const { projectsAccountsFromPublicKeysArray } = useBefundrProgramProject();

  //* LOCAL STATE
  const [projectsToDsiplay, setProjectsToDisplay] = useState<
    AccountWrapper<Project>[]
  >([]);

  // react query
  const { data: userPdaPublicKey } = getUserPdaPublicKey(publicKey);

  const { data: userContributions } = getAllUserContributions(userPdaPublicKey);

  // Get unique project PublicKeys
  const uniqueProjectKeys = userContributions
    ? Array.from(
        new Set(
          userContributions.map((contribution) =>
            contribution.account.project.toBase58()
          )
        )
      ).map((publicKeyString) => new PublicKey(publicKeyString))
    : [];

  // react query fetch using unique proejcts publicKeys[]
  const { data: projects } =
    projectsAccountsFromPublicKeysArray(uniqueProjectKeys);

  // nagiguate to homepage is user disconnected
  if (!publicKey) router.push('/');

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h1 className="textStyle-title">My funded projects</h1>
      <div className="flex justify-between items-center w-full -mt-4 mb-6">
        <h2 className="textStyle-headline">
          Below are all the projects for which you hold contributions
        </h2>
      </div>
      <div className="flex flex-col items-start justify-start gap-10 w-full">
        {projects?.map((project, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start gap-10 w-full"
          >
            <FundedProjectCard
              key={index}
              project={project.account}
              projectId={project.publicKey}
            />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFundedProjects;
