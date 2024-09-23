'use client';
import React, { useState } from 'react';
import Divider from '../z-library/display elements/Divider';
import { useRouter } from 'next/navigation';
import BackButton from '../z-library/button/BackButton';
import {
  DescriptionBLock,
  FundingBlock,
  MainInfoBlock,
  ProjectLaunchMenu,
  RewardsBlock,
  TrustBlock,
  ValidationBlock,
} from './launchproject-ui';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { RewardBlock } from '../project/project-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import { WalletButton } from '../solana/solana-provider';

const Launchproject = () => {
  //* GENERAL STATE
  const router = useRouter();
  const { publicKey } = useWallet();

  //* LOCAL STATE
  const [selectedStep, setSelectedStep] = useState<number>(0);

  console.log(publicKey);

  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <h1 className="textStyle-title">
        <strong className="text-accent">Launch</strong> your project
      </h1>
      <h2 className="textStyle-headline -mt-10">
        Your about to start your founder journey ! Exiting ! <br />
        Follow the step by step process
      </h2>
      <Divider />
      {/* menu */}
      <ProjectLaunchMenu
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      {/* steps blocks */}
      <div className="w-full md:w-1/2">
        {selectedStep === 0 && <MainInfoBlock />}
        {selectedStep === 1 && <FundingBlock />}
        {selectedStep === 2 && <RewardsBlock />}
        {selectedStep === 3 && <DescriptionBLock />}
        {selectedStep === 4 && <TrustBlock />}
        {selectedStep === 5 && <ValidationBlock />}
      </div>
      {/* continue button */}
      <div className="w-full flex justify-end">
        {selectedStep !== 5 && (
          <button onClick={() => setSelectedStep(selectedStep + 1)}>
            <MainButtonLabel label="Contrinue" />
          </button>
        )}
        {selectedStep === 5 && publicKey && (
          <button onClick={() => {}}>
            <MainButtonLabel label="Launch your project" />
          </button>
        )}
        {selectedStep === 5 && !publicKey && <WalletButton />}
      </div>
    </div>
  );
};

export default Launchproject;
