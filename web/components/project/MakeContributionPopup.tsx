'use client';
import React, { useMemo, useState } from 'react';
import PopupLayout from '../z-library/popup/PopupLayout';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import AtaBalance from '../z-library/display elements/AtaBalance';
import ClaimUSDCButton from '../z-library/button/ClaimUSDCButton';
import { requiresCheckBeforeAddContribution } from './utils';
import { PublicKey } from '@solana/web3.js';
import toast from 'react-hot-toast';
import { useBefundrProgramContribution } from '../befundrProgram/befundr-contribution-access';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';

type Props = {
  reward: Reward;
  handleClose: () => void;
  projectId: string;
  rewardId: number;
  amount: number;
  userEntryAddress: PublicKey;
  project: Project;
  refetchProject: () => void;
};

const MakeContributionPopup = (props: Props) => {
  //* GLOBAL STATE
  const { getUserWalletATABalance } = useBefundrProgramUser();
  const { publicKey } = useWallet();
  const { addContribution } = useBefundrProgramContribution();

  //* LOCAL STATE
  const { data: userWalletATABalance, refetch } =
    getUserWalletATABalance(publicKey);

  const ATABalance = useMemo(() => {
    if (userWalletATABalance) {
      return convertSplAmountToNumber(userWalletATABalance.amount);
    } else {
      return 0;
    }
  }, [userWalletATABalance]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAddContribution = async () => {
    setIsLoading(true);
    // require check
    const check = requiresCheckBeforeAddContribution(
      props.project,
      props.amount
    );
    if (check !== true) {
      console.error(check);
      if (typeof check === 'string') {
        toast.error(check);
      }
      setIsLoading(false);
      return;
    }

    // launch TX
    if (publicKey)
      try {
        await addContribution.mutateAsync({
          projectPubkey: new PublicKey(props.projectId),
          userPubkey: props.userEntryAddress,
          userWalletPubkey: publicKey,
          projectContributionCounter: props.project.contributionCounter,
          amount: props.amount,
          rewardId: props.rewardId,
        });
      } catch (e) {
        console.error(e);
      }
    setIsLoading(false);
    refetch();
    props.refetchProject();
    props.handleClose();
  };

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
          <button onClick={handleAddContribution}>
            <MainButtonLabelAsync
              label={`Contribute for ${props.reward.price}$`}
              isLoading={isLoading}
              loadingLabel={'contributing'}
            />
          </button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default MakeContributionPopup;
