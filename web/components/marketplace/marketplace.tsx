'use client';
import React from 'react';
import { ProjectsFilters } from '../projects/projects-ui';
import { projects } from '@/data/localdata';
import ProjectCard from '../z-library/card/ProjectCard';
import RewardCardMarketplace from '../z-library/card/RewardCardMarketplace';

// type Props = {}

const Marketplace = (/*props: Props*/) => {
  // //* GLOBAL STATE

  // //* TEST

  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <h1 className="textStyle-title">
        <strong className="text-accent">Rewards marketplace -</strong> All
        projects
      </h1>
      <h2 className="textStyle-headline -mt-10">
        Find available reward to buy for ongoing projects
      </h2>
      <ProjectsFilters />
      <div
        className="grid justify-center gap-6 w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,320px))' }}
      >
        {projects.map((project: Project, projectIndex) =>
          project.rewards.map((reward: Reward, rewardIndex: number) => (
            <RewardCardMarketplace
              key={`${projectIndex}-${rewardIndex}`}
              reward={reward}
              projectId={project.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Marketplace;
