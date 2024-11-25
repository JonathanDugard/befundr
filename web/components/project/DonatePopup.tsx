'use client';
import React, { useMemo, useState } from 'react';
import PopupLayout from '../z-library/popup/PopupLayout';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import AtaBalance from '../z-library/display_elements/AtaBalance';
import ClaimUSDCButton from '../z-library/button/ClaimUSDCButton';
import { requiresCheckBeforeAddContribution } from './utils';
import { PublicKey } from '@solana/web3.js';
import toast from 'react-hot-toast';
import { useBefundrProgramContribution } from '../befundrProgram/befundr-contribution-access';
import Link from 'next/link';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { convertNumberToSplAmount } from '@/utils/functions/utilFunctions';

type Props = {
  handleClose: () => void;
  projectId: string;
  amount: number;
  userEntryAddress: PublicKey;
  project: Project;
  refetchProject: () => void;
};

const DonatePopup = (props: Props) => {
  //* GLOBAL STATE
  const { getUserWalletAtaBalance, userAccountFromWalletPublicKey } =
    useBefundrProgramUser();
  const { publicKey } = useWallet();
  const { addContribution } = useBefundrProgramContribution();

  //* LOCAL STATE
  const { data: userWalletAtaBalance, refetch } =
    getUserWalletAtaBalance(publicKey);

  const { data: userProfile } = userAccountFromWalletPublicKey(publicKey);

  const ataBalance = useMemo(() => {
    return userWalletAtaBalance ? userWalletAtaBalance.amount : 0;
  }, [userWalletAtaBalance]);

  const [isLoading, setIsLoading] = useState(false);
  const [donationAmount, setDonationAmount] = useState(props.amount);

  const handleDonationAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setDonationAmount(isNaN(value) ? 0 : value);
  };

  const handleAddContribution = async () => {
    setIsLoading(true);
    const check = requiresCheckBeforeAddContribution(
      props.project,
      donationAmount
    );
    if (check !== true) {
      console.error(check);
      if (typeof check === 'string') {
        toast.error(check);
      }
      setIsLoading(false);
      return;
    }

    if (publicKey) {
      try {
        await addContribution.mutateAsync({
          projectPubkey: new PublicKey(props.projectId),
          userPubkey: props.userEntryAddress,
          userWalletPubkey: publicKey,
          projectContributionCounter: props.project.contributionCounter,
          amount: convertNumberToSplAmount(donationAmount),
          rewardId: null,
        });
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoading(false);
    refetch();
    props.refetchProject();
    props.handleClose();
  };

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        <p className="textStyle-title w-full text-left">
          Donate to {props.project.name}
        </p>
        <div className="w-full flex justify-start -mt-10">
          <AtaBalance />
        </div>
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="w-40 h-40 bg-neutral-300"></div>
          <div className="flex flex-col items-start gap-4">
            <p className="textStyle-body">
              Donate <strong>${donationAmount}</strong>
            </p>
            <input
              type="number"
              value={donationAmount}
              onChange={handleDonationAmountChange}
              className="bg-main rounded-md w-full border border-gray-300 p-2 textStyle-body"
              placeholder="Enter donation amount"
            />
            {ataBalance < donationAmount && (
              <>
                <p className="textStyle-body !text-custom-red">
                  Insufficient balance!
                </p>
                <ClaimUSDCButton />
              </>
            )}
            {!userProfile && (
              <p className="textStyle-body !text-custom-red">
                You need to create your profile to contribute
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.handleClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          {userProfile ? (
            <button onClick={handleAddContribution}>
              <MainButtonLabelAsync
                label="Donate"
                isLoading={isLoading}
                loadingLabel={'Opening wallet...'}
              />
            </button>
          ) : (
            <Link href={'/profile/myprofile'}>
              <MainButtonLabel label="Create your profile" />
            </Link>
          )}
        </div>
      </div>
    </PopupLayout>
  );
};

export default DonatePopup;