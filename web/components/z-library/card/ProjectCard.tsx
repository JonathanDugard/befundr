'use client';
import Link from 'next/link';
import React from 'react';
import InfoLabel from '../display elements/InfoLabel';
import ImageWithFallback from '../display elements/ImageWithFallback';
import { getProgressPercentage } from '@/utils/functions/projectsFunctions';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import {
  calculateTimeRemaining,
  calculateTrustScore,
  convertSplAmountToNumber,
} from '@/utils/functions/utilFunctions';
import Divider from '../display elements/Divider';
import { BN } from '@coral-xyz/anchor';

type Props = {
  project: Project;
  projectAccountPublicKey: string;
};

const ProjectCard = (props: Props) => {
  //* GLOBAL STATE
  const { userAccountFromAccountPublicKey } = useBefundrProgramUser();

  //* LOCAL STATE
  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromAccountPublicKey(new PublicKey(props.project.user));

  return (
    <Link
      href={`/projects/${props.projectAccountPublicKey}`}
      className="relative"
    >
      <div
        className="
      flex justify-between items-start 
      w-[400px] h-[200px] bg-second"
      >
        {/* project image */}
        <ImageWithFallback
          alt="image"
          classname="object-cover aspect-square"
          fallbackImageSrc="/images/default_project_image.jpg"
          height={200}
          width={200}
          src={props.project.imageUrl}
        />
        {/* progress bar */}
        <div className="w-10 h-full bg-custom-green">
          <div
            className="bg-second h-full"
            style={{
              height: `${
                100 -
                getProgressPercentage(
                  props.project.raisedAmount,
                  props.project.goalAmount
                )
              }%`,
            }}
          ></div>
        </div>
        {/* project infos */}
        <div className="flex flex-col justify-start items-stretch w-1/2 p-2 h-full ">
          <p className="textStyle-headline !font-normal">
            {props.project.name}
          </p>
          {userProfile && (
            <p className="textStyle-subheadline">By {userProfile.name}</p>
          )}
          <div className="my-1">
            <Divider />
          </div>
          <p className="textStyle-subheadline">
            {convertSplAmountToNumber(new BN(props.project.raisedAmount))}$
            raised
          </p>
          <p className="textStyle-subheadline">
            {calculateTimeRemaining(props.project.endTime)} days remaining
          </p>

          <p className="textStyle-subheadline">
            Trust score :{' '}
            {calculateTrustScore(
              props.project.safetyDeposit,
              props.project.goalAmount
            ).toFixed(0)}
          </p>
          <div className="mt-auto">
            <InfoLabel label={props.project.status} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
