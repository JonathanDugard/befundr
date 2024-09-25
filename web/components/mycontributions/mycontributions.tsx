'use client';
import React, { useEffect, useState } from 'react';
import InputField from '../z-library/button/InputField';
import TextArea from '../z-library/button/TextArea';
import PicSelector from '../z-library/button/PicSelector';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { contributions, user1 } from '@/data/localdata';
import { getContributionByUserAddress } from '@/utils/functions/contributionsFunctions';
import ContributionCard from '../z-library/card/ContributionCard';

type Props = {};

const MyContributions = (props: Props) => {
  const [contributionsToDisplay, setContributionsToDisplay] = useState<
    Contribution[] | null | undefined
  >(null);

  useEffect(() => {
    setContributionsToDisplay(
      getContributionByUserAddress(contributions, user1.ownerAddress)
    );
  }, [user1]);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      <h1 className="textStyle-title">My contributions</h1>
      <div className="flex justify-between items-center w-full -mt-4 mb-6">
        <h2 className="textStyle-headline">
          Below are all the contributions you hold
        </h2>
      </div>
      <div
        className="grid justify-center gap-6 w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(240px,240px))',
        }}
      >
        {contributionsToDisplay &&
          contributionsToDisplay.map((contribution, index) => (
            <ContributionCard key={index} contribution={contribution} />
          ))}
      </div>
    </div>
  );
};

export default MyContributions;
