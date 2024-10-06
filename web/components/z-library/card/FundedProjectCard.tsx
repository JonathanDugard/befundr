'use client';
import Image from 'next/image';
import React, { useMemo } from 'react';
import Link from 'next/link';
import MainButtonLabel from '../button/MainButtonLabel';
import TrustScore from '../display_elements/TrustScore';
import {
  calculateTrustScore,
  convertSplAmountToNumber,
} from '@/utils/functions/utilFunctions';
import { BN } from '@coral-xyz/anchor';

type Props = {
  project: Project;
  projectId: string;
};

const FundedProjectCard = (props: Props) => {
  // //* LOCAL STATE

  const trustScore = useMemo(
    () =>
      calculateTrustScore(
        props.project.safetyDeposit,
        props.project.goalAmount
      ),
    [props.project]
  );

  return (
    <div className="flex justify-start items-start gap-4 w-full">
      {/* first column */}
      <div className="flex flex-col items-start justify-start w-1/3">
        <p className="textStyle-headline">{props.project.name}</p>
        <div className="relative w-[200px] h-[200px]">
          <Image
            alt="reward pic"
            src={props.project.imageUrl}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {/* second column */}
      <div className="flex flex-col justify-start items-start gap-4 w-2/3">
        {/* <FundsOverviewBar
            raisedAmount={props.project.raisedAmount}
            unlockAmount={getUnlockedFundsForAProject(projectToDisplay)}
            askForUnlockAmount={getAskedFundsForAProject(projectToDisplay)}
          /> */}
        <div className="flex justify-between items-start gap-4 w-full">
          {/* key figures */}
          <div className="flex flex-col justify-start items-start gap-4 w-full">
            {/* <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {rewardToDisplay.price} ${' '}
                </strong>
                your contribution
              </p> */}
            <p className="textStyle-body">
              <strong className="textStyle-subtitle">
                {convertSplAmountToNumber(new BN(props.project.raisedAmount))} ${' '}
              </strong>
              total contributions
            </p>
            <p className="textStyle-body">
              <strong className="textStyle-subtitle">
                {props.project.contributionCounter}{' '}
              </strong>
              contributors
            </p>
            {/* <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {getUnlockedFundsForAProject(projectToDisplay)} ${' '}
                </strong>
                unlocked
              </p> */}
            {/* <p className="textStyle-body">
                <strong className="textStyle-subtitle">
                  {getAskedFundsForAProject(projectToDisplay)} ${' '}
                </strong>
                ask for unlock
              </p> */}
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-1/3">
            <TrustScore trustValue={trustScore} />
            <p>Trust score : {trustScore.toFixed(0)}</p>
          </div>
        </div>
        {/* {isProjectHasVoteOngoing(projectToDisplay) && (
            <p className="w-full flex justify-center items-center gap-2 textStyle-body">
              <FaCircle className="text-custom-red" />
              Funds unlock vote ongoing
            </p>
          )} */}
        <Link
          href={`/projects/${props.projectId}`}
          className="w-full flex justify-end"
        >
          <MainButtonLabel label="Go to details" />
        </Link>
      </div>
    </div>
  );
};

export default FundedProjectCard;
