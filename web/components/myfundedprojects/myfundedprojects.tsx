'use client';
import React, { useEffect, useState } from 'react';
import InputField from '../z-library/button/InputField';
import TextArea from '../z-library/button/TextArea';
import PicSelector from '../z-library/button/PicSelector';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import {
  getContributionByRewardIdAndUserAddress,
  getContributionByUserAddress,
} from '@/utils/functions/contributionsFunctions';
import { contributions, user1 } from '@/data/localdata';
import { useWallet } from '@solana/wallet-adapter-react';
import FundedProjectCard from '../z-library/card/FundedProjectCard';
import Divider from '../z-library/display_elements/Divider';
import { useRouter } from 'next/navigation';

type Props = {};

const MyFundedProjects = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const router = useRouter();

  //* LOCAL STATE
  const [contributionsToDisplay, setContributionsToDisplay] = useState<
    Contribution[] | null
  >(null);

  useEffect(() => {
    if (user1)
      setContributionsToDisplay(
        getContributionByUserAddress(contributions, user1.owner)
      );
  }, [user1]);

  // nagiguate to homepage is user disconnected
  if (!publicKey) router.push('/');

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h1 className="textStyle-title">My funded projects</h1>
      <div className="flex justify-between items-center w-full -mt-4 mb-6">
        <h2 className="textStyle-headline">
          Below are all the projects for which you hold contributions
        </h2>
      </div>
      <div className="flex flex-col items-start justify-start gap-10 w-full">
        {contributionsToDisplay?.map((contribution, index) => (
          <div className="flex flex-col items-start justify-start gap-10 w-full">
            <FundedProjectCard key={index} contribution={contribution} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFundedProjects;
