'use client';
import React from 'react';
import { HighlightSelection, KeyFigures, UserDashboard } from './homepage-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Homepage = () => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-col items-center justify-start gap-10 ">
      {publicKey && <UserDashboard />}
      <h1 className="textStyle-title">
        Your <strong className="text-accent">secured</strong> crowdfunding
        platform
      </h1>
      <h3 className="textStyle-headline w-2/3 text-center">
        With beFundr, contribute to early projects in the most secure way.
        Don&apos;t want to wait for the project&apos;s delivery? Buy an
        available reward directly.
      </h3>
      <KeyFigures />
      <HighlightSelection title="Almost funded" />
      <HighlightSelection title="Top contributions" />
      <HighlightSelection title="Most trusted" />
      <HighlightSelection title="Ending soon" />
    </div>
  );
};

export default Homepage;
