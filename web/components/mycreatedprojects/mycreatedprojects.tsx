'use client';
import { projects, user1 } from '@/data/localdata';
import { getProjectsByOwnerId } from '@/utils/functions/projectsFunctions';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../z-library/card/ProjectCard';
import CreatedProjectCard from '../z-library/card/CreatedProjectCard';

type Props = {};

const MyCreatedProjects = (props: Props) => {
  const [projectsToDisplay, setProjectsToDisplay] = useState<
    Project[] | null | undefined
  >(null);

  useEffect(() => {
    setProjectsToDisplay(getProjectsByOwnerId(projects, user1.ownerAddress));
  }, [user1]);

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
