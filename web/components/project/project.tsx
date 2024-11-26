'use client';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import BackButton from '../z-library/button/BackButton';
import Divider from '../z-library/display_elements/Divider';
import InfoLabel from '../z-library/display_elements/InfoLabel';
import ProgressBar from '../z-library/display_elements/ProgressBar';
import {
  calculateTimeRemaining,
  calculateTrustScore,
  convertSplAmountToNumber,
} from '@/utils/functions/utilFunctions';
import MainButtonLabel from '../z-library/button/MainButtonLabelBig';
import {
  AboutBlock,
  MilestonesBlock,
  FounderBlock,
  RewardBlock,
  UpdateBlock,
  FundsRequestBlock,
} from './project-ui';
import Link from 'next/link';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import ImageWithFallback from '../z-library/display_elements/ImageWithFallback';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { useBefundrProgramUnlockRequests } from '../befundrProgram/befundr-unlock-requests-access';
import { PublicKey } from '@solana/web3.js';
import { ProjectStatus } from '@/data/projectStatus';
import { BN } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import NewUnlockRequestPopup from './NewUnlockRequestPopup';

type Props = {
  project: Project;
  projectId: string;
  refetchProject: () => void;
};

const Project = (props: Props) => {
  //* GENERAL STATE
  const router = useRouter();
  const { publicKey } = useWallet();
  const { userAccountFromAccountPublicKey, getUserPdaPublicKey } = useBefundrProgramUser();
  const { getUnlockRequestsFromProjectPubkey } = useBefundrProgramUnlockRequests();

  //* LOCAL STATE
  const [selectedMenu, setSelectedMenu] = 
    useState<
      'about' 
      | 'milestones' 
      | 'rewards' 
      | 'funder' 
      | 'update' 
      | 'vote'
    >('about');

  // Use React Query to fetch user profile based on public key
  const { data: userProfile, isLoading: isFetchingUser } = userAccountFromAccountPublicKey(new PublicKey(props.project.user));
  const { data: userPdaKey } = getUserPdaPublicKey(publicKey);

  // Get project's unlock requests
  const { data: unlockRequestsData, isLoading: isFetchingUnlockRequests } = getUnlockRequestsFromProjectPubkey(new PublicKey(props.projectId));
  const unlockedAmount = unlockRequestsData?.unlockedAmount ?? 0;
  const requestCounter = unlockRequestsData?.requestCounter ?? 0;
  const requests = unlockRequestsData?.requests;

  const [isNewUnlockRequestPopupVisible, setIsNewUnlockRequestPopupVisible] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      {/* header */}
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <div className="flex items-center justify-between w-full gap-10">
        <div className="flex items-center gap-10">
          <h1 className="textStyle-title">{props.project.name}</h1>
          <InfoLabel label={`${props.project.status}`} />
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-2">
              <SecondaryButtonLabel label="Share on X" />
          </button>
          <button className="flex items-center gap-2">
            <SecondaryButtonLabel label="+ Follow" />
          </button>
        </div>
      </div>
      <Divider />
      {/* main info */}
      <div className="w-full flex justify-start items-start gap-8 ">
        {/* image */}
        <ImageWithFallback
          alt="image"
          fallbackImageSrc="/images/default_project_image.jpg"
          classname="w-1/5 md:w-1/5 aspect-square object-cover"
          src={props.project.imageUrl}
          height={200}
          width={200}
        />
        {/* info */}
        <div className="flex flex-col items-start justify-start gap-4 w-1/2  h-full">
          <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            Granted by Foundation
          </span>
          <div className="flex justify-between w-full">
            <p className="textStyle-subheadline">
              <strong className="textStyle-subtitle">
                ${convertSplAmountToNumber(new BN(props.project.raisedAmount))}
              </strong>
            </p>
            <p className="textStyle-subheadline">
              <strong className="textStyle-subtitle">
                ${convertSplAmountToNumber(new BN(props.project.goalAmount))} target
              </strong>
            </p>
          </div>
          <ProgressBar
            currentAmount={props.project.raisedAmount}
            goalAmount={props.project.goalAmount}
          />
          {/* metrics + trust */}
          <div className="flex justify-between items-center  w-full gap-4">
            <div className="flex flex-col items-start justify-center w-1/2 flex-grow">
              {props.project.status === ProjectStatus.Fundraising.enum && (
              <p className="textStyle-subheadline">
                <strong className="textStyle-subtitle">
                  {calculateTimeRemaining(props.project.endTime)}
                </strong>{' '}
                days left
              </p>
              )}
              <p className="textStyle-subheadline">
                <strong className="textStyle-subtitle">
                  {props.project.contributionCounter}
                </strong>{' '}
                {props.project.contributionCounter === 1 ? 'contribution' : 'contributions'}
              </p>
            </div>
          </div>
          {/* buttons if fundraising*/}
          {props.project.status === ProjectStatus.Fundraising.enum && (
            <div className="flex flex-row gap-4 w-full">
            <button
              className="flex-1"
              onClick={() => setSelectedMenu('rewards')}
            >
              <MainButtonLabel label="Contribute" />
            </button>
            <button
              className="flex-1"
              // onClick={() => setSelectedMenu('milestones')}
              onClick={() => setIsNewUnlockRequestPopupVisible(true)}
              >
              <MainButtonLabel label="New Unlock Request" />
            </button>
          </div>
          )}

          {/* New Unlock Request Popup */}
          {isNewUnlockRequestPopupVisible && (
            <NewUnlockRequestPopup     
              onClose={() => setIsNewUnlockRequestPopupVisible(false)}
              projectId={props.projectId}
              requestCounter={requestCounter} // Assuming requests is an array
              userEntryAddress={userPdaKey}
              project={props.project}
              refetchProject={props.refetchProject}
            />
          )}

          {/* button if realizing status */}
          {props.project.status === ProjectStatus.Realising.enum && (
            <Link href={`/marketplace/${props.projectId}`} className="w-full">
              <MainButtonLabel label="Look for rewards to buy" />
            </Link>
          )}
        </div>
      </div>
      {/* menu */}
      <div className="w-full h-10 bg-second flex justify-between items-center px-4 mt-10">
        <button
          className={`${
            selectedMenu === 'about'
              ? 'textStyle-body-accent !font-normal'
              : 'textStyle-body'
          }`}
          onClick={() => setSelectedMenu('about')}
        >
          About the project
        </button>
        <button
          className={`${
            selectedMenu === 'milestones'
              ? 'textStyle-body-accent !font-normal'
              : 'textStyle-body'
          }`}
          onClick={() => setSelectedMenu('milestones')}
        >
          Milestones
          <span className="ml-1 bg-red-500 rounded-full w-2 h-2 inline-block"></span>
        </button>
        <button
          className={`${
            selectedMenu === 'rewards'
              ? 'textStyle-body-accent !font-normal'
              : 'textStyle-body'
          }`}
          onClick={() => setSelectedMenu('rewards')}
        >
          Rewards
        </button>
        <button
          className={`${
            selectedMenu === 'funder'
              ? 'textStyle-body-accent !font-normal'
              : 'textStyle-body'
          }`}
          onClick={() => setSelectedMenu('funder')}
        >
          Funder trustworthiness
        </button>
        <button
          className={`${
            selectedMenu === 'update'
              ? 'textStyle-body-accent !font-normal'
              : 'textStyle-body'
          }`}
          onClick={() => setSelectedMenu('update')}
        >
          Update
        </button>
        {props.project.status === ProjectStatus.Realising.enum && (
          <button
            className={`${
              selectedMenu === 'vote'
                ? 'textStyle-body-accent'
                : 'textStyle-body'
            }`}
            onClick={() => setSelectedMenu('vote')}
          >
            Vote
          </button>
        )}
      </div>
      {props.project.user === userPdaKey?.toString() && (
        <div className="w-full flex justify-left -mt-10">
          {selectedMenu === 'update' && (
            <button>
              <SecondaryButtonLabel label="Add an update" />
            </button>
          )}
          {selectedMenu === 'vote' && (
            <button>
              <SecondaryButtonLabel label="Ask for funds unlock" />
            </button>
          )}
        </div>
      )}
      {/* blocks to display */}
      {selectedMenu === 'about' && (
        <AboutBlock
          description={props.project.description}
          xAccount={props.project.xAccountUrl}
        />
      )}
      {selectedMenu === 'milestones' && (
        <MilestonesBlock
          project={props.project}
          projectId={props.projectId}
          refetchProject={props.refetchProject}
        />
      )}
      {selectedMenu === 'rewards' && (
        <RewardBlock
          project={props.project}
          projectId={props.projectId}
          refetchProject={props.refetchProject}
        />
      )}
      {selectedMenu === 'funder' && userProfile && (
        <FounderBlock
          founder={userProfile}
          safetyDeposit={props.project.safetyDeposit}
        />
      )}
      {selectedMenu === 'update' && <UpdateBlock feeds={[]} />}
      {selectedMenu === 'vote' && <FundsRequestBlock fundsRequests={[]} />}
    </div>
  );
};

export default Project;
