'use client';
import React from 'react';
import { ProjectsFilters } from './projects-ui';
import { projects } from '@/data/localdata';
import ProjectCard from '../z-library/card/ProjectCard';

// type Props = {}

const Projects = (/*props: Props*/) => {
  // //* GLOBAL STATE

  // //* TEST

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
