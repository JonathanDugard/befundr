import React from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import Image from 'next/image';

type Props = {
  reward: Reward;
  handleClose: () => void;
};

const RedeemRewardPopup = (props: Props) => {
  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Redeem {props.reward.name}
        </p>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="relative w-40 h-40">
            <Image
              alt="reward pic"
              src={props.reward.imageUrl}
              fill
              className="object-contain"
            />
          </div>
          <p className="textStyle-body">
            You’re about to redeem the reward associated to your contribution.
            This action is definitive. <br /> Once done, your contribution
            cannot be sold anymore on the marketplace.
            <br /> Do you confirm redeem the reward ?
          </p>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          <button>
            <MainButtonLabel label="Redeem the reward" />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default RedeemRewardPopup;
