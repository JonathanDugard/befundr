'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InfoLabel from '../display elements/InfoLabel';
import FallbackImage from '../display elements/FallbackImage';
import { getProgressPercentage } from '@/utils/functions/projectsFunctions';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import { calculateTimeRemaining } from '@/utils/functions/utilFunctions';
import Divider from '../display elements/Divider';

type Props = {
  project: Project;
  projectAccountPublicKey: string;
};

const ProjectCard = (props: Props) => {
  //* GLOBAL STATE
  const { userAccount } = useBefundrProgramUser();

  //* LOCAL STATE
  const [projectOwner, setProjectOwner] = useState<User | null>(null);

  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } = userAccount(
    new PublicKey(props.project.user)
  );
  // Handle profile data after fetching
  useEffect(() => {
    if (userProfile) setProjectOwner(userProfile as unknown as User); // Populate form with fetched user data
  }, [userProfile]);
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
        <FallbackImage
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
            {props.project.raisedAmount}$ raised
          </p>
          <p className="textStyle-subheadline">
            {calculateTimeRemaining(props.project.endTime)} days remaining
          </p>

          <p className="textStyle-subheadline">Trust score : xx</p>
          <div className="mt-auto">
            <InfoLabel label={props.project.status} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
