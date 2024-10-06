'use client';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Divider from '../z-library/display_elements/Divider';
import WhiteBlock from '../z-library/display_elements/WhiteBlock';
import Link from 'next/link';
import ProjectCard from '../z-library/card/ProjectCard';
import { useEffect, useState } from 'react';
import { transformProgramAccountToProject } from '@/utils/functions/projectsFunctions';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';
import { useBefundrProgramContribution } from '../befundrProgram/befundr-contribution-access';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';

export const KeyFigures = () => {

  const { allProjectsAccounts } = useBefundrProgramProject();
  const { allContributionsAccounts } = useBefundrProgramContribution();

  const projectsFunded = allProjectsAccounts.data?.length || 0;
  const totalAmountRaised = allProjectsAccounts.data
    ? allProjectsAccounts.data.reduce((sum, project) => sum + project.account.raisedAmount, 0)
    : 0;

  const formattedTotalAmountRaised = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD', // Change this to the desired currency
  }).format(convertSplAmountToNumber(BigInt(totalAmountRaised)));
  const contributors = allContributionsAccounts.data?.length || 0;

  return (
    <div className="flex flex-col items-center justify-start w-full my-10">
      <div className="grid grid-cols-3 justify-items-stretch items-center w-full">
        <div className="flex flex-col items-start gap-2">
          <p className="text-accent text-5xl font-light">{projectsFunded}</p>
          <p className="textStyle-subheadline w-full">projects created since beginning</p>
        </div>
        <div className="flex flex-col items-start justify-self-center gap-2">
          <p className="text-accent text-5xl font-light">{formattedTotalAmountRaised}</p>
          <p className="textStyle-subheadline w-full">raised funds since beginning</p>
        </div>
        <div className="flex flex-col items-start justify-self-end gap-2">
          <p className="text-accent text-5xl font-light">{contributors}</p>
          <p className="textStyle-subheadline w-full">active contributors</p>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export const HighlightSelection = ({ title }: { title: string }) => {
  //* GLOBAL STATE
  const { allProjectsAccounts } = useBefundrProgramProject();

  //* LOCAL STATE
  const [projectsSelection, setProjectsSelection] = useState<
    AccountWrapper<Project>[]
  >([]); // use the AccountWrapper type to handle the publicKey

  //extract all the projects from the accounts
  useEffect(() => {
    if (allProjectsAccounts.data) {
      const transformedProjects = allProjectsAccounts.data
      .sort((a, b) => b.account.raisedAmount - a.account.raisedAmount)
      .map((programAccount) => transformProgramAccountToProject(programAccount));

      setProjectsSelection(transformedProjects.slice(0, 3));
    }
  }, [allProjectsAccounts.data]);

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <h2 className="textStyle-subtitle">{title}</h2>
      <div className="flex justify-between gap-8 w-full overflow-x-auto">
        {projectsSelection.map((project: AccountWrapper<Project>, index) => (
          <ProjectCard
            key={index}
            project={project.account}
            projectAccountPublicKey={project.publicKey}
          />
        ))}
      </div>
      <div className="flex justify-end w-full mb-10">
        <Link href={'/projects'}>
          <MainButtonLabel label="See more projects" />
        </Link>
      </div>
      <Divider />
    </div>
  );
};

export const EndingSoonProjects = () => {
  const { allProjectsAccounts } = useBefundrProgramProject();
  const [endingSoonProjects, setEndingSoonProjects] = useState<
    AccountWrapper<Project>[]
  >([]);

  useEffect(() => {
    if (allProjectsAccounts.data) {
      const soonEndingProjects = allProjectsAccounts.data
        .filter((project) => {
          const endTime = new Date(project.account.endTime * 1000); // Assuming endTime is in seconds
          const now = new Date();
          const timeRemaining = endTime.getTime() - now.getTime();
          return timeRemaining > 0 && timeRemaining <= 7 * 24 * 60 * 60 * 1000; // Projects ending in the next 7 days
        })
        .sort((a, b) => a.account.endTime - b.account.endTime) // Sort by closest end time
        .map((programAccount) => transformProgramAccountToProject(programAccount));

      setEndingSoonProjects(soonEndingProjects.slice(0, 3));
    }
  }, [allProjectsAccounts.data]);

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <h2 className="textStyle-subtitle">Ending Soon</h2>
      <div className="flex justify-between gap-8 w-full overflow-x-auto">
        {endingSoonProjects.map((project: AccountWrapper<Project>, index) => (
          <ProjectCard
            key={index}
            project={project.account}
            projectAccountPublicKey={project.publicKey}
          />
        ))}
      </div>
      <div className="flex justify-end w-full mb-10">
        <Link href={'/projects'}>
          <MainButtonLabel label="See All Projects" />
        </Link>
      </div>
      <Divider />
    </div>
  );
};

export const UserDashboard = () => {
  
  const { publicKey } = useWallet();
  const { userAccountFromWalletPublicKey } = useBefundrProgramUser();
  const { getUserPdaPublicKey } = useBefundrProgramUser();
  const { getAllUserContributions } = useBefundrProgramContribution();
  
  const { data: userPdaPublicKey } = getUserPdaPublicKey(publicKey);
  const { data: userContributions } = getAllUserContributions(userPdaPublicKey);
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromWalletPublicKey(publicKey);

  const fundedProjects = userProfile?.createdProjectCounter || 0;
  const ownedContributions = userContributions?.length || 0;

  const [isUserHasAccount, setIsUserHasAccount] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <h2 className="textStyle-subtitle">My dashboard</h2>
      <WhiteBlock>
        <div className="flex justify-start items-baseline gap-4">
          <p className="textStyle-subheadline">
            <strong className="text-4xl text-accent">{fundedProjects} </strong>
            {fundedProjects > 1 ? ' projects' : ' project'}
          </p>
          <Link href={'/profile/myfundedprojects/'}>
            <MainButtonLabel label="My projects" />
          </Link>
        </div>
        <div className="flex justify-start items-baseline gap-4">
          <p className="textStyle-subheadline">
            <strong className="text-4xl text-accent">{ownedContributions} </strong>
            owned {ownedContributions > 1 ? ' contributions' : ' contribution'}
          </p>
          <Link href={'/profile/mycontributions/'}>
            <MainButtonLabel label="My contributions" />
          </Link>
        </div>
      </WhiteBlock>
    </div>
  );
};
