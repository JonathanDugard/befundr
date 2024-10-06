'use client';
import React from 'react';
import ContributionCard from '../z-library/card/ContributionCard';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { useBefundrProgramContribution } from '../befundrProgram/befundr-contribution-access';

type Props = {};

const MyContributions = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const router = useRouter();
  const { getAllUserContributions } = useBefundrProgramContribution();
  const { getUserPdaPublicKey } = useBefundrProgramUser();

  //* LOCAL STATE
  const { data: userPdaPublicKey } = getUserPdaPublicKey(publicKey);
  const { data } = getAllUserContributions(userPdaPublicKey);

  // nagiguate to homepage is user disconnected
  if (!publicKey) router.push('/');

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
        {data &&
          data.map((contribution, index) => (
            <ContributionCard
              key={index}
              contribution={contribution.account}
              contributionPdaPublicKey={contribution.publicKey}
            />
          ))}
      </div>
    </div>
  );
};

export default MyContributions;
