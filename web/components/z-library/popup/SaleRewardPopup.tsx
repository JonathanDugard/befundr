import React from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import Image from 'next/image';
import InputField from '../button/InputField';

type Props = {
  reward: Reward;
  floorPrice?: number | undefined | null;
  handleClose: () => void;
};

const SaleRewardPopup = (props: Props) => {
  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Sell {props.reward.name}
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
          <div className="w-full">
            <InputField
              label={`Selling price`}
              placeholder="Set the selling price in $ for your reward"
              type="number"
            />
            {props.floorPrice && (
              <p className="textStyle-body">
                Current floor price : {props.floorPrice}$
              </p>
            )}
          </div>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          <button>
            <MainButtonLabel label="Sell" />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default SaleRewardPopup;
