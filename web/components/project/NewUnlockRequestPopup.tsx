'use client';
import React, { useMemo, useState } from 'react';
import PopupLayout from '../z-library/popup/PopupLayout';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramUnlockRequest } from '../befundrProgram/befundr-unlock-request-access';
import Link from 'next/link';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import { convertNumberToSplAmount, convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import InputField from '../z-library/button/InputField';

type Props = {
  onClose: () => void;
  projectId: string;
  requestCounter: number;
  userEntryAddress: PublicKey | undefined;
  project: Project;
  refetchProject: () => void;
};

const NewUnlockRequestPopup = (props: Props) => {
  //* GLOBAL STATE
  const { getUserWalletAtaBalance, userAccountFromWalletPublicKey } =
    useBefundrProgramUser();
  const { publicKey } = useWallet();
  const { createUnlockRequest } = useBefundrProgramUnlockRequest();

  const [title, setTitle] = useState(''); // New state for the title

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //* LOCAL STATE
  const { data: userWalletAtaBalance, refetch } =
    getUserWalletAtaBalance(publicKey);

  const { data: userProfile } = userAccountFromWalletPublicKey(publicKey);

  const ataBalance = useMemo(() => {
    return userWalletAtaBalance ? userWalletAtaBalance.amount : 0;
  }, [userWalletAtaBalance]);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setEndTime(isNaN(value) ? 0 : value);
  };

  const handleCreateUnlockRequest = async () => {
    setIsLoading(true);

    if (!props.userEntryAddress) {
      throw new Error('Missing User Account PublicKey');
    }

    if (publicKey) {
      try {
        const endTimeInMilliseconds = Date.now() + endTime * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        await createUnlockRequest.mutateAsync({
          projectPubkey: new PublicKey(props.projectId),
          userPubkey: props.userEntryAddress,
          requestCounter: props.requestCounter,
          amount: convertNumberToSplAmount(amount),
          endTime: endTimeInMilliseconds,
          title: title,
        });
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoading(false);
    refetch();
    props.refetchProject();
    props.onClose();
  };

  return (
    <PopupLayout item="center" justify="center" padding="10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        <p className="textStyle-title w-full text-left">
          New Unlock Request for {props.project.name}
        </p>
        <div className="w-full flex justify-start -mt-10">
          Total raised amount: ${convertSplAmountToNumber(BigInt(props.project.raisedAmount))}
        </div>
        <div className="flex justify-start items-center gap-4 w-full">
          <div className="flex flex-col items-start gap-4">
          <p className="textStyle-body -mb-2">
            Unlock Request Title
          </p>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="bg-main rounded-md w-full border border-gray-300 p-2 textStyle-body"
            placeholder="Enter title"
          />
            <p className="textStyle-body -mb-2">
              Enter Amount
            </p>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="bg-main rounded-md w-full border border-gray-300 p-2 textStyle-body"
              placeholder="Enter amount"
            />
            <p className="textStyle-body -mb-2">
              End in (days)
            </p>
            <InputField
              label=""
              placeholder="Select the duration (between 1 to 90 days)"
              type="number"
              value={endTime}
              handleChange={handleEndTimeChange}
              inputName="endTime"
              min={1}
              max={90}
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-10 w-full">
          <button onClick={props.onClose}>
            <SecondaryButtonLabel label="Cancel" />
          </button>
          {userProfile ? (
            <button onClick={handleCreateUnlockRequest}>
            <MainButtonLabelAsync
              label="Send unlock request"
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

export default NewUnlockRequestPopup;