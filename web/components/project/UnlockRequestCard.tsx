'use client';
import React, { useState } from 'react';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Link from 'next/link';
import MakeContributionPopup from './MakeContributionPopup';
import ImageWithFallback from '../z-library/display_elements/ImageWithFallback';
import { ProjectStatus } from '@/data/projectStatus';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { BN } from '@coral-xyz/anchor';
import { WalletButton } from '../solana/solana-provider';

type Props = {
  unlockRequest: UnlockRequest;
  project: Project;
  projectId: string;
  refetchProject: () => void;
};

const UnlockRequestCard = (props: Props) => {
  //* GLOBAL STATE
  const { getUserPdaPublicKey: getUserEntryAddress } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  // handle created and end times convert to Date
  const createdDate = new Date();
  const endDate = new Date();

  // TODO: 
  // - handle unlock request states
  //    isClaimed: true => Complete
  //    ...
  // - display remaining days from now to endDate


  // Use React Query to fetch userPDA address based on public key
  const { data: userEntryAddress, isLoading: isFetchingUserEntryAddress } =
    getUserEntryAddress(publicKey);

  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
    <div className="flex items-center gap-4">
      <div className="text-center border-secondary border-r pr-4">
        <p className="text-lg font-bold">{createdDate.getFullYear()}</p>
        <p className="text-sm">{createdDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="textStyle-headline">{props.unlockRequest.title}</h3>
          <a href="#" className="textStyle-body-accent underline ml-2">Show more</a> {/* Added "show more" link */}
        </div>
        <p className="textStyle-body">
            Requested amount: ${convertSplAmountToNumber(BigInt(props.unlockRequest.amountRequested)).toLocaleString()}</p> {/* Displaying requested amount */}
      </div>
    </div>
    <div className="flex items-center justify-center gap-4">
      <span className={`tag ${props.unlockRequest.status.toLowerCase()}`}>
        {props.unlockRequest.status}
      </span>
    </div>
    <div className="flex items-center justify-center gap-4">
      {props.unlockRequest.status === "Pending" && (
        <button className="btn-vote">Vote</button>
      )}
      {props.unlockRequest.status === "Approved" && (
        <button className="btn-claim">Withdraw</button>
      )}
    </div>
  </div>
  );
};

export default UnlockRequestCard;
