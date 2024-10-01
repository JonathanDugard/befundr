'use client';
import React, { useEffect, useState } from 'react';
import { ProjectsFilters } from './projects-ui';
import { projects } from '@/data/localdata';
import ProjectCard from '../z-library/card/ProjectCard';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';
import { transformProgramAccountToProject } from '@/utils/functions/projectsFunctions';

// type Props = {}

const Projects = (/*props: Props*/) => {
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
        <strong className="text-accent">Live</strong> projects
      </h1>
      <ProjectsFilters />
      <div
        className="grid justify-center gap-6 w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,320px))' }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
