'use client';
import React, { useEffect, useState } from 'react';
import { ProjectsFilters } from '../projects/projects-ui';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';
import { transformProgramAccountToProject } from '@/utils/functions/projectsFunctions';
import ProjectCardMarketplace from '../z-library/card/ProjectCardMarketplace';

// type Props = {}

const Marketplace = (/*props: Props*/) => {
  //* GLOBAL STATE
  const { allProjectsAccounts } = useBefundrProgramProject();

  //* LOCAL STATE
  const [allProjects, setAllProjects] = useState<AccountWrapper<Project>[]>([]); // use the AccountWrapper type to handle the publicKey

  //extract all the projects from the accounts
  useEffect(() => {
    if (allProjectsAccounts.data) {
      const transformedProjects = allProjectsAccounts.data.map(
        (programAccount) => transformProgramAccountToProject(programAccount)
      );

      setAllProjects(transformedProjects);
    }
  }, [allProjectsAccounts.data]);

  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <h1 className="textStyle-title">
        <strong className="text-accent">Rewards marketplace -</strong> All
        projects
      </h1>
      <h2 className="textStyle-headline -mt-10">
        Find available rewards to buy for ongoing projects
      </h2>
      <ProjectsFilters />
      <div
        className="grid justify-center gap-6 w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,240px))' }}
      >
        {allProjects.map((project, index) => (
          <ProjectCardMarketplace
            key={index}
            project={project.account}
            projectId={project.publicKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
