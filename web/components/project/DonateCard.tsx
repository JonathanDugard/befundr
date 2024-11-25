'use client';
import React, { useState } from 'react';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Link from 'next/link';
import DonatePopup from './DonatePopup';
import ImageWithFallback from '../z-library/display_elements/ImageWithFallback';
import { ProjectStatus } from '@/data/projectStatus';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { BN } from '@coral-xyz/anchor';
import { WalletButton } from '../solana/solana-provider';

type Props = {
  project: Project;
  projectId: string;
  refetchProject: () => void;
};

const DonateCard = (props: Props) => {
  //* GLOBAL STATE
  const { getUserPdaPublicKey: getUserEntryAddress } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  //* LOCAL STATE
  const [isDonatePopupOpen, setIsDonatePopupOpen] = useState(false);

  const handleOpenDonatePopup = () => {
    setIsDonatePopupOpen(true);
  };

  const handleCloseDonatePopup = () => {
    setIsDonatePopupOpen(false);
  };

  // Use React Query to fetch userPDA address based on public key
  const { data: userEntryAddress, isLoading: isFetchingUserEntryAddress } =
    getUserEntryAddress(publicKey);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col items-start justify-between gap-2 w-full ">
        <p className="textStyle-subheadline">Donation</p>
        <p className="textStyle-headline">
          Free amount
        </p>            
      </div>
      <button onClick={handleOpenDonatePopup}>
        <MainButtonLabel label="Contribute" />
      </button>
      {isDonatePopupOpen && userEntryAddress && (
      <DonatePopup
        handleClose={() => handleCloseDonatePopup()}
        projectId={props.projectId}
        amount={10}
        userEntryAddress={userEntryAddress}
        refetchProject={props.refetchProject}
        project={props.project}
      />
      )}
    </div>
  );
};

export default DonateCard;
