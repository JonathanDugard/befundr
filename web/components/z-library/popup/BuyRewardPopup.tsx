import React from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { BN } from '@coral-xyz/anchor';

type Props = {
  reward: Reward;
  saleTx: SaleTransaction;
  handleClose: () => void;
};

const BuyRewardPopup = (props: Props) => {
  const priceToDisplay = convertSplAmountToNumber(
    new BN(props.saleTx.sellingPrice)
  );

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Buy {props.reward.name}
        </p>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="w-40 h-40 bg-neutral-300"></div>
          <p className="textStyle-body">
            You are about to buy this reward for{' '}
            <strong>{priceToDisplay}$</strong>
          </p>
        </div>
        {/* buttons */}
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          <button>
            <MainButtonLabel label={`Buy for ${priceToDisplay}$`} />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default BuyRewardPopup;
