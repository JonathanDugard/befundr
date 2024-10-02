'use client';
import React, { useState } from 'react';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import Link from 'next/link';
import MakeContributionPopup from '../popup/MakeContributionPopup';
import ImageWithFallback from '../display elements/ImageWithFallback';
import { ProjectStatus } from '@/data/projectStatus';

type Props = {
  reward: Reward;
  projectStatus: string;
  projectId: string;
};

const RewardCardDetailled = (props: Props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div className="flex justify-start items-start gap-6 w-full h-full ">
      {/* image */}
      <div className="bg-neutral-400 w-1/4 aspect-square">
        <ImageWithFallback
          alt="image"
          fallbackImageSrc="/images/default_project_image.jpg"
          classname="w-1/2 md:w-1/3 aspect-square object-cover"
          src={props.reward.imageUrl}
          height={400}
          width={400}
        />
      </div>
      {/* info */}
      <div className="flex flex-col items-start justify-between gap-2 w-full ">
        <p className="textStyle-headline">{props.reward.name}</p>
        <p className="textStyle-subheadline">{props.reward.price}$</p>
        {props.reward.maxSupply ? (
          <p className="textStyle-body">
            Limited supply : {props.reward.maxSupply}
            {props.reward.currentSupply >= props.reward.maxSupply && (
              <strong className="ml-4 !text-custom-red">Supply reached</strong>
            )}
          </p>
        ) : (
          <p className="textStyle-body">Illimited supply</p>
        )}
        <p className="textStyle-body">{props.reward.description}</p>
        <div className="grow"></div>
        <div className="flex justify-between items-center w-full mt-auto">
          <p className="textStyle-subheadline">
            {props.reward.currentSupply} contributors
          </p>
          {/* button if status fundraising */}
          {props.projectStatus === ProjectStatus.Fundraising.enum && (
            <div className="flex justify-end gap-4">
              <Link href={`/marketplace/${props.projectId}`}>
                <SecondaryButtonLabel label="Go to marketplace" />
              </Link>
              <button onClick={() => setIsShowPopup(true)}>
                <MainButtonLabel label="Contribute" />
              </button>
            </div>
          )}
          {/* button if status realizing */}
          {props.projectStatus === ProjectStatus.Realising.enum && (
            <Link href={`/marketplace/${props.projectId}`}>
              <MainButtonLabel label="Go to marketplace" />
            </Link>
          )}
        </div>
      </div>
      {isShowPopup && (
        <MakeContributionPopup
          reward={props.reward}
          handleClose={() => setIsShowPopup(false)}
        />
      )}
    </div>
  );
};

export default RewardCardDetailled;
