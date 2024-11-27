'use client';
import Link from 'next/link';
import React from 'react';
import InfoLabel from '../display_elements/InfoLabel';
import ImageWithFallback from '../display_elements/ImageWithFallback';
import { getProgressPercentage } from '@/utils/functions/projectsFunctions';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import {
  calculateTimeRemaining,
  calculateTrustScore,
  convertSplAmountToNumber,
} from '@/utils/functions/utilFunctions';
import Divider from '../display_elements/Divider';
import { BN } from '@coral-xyz/anchor';
import { useBefundrProgramUnlockRequests } from '@/components/befundrProgram/befundr-unlock-requests-access';

type Props = {
  project: Project;
  projectAccountPublicKey: string;
};

const ProjectCard = (props: Props) => {
  //* GLOBAL STATE
  const { userAccountFromAccountPublicKey } = useBefundrProgramUser();
  const { getUnlockRequestsFromProjectPubkey } = useBefundrProgramUnlockRequests();

  //* LOCAL STATE
  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromAccountPublicKey(new PublicKey(props.project.user));

  // Get project's unlock requests
  const {
    data: unlockRequestsData,
    isLoading: isFetchingUnlockRequests,
    refetch: refetchUnlockRequests,
  } = getUnlockRequestsFromProjectPubkey(new PublicKey(props.projectAccountPublicKey));
  const unlockedAmount = unlockRequestsData?.unlockedAmount ?? 0;
  const requestCounter = unlockRequestsData?.requestCounter ?? 0;
  const requests = unlockRequestsData?.requests;
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
        {props.project.raisedAmount >= 20000 && <span className="absolute m-2 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          Granted by Foundation
        </span>}
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
              height: `${100 -
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
          <span className="bg-white text-gray-800 text-xs font-lighter px-2.5 py-0.5 rounded text-center">
            {props.project.category}
          </span>
          <p className="textStyle-subheadline !text-textColor-main !font-normal truncate">
            {props.project.name}
          </p>
          {/* {userProfile && (
            <p className="textStyle-body">By {userProfile.name}</p>
          )} */}
          <Divider />

          <p className="textStyle-body">
            ${convertSplAmountToNumber(new BN(props.project.goalAmount)).toLocaleString()} to
          </p>
          <p className="textStyle-body">
            ${convertSplAmountToNumber(new BN(props.project.raisedAmount)).toLocaleString()} raised
          </p>
          <p className="textStyle-body">
            ${convertSplAmountToNumber(new BN(unlockedAmount)).toLocaleString()} withdrawn
          </p>
          <p className="textStyle-body">
            {calculateTimeRemaining(props.project.endTime)} days remaining
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
