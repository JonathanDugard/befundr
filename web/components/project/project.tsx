'use client';
import { project1, user1 } from '@/data/localdata';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import BackButton from '../z-library/button/BackButton';
import Divider from '../z-library/display elements/Divider';
import InfoLabel from '../z-library/display elements/InfoLabel';
import ProgressBar from '../z-library/display elements/ProgressBar';
import { calculateTimeRemaining } from '@/utils/functions/utilFunctions';
import TrustScore from '../z-library/display elements/TrustScore';
import MainButtonLabelBig from '../z-library/button/MainButtonLabelBig';
import SecondaryButtonLabelBig from '../z-library/button/SecondaryButtonLabelBig';
import {
  AboutBlock,
  FounderBlock,
  RewardBlock,
  UpdateBlock,
  FundsRequestBlock,
} from './project-ui';
import Link from 'next/link';
import { Button } from '@solana/wallet-adapter-react-ui/lib/types/Button';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';

type Props = {
  project: Project;
};

const Project = (props: Props) => {
  //* GENERAL STATE
  const router = useRouter();

  //* LOCAL STATE
  const pathname = usePathname();

  const [selectedMenu, setSelectedMenu] = useState<
    'about' | 'rewards' | 'funder' | 'update' | 'vote'
  >('about');

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full">
      {/* header */}
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <div className="flex items-center gap-10">
        <h1 className="textStyle-title">{props.project.name}</h1>
        <InfoLabel label={`${props.project.status}`} />
      </div>
      <Divider />
      {/* main info */}
      <div className="w-full flex justify-start items-start gap-8 ">
        {/* image */}
        <div className="bg-neutral-400 w-1/2 md:w-1/3 aspect-square"></div>
        {/* info */}
        <div className="flex flex-col items-start justify-start gap-4 w-1/2  h-full">
          <p className="textStyle-subheadline">Contributions amount</p>
          <ProgressBar
            currentAmount={props.project.raisedAmount}
            goalAmount={props.project.goalAmount}
          />
          {/* metrics + trust */}
          <div className="flex justify-between items-center  w-full gap-4 ">
            <div className="flex flex-col items-start justify-center w-1/2 flex-grow">
              <p className="textStyle-subheadline">
                <strong className="textStyle-subtitle">
                  {props.project.raisedAmount} $
                </strong>{' '}
                on {props.project.goalAmount}$ goal
              </p>
              <p className="textStyle-subheadline">
                <strong className="textStyle-subtitle">
                  {props.project.contributionCounter}
                </strong>{' '}
                contributors
              </p>
              {props.project.status === 'Fundraising' && (
                <p className="textStyle-subheadline">
                  <strong className="textStyle-subtitle">
                    {calculateTimeRemaining(props.project.endTime)}
                  </strong>{' '}
                  days remaining
                </p>
              )}
            </div>
            <div className="w-1/3 aspect-square flex flex-col justify-center items-center gap-2">
              <TrustScore trustValue={props.project.trustScore} />
              <p className="flex justify-center w-full textStyle-subheadline">
                Trust level {props.project.trustScore}%
              </p>
            </div>
          </div>
          {/* spacer */}
          <div className="flex-grow "></div>
          {/* buttons if fundraising*/}
          {props.project.status === 'Fundraising' && (
            <div className="flex flex-col gap-4 w-full">
              <button
                className="w-full"
                onClick={() => setSelectedMenu('rewards')}
              >
                <MainButtonLabelBig label="Contribute" />
              </button>
              <button className="w-full">
                <SecondaryButtonLabelBig label="Share direct contribution link on X" />
              </button>
            </div>
          )}
          {/* button if realizing status */}
          {props.project.status === 'Realising' && (
            <Link href={`/marketplace/${props.project.id}`} className="w-full">
              <MainButtonLabelBig label="Look for rewards to buy" />
            </Link>
          )}
        </div>
      </div>
      {/* menu */}
      <div className="w-full h-10 bg-second flex justify-between items-center px-4 mt-20 mb-10">
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
        {props.project.status === 'Realising' && (
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
      {props.project.ownerId === user1.ownerAddress && (
        <div className="w-full h-10 bg-accent flex justify-center items-center px-4  -mt-14 mb-10">
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
        <AboutBlock description={props.project.projectDescription} />
      )}
      {selectedMenu === 'rewards' && (
        <RewardBlock
          rewards={props.project.rewards}
          projectStatus={props.project.status}
          projectId={props.project.id}
        />
      )}
      {selectedMenu === 'funder' && (
        <FounderBlock
          founder={user1}
          safetyDeposit={props.project.safetyDeposit}
        />
      )}
      {selectedMenu === 'update' && <UpdateBlock feeds={props.project.feed} />}
      {selectedMenu === 'vote' && (
        <FundsRequestBlock fundsRequests={props.project.fundsRequests} />
      )}
    </div>
  );
};

export default Project;
