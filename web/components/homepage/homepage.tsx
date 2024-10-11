'use client';
import React from 'react';
import {
  HighlightSelection,
  EndingSoonProjects,
  KeyFigures,
  UserDashboard,
} from './homepage-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Homepage = () => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-col items-center justify-start gap-8 ">
      {publicKey ? <UserDashboard /> : <KeyFigures />}
      <h1 className="textStyle-title">
        Transform Ideas into Reality with{' '}
        <strong className="text-accent">Secure Crowdfunding</strong>
      </h1>
      <h3 className="textStyle-headline w-1/2 text-center">
        Join a <strong className="text-accent">community</strong> where{' '}
        <strong className="text-accent">trust</strong> and innovation drive
        success. Start your project with the confidence of{' '}
        <strong className="text-accent">blockchain</strong> security and
        community support.
      </h3>
      <HighlightSelection title="Featured projects" />
      <EndingSoonProjects title="Ending soon" />
    </div>
  );
};

export default Homepage;
