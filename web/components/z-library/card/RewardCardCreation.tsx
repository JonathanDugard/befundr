'use client';
import React, { useState } from 'react';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import Link from 'next/link';
import MakeContributionPopup from '../popup/MakeContributionPopup';
import Image from 'next/image';
import CancelButtonLabel from '../button/CancelButtonLabel';

type Props = {
  reward: Reward;
  onEdit: () => void;
  onDelete: () => void;
};

const RewardCardCreation = (props: Props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div className="flex justify-start items-start gap-6 w-full h-full ">
      {/* image */}
      <div className="bg-neutral-400 w-1/4 aspect-square relative">
        <Image
          alt="reward image"
          src={props.reward.imageUrl}
          fill
          className="object-cover"
        ></Image>
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
      </div>
      {/* buttons */}
      <div className="flex flex-col gap-4">
        {/* <button>
          <SecondaryButtonLabel label="Modify" />
        </button> */}
        <button onClick={props.onDelete}>
          <CancelButtonLabel label="Remove" />
        </button>
      </div>
    </div>
  );
};

export default RewardCardCreation;
