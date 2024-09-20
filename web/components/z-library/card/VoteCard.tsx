import { calculateTimeElapsed } from '@/utils/functions/utilFunctions';
import React from 'react';
import VoteProgressBar from '../display elements/VoteProgressBar';
import MainButtonLabel from '../button/MainButtonLabel';
import CancelButtonLabel from '../button/CancelButtonLabel';
import InfoLabel from '../display elements/InfoLabel';

type Props = {
  vote: Vote;
};

const VoteCard = (props: Props) => {
  return (
    <div className="flex justify-between items-start gap-10">
      {/* info */}
      <div className="flex flex-col items-start justify-start">
        <div className="flex justify-start items-center gap-10">
          <p className="textStyle-headline">{props.vote.title}</p>
          <InfoLabel label={props.vote.status} />
        </div>
        <p className="textStyle-subheadline">
          Amount ask : {props.vote.amountAsked}
        </p>
        <p className="textStyle-subheadline">
          {calculateTimeElapsed(props.vote.timestamp)} days ago
        </p>
        <p className="textStyle-body !font-normal !text-textColor-main">
          Expected deliveries :
        </p>
        <p className="textStyle-body">{props.vote.description}</p>
      </div>
      {/* buttons and stat */}
      <div className="flex flex-col items-start justify-center w-full gap-10">
        <p className="-mb-10 textStyle-body">
          votes repartition (
          {(
            (props.vote.voteFor * 100) /
            (props.vote.voteAgainst + props.vote.voteFor)
          ).toFixed(0)}
          % for)
        </p>
        <VoteProgressBar
          voteAgainst={props.vote.voteAgainst}
          voteFor={props.vote.voteFor}
        />
        {props.vote.status === 'ongoing' && (
          <div className="flex flex-col items-end justify-center gap-4 w-full">
            <button>
              <MainButtonLabel label="Accept" />
            </button>
            <button>
              <CancelButtonLabel label="Reject" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteCard;
