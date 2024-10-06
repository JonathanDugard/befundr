'use client';
import { projects } from '@/data/localdata';
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
      const transformedProjects = allProjectsAccounts.data.map(
        (programAccount) => transformProgramAccountToProject(programAccount)
      );

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

export const UserDashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <h2 className="textStyle-subtitle">My dashboard</h2>
      <WhiteBlock>
        <div className="flex justify-start items-baseline gap-4">
          <p className="textStyle-subheadline">
            <strong className="text-4xl text-accent">8 </strong>funded projects
          </p>
          <Link href={'/profile/myfundedprojects/'}>
            <MainButtonLabel label="My projects" />
          </Link>
        </div>
        <div className="flex justify-start items-baseline gap-4">
          <p className="textStyle-subheadline">
            <strong className="text-4xl text-accent">10 </strong>owned
            contributions
          </p>
          <Link href={'/profile/mycontributions/'}>
            <MainButtonLabel label="My contributions" />
          </Link>
        </div>
      </WhiteBlock>
    </div>
  );
};
