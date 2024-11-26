'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { convertSplAmountToNumber } from '@/utils/functions/utilFunctions';
import { useMemo } from 'react';
import MainButtonLabelAsync from '../z-library/button/MainButtonLabelAsync';

type Props = {
  unlockRequest: UnlockRequest;
  project: Project;
  projectId: string;
  refetchProject: () => void;
};

const UnlockRequestCard = (props: Props) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();

  //* LOCAL STATE
  // Check if the current user is the owner of the project
  const isOwner = useMemo(() => {
    return props.project.owner.toString() === publicKey?.toString();
  }, [publicKey, props.project.owner]);

  const isOver = useMemo(() => {
    return new Date() > new Date(props.unlockRequest.endTime);
  }, [props.unlockRequest.endTime]);

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
            <button>
              <MainButtonLabelAsync
                isLoading={false}
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
