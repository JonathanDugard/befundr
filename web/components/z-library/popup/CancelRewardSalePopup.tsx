import React from 'react';
import PopupLayout from './PopupLayout';
import Image from 'next/image';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';

type Props = {
  reward: Reward;
  handleClose: () => void;
};

const CancelRewardSalePopup = (props: Props) => {
  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Cancel sale for {props.reward.name}
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
            You’re about to cancel your sale offer for this reward
            <br /> Do you confirm ?
          </p>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Close" />
          </button>
          <button>
            <MainButtonLabel label="Cancel the sale" />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default CancelRewardSalePopup;
