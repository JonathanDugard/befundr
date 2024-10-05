'use client';
import { projects, rewards } from '@/data/localdata';
import {
  getAskedFundsForAProject,
  getProjectByRewardId,
  getUnlockedFundsForAProject,
  isProjectHasVoteOngoing,
} from '@/utils/functions/projectsFunctions';
import { getRewardByRewardId } from '@/utils/functions/rewardsFunctions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CiPower } from 'react-icons/ci';
import FundsOverviewBar from '../display_elements/FundsOverviewBar';
import { FaCircle } from 'react-icons/fa';
import Link from 'next/link';
import MainButtonLabelBig from '../button/MainButtonLabelBig';
import MainButtonLabel from '../button/MainButtonLabel';
import TrustScore from '../display_elements/TrustScore';

type Props = {
  contribution: Contribution;
};

const FundedProjectCard = (props: Props) => {
  //* LOCAL STATE
  const [projectToDisplay, setProjectToDisplay] = useState<
    Project | null | undefined
  >(null);
  const [rewardToDisplay, setRewardToDisplay] = useState<
    Reward | null | undefined
  >(null);

  // 1-fetch the reward associated to the contribution
  useEffect(() => {
    const fetchReward = () => {
      setRewardToDisplay(
        getRewardByRewardId(rewards, props.contribution.rewardId)
      );
    };

    fetchReward();
  }, [props.contribution]);

  // 2-fetch the project associated to the reward
  useEffect(() => {
    const fetchProject = () => {
      if (rewardToDisplay)
        setProjectToDisplay(getProjectByRewardId(projects, rewardToDisplay));
    };

    if (rewardToDisplay) fetchProject();
  }, [rewardToDisplay]);

  if (projectToDisplay && rewardToDisplay)
    return (
      <div className="flex justify-start items-start gap-4 w-full">
        {/* first column */}
        <div className="flex flex-col items-start justify-start w-1/3">
          <p className="textStyle-headline">{projectToDisplay.name}</p>
          <p className="textStyle-subheadline">{rewardToDisplay.name}</p>
          <div className="relative w-full h-40">
            <Image
              alt="reward pic"
              src={rewardToDisplay.imageUrl}
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* second column */}
        <div className="flex flex-col justify-start items-start gap-4 w-2/3">
          <FundsOverviewBar
            raisedAmount={projectToDisplay.raisedAmount}
            unlockAmount={getUnlockedFundsForAProject(projectToDisplay)}
            askForUnlockAmount={getAskedFundsForAProject(projectToDisplay)}
          />
          <div className="flex justify-between items-start gap-4 w-full">
            {/* key figures */}
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {rewardToDisplay.price} ${' '}
                </strong>
                your contribution
              </p>
              <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {projectToDisplay.raisedAmount} ${' '}
                </strong>
                total contributions
              </p>
              <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {getUnlockedFundsForAProject(projectToDisplay)} ${' '}
                </strong>
                unlocked
              </p>
              <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {getAskedFundsForAProject(projectToDisplay)} ${' '}
                </strong>
                ask for unlock
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 w-1/3">
              <TrustScore trustValue={projectToDisplay.trustScore} />
              <p>Trust score : {projectToDisplay.trustScore}</p>
            </div>
          </div>
          {isProjectHasVoteOngoing(projectToDisplay) && (
            <p className="w-full flex justify-center items-center gap-2 textStyle-body">
              <FaCircle className="text-custom-red" />
              Funds unlock vote ongoing
            </p>
          )}
          <Link
            href={`/projects/${projectToDisplay.id}`}
            className="w-full flex justify-end"
          >
            <MainButtonLabel label="Go to details" />
          </Link>
        </div>
      </div>
    );
};

export default FundedProjectCard;
