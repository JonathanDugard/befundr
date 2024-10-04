'use client';
import React, { useMemo } from 'react';
import PopupLayout from './PopupLayout';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import AtaBalance from '../display elements/AtaBalance';
import ClaimUSDCButton from '../button/ClaimUSDCButton';

type Props = {
  reward: Reward;
  handleClose: () => void;
};

const MakeContributionPopup = (props: Props) => {
  // get ATA balance ---
  const { getUserWalletATABalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  const { data: userWalletATABalance } = getUserWalletATABalance(publicKey);

  const ATABalance = useMemo(() => {
    if (userWalletATABalance) {
      return convertSplAmountToNumber(userWalletATABalance.amount);
    } else {
      return 0;
    }
  }, [userWalletATABalance]);
  // --- get ATA balance

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        {/* title */}
        <p className="textStyle-title w-full text-left">
          Contribute for {props.reward.name}
        </p>
        <div className="w-full flex justify-start -mt-10">
          <AtaBalance />
        </div>
        {/* description */}
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="w-40 h-40 bg-neutral-300"></div>
          <div className="flex flex-col items-center gap-4">
            <p className="textStyle-body">
              You are about to contribute for this reward for{' '}
              <strong>{props.reward.price}$</strong>
            </p>
            {ATABalance < props.reward.price && (
              <>
                <p className="textStyle-body !text-custom-red">
                  you don&apos;t have enough faucet $
                </p>
                <ClaimUSDCButton />
              </>
            )}
          </div>
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
