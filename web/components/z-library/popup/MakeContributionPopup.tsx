import React from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';

type Props = {
  reward: Reward;
  handleClose: () => void;
};

const MakeContributionPopup = (props: Props) => {
  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Contribute for {props.reward.name}
        </p>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="w-40 h-40 bg-neutral-300"></div>
          <p className="textStyle-body">
            You are about to contribute for this reward for{' '}
            <strong>{props.reward.price}$</strong>
          </p>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          <button>
            <MainButtonLabel label={`Contribute for ${props.reward.price}$`} />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default MakeContributionPopup;
