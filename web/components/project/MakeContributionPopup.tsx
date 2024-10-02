'use client';
import React, { useState } from 'react';
import PopupLayout from '../z-library/popup/PopupLayout';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { useBefundrProgramContribution } from '@/components/befundrProgram/befundr-contribution-access';
import { PublicKey } from '@solana/web3.js';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';

type Props = {
  reward: Reward;
  handleClose: () => void;
  projectId: string;
  rewardId: number;
  amount: number;
  userEntryAddress: PublicKey;
  projectContributionCounter: number;
  refetchProject: () => void;
};

const MakeContributionPopup = (props: Props) => {
  //* GLOBAL STATE
  const { addContribution } = useBefundrProgramContribution();

  //* LOCAL STATE
  const [isLoading, setIsLoading] = useState(false);

  const handleAddContribution = async () => {
    setIsLoading(true);
    try {
      await addContribution.mutateAsync({
        projectPubkey: new PublicKey(props.projectId),
        userPubkey: props.userEntryAddress,
        projectContributionCounter: props.projectContributionCounter,
        amount: props.amount,
        rewardId: props.rewardId,
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    props.refetchProject();
    props.handleClose();
  };

  console.log(props.projectId);

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
