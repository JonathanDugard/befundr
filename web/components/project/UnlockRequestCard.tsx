'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { useMemo, useState } from 'react';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';
import { useBefundrProgramUnlockRequest } from '../befundrProgram/befundr-unlock-request-access';
import { PublicKey } from '@solana/web3.js';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { BN } from '@coral-xyz/anchor';
import { useBefundrProgramProject } from '../befundrProgram/befundr-project-access';

type Props = {
  unlockRequest: UnlockRequest;
  unlockRequestPubkey: PublicKey;
  project: Project;
  projectId: string;
  refetchProject: () => void;
};

const UnlockRequestCard = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const { claimUnlockRequest } = useBefundrProgramUnlockRequest();
  const { userAccountFromWalletPublicKey } = useBefundrProgramUser();
  const { findCorrectProjectCounter } = useBefundrProgramProject();
  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } =
    userAccountFromWalletPublicKey(publicKey);

  //* LOCAL STATE
  // loader
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  // Check if the current user is the owner of the project
  const isOwner = useMemo(() => {
    return props.project.owner.toString() === publicKey?.toString();
  }, [publicKey, props.project.owner]);

  const isOver = useMemo(() => {
    return new Date() > new Date(props.unlockRequest.endTime);
  }, [props.unlockRequest.endTime]);

  //* PROGRAM INTERACTION
  const handleWithDraw = async () => {
    setIsWithdrawLoading(true);
    console.log('withdraw');
    const projectPubkey = new PublicKey(props.projectId);
    const userPubkey = new PublicKey(props.project.user);
    if (publicKey && userProfile) {
      try {
        await claimUnlockRequest.mutateAsync({
          unlockRequestPubkey: props.unlockRequestPubkey,
          projectPubkey: projectPubkey,
          userWalletPubkey: publicKey,
          userPubkey: userPubkey,
          createdProjectCounter: findCorrectProjectCounter(projectPubkey, userPubkey, userProfile.createdProjectCounter),
        });
      } catch (e) {
        console.error(e);
      }
    }
    setIsWithdrawLoading(false);
    props.refetchProject();
  };



  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="text-center border-accent border-r pr-4">
          <p className="text-lg font-bold">
            {new Date(props.unlockRequest.createdTime * 1000).getFullYear()}
          </p>
          <p className="text-sm">
            {new Date(
              props.unlockRequest.createdTime * 1000
            ).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
            })}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="textStyle-headline">{props.unlockRequest.title}</h3>
            <a href="#" className="textStyle-body-accent underline ml-2">
              Show more
            </a>{' '}
            {/* Added "show more" link */}
          </div>
          <p className="textStyle-body">
            Requested amount: $
            {convertSplAmountToNumber(
              BigInt(props.unlockRequest.amountRequested)
            ).toLocaleString()}
          </p>{' '}
          {/* Displaying requested amount */}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <span className={`tag ${props.unlockRequest.status.toLowerCase()}`}>
          {props.unlockRequest.status}
        </span>
      </div>
      <div className="flex items-center justify-center gap-4">
        {!isOver && !isOwner && (
          <button>
            <MainButtonLabelAsync
              isLoading={false}
              label="Vote"
              loadingLabel="Voting..."
            />
          </button>
        )}
        {props.unlockRequest.status === 'approved' &&
          props.unlockRequest.isClaimed === false &&
          isOwner && (
            <button onClick={handleWithDraw} disabled={isWithdrawLoading}>
              <MainButtonLabelAsync
                isLoading={isWithdrawLoading}
                label="Withdraw"
                loadingLabel="Withdrawing..."
              />
            </button>
          )}
      </div>
    </div>
  );
};

export default UnlockRequestCard;
