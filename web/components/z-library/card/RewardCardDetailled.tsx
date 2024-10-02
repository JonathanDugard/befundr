'use client';
import React, { useEffect, useState } from 'react';
import SecondaryButtonLabel from '../button/SecondaryButtonLabel';
import MainButtonLabel from '../button/MainButtonLabel';
import Link from 'next/link';
import MakeContributionPopup from '../../project/MakeContributionPopup';
import ImageWithFallback from '../display elements/ImageWithFallback';
import { ProjectStatus } from '@/data/projectStatus';
import { useBefundrProgramUser } from '@/components/befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '@/components/solana/solana-provider';

type Props = {
  reward: Reward;
  project: Project;
  projectId: string;
  rewardId: number;
  refetchProject: () => void;
};

const RewardCardDetailled = (props: Props) => {
  //* GLOBAL STATE
  const { getUserEntryAddress } = useBefundrProgramUser();
  const { publicKey } = useWallet();

  //* LOCAL STATE
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [userEntryAddress, setUserEntryAddress] = useState<PublicKey | null>(
    null
  );

  // get the user entry address
  useEffect(() => {
    const fetchUserEntryAddress = async () => {
      if (publicKey) {
        const userEntryAddress = await getUserEntryAddress(publicKey);
        setUserEntryAddress(userEntryAddress);
      }
    };
    fetchUserEntryAddress();
  }, [publicKey]);

  return (
    <div className="flex justify-start items-start gap-6 w-full h-full ">
      {/* image */}
      <div className="bg-neutral-400 w-1/4 aspect-square">
        <ImageWithFallback
          alt="image"
          fallbackImageSrc="/images/default_project_image.jpg"
          classname="w-1/2 md:w-1/3 aspect-square object-cover"
          src={props.reward.imageUrl}
          height={400}
          width={400}
        />
      </div>
      {/* info */}
      <div className="flex flex-col items-start justify-between gap-2 w-full ">
        <p className="textStyle-headline">{props.reward.name}</p>
        <p className="textStyle-subheadline">{props.reward.price}$</p>
        {props.reward.maxSupply ? (
          <p className="textStyle-body">
            Limited supply :{' '}
            {props.reward.maxSupply - props.reward.currentSupply} availables
            {props.reward.currentSupply >= props.reward.maxSupply && (
              <strong className="ml-4 !text-custom-red">Supply reached</strong>
            )}
          </p>
        ) : (
          <p className="textStyle-body">Illimited supply</p>
        )}
        <p className="textStyle-body">{props.reward.description}</p>
        <div className="grow"></div>
        <div className="flex justify-between items-center w-full mt-auto">
          <p className="textStyle-subheadline">
            {props.reward.currentSupply} contributors
          </p>
          {/* button if status fundraising */}
          {props.project.status === ProjectStatus.Fundraising.enum && (
            <div className="flex justify-end gap-4">
              <Link href={`/marketplace/${props.projectId}`}>
                <SecondaryButtonLabel label="Go to marketplace" />
              </Link>
              {publicKey ? (
                <button onClick={() => setIsShowPopup(true)}>
                  <MainButtonLabel label="Contribute" />
                </button>
              ) : (
                <WalletButton />
              )}
            </div>
          )}
          {/* button if status realizing */}
          {props.project.status === ProjectStatus.Realising.enum && (
            <Link href={`/marketplace/${props.projectId}`}>
              <MainButtonLabel label="Go to marketplace" />
            </Link>
          )}
        </div>
      </div>
      {isShowPopup && userEntryAddress && (
        <MakeContributionPopup
          reward={props.reward}
          handleClose={() => setIsShowPopup(false)}
          projectId={props.projectId}
          rewardId={props.rewardId}
          amount={props.reward.price}
          userEntryAddress={userEntryAddress}
          refetchProject={props.refetchProject}
          project={props.project}
        />
      )}
    </div>
  );
};

export default RewardCardDetailled;
