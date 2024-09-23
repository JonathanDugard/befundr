'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import BackButton from '../z-library/button/BackButton';
import Divider from '../z-library/display elements/Divider';
import { RewardMarketplaceBlock } from './projectMarketplace-ui';

type Props = {
  project: Project;
};

const ProjectMarketplace = (props: Props) => {
  //* GENERAL STATE
  const router = useRouter();

  //* LOCAL STATE

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      {/* header */}
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <h1 className="textStyle-title">
        Rewards marketplace -{' '}
        <strong className="!text-accent">{props.project.name}</strong>
      </h1>
      <h2 className="textStyle-headline -mt-6">
        Find all the available rewards for this project
      </h2>
      {/* rewards */}
      {props.project.rewards.map((reward: Reward, index) => (
        <div key={index} className="flex flex-col gap-6 w-full h-full">
          <RewardMarketplaceBlock reward={reward} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ProjectMarketplace;
