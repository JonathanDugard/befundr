import { calculateTimeElapsed } from '@/utils/functions/genericTools';
import React from 'react';
import VoteProgressBar from '../display_elements/VoteProgressBar';
import MainButtonLabel from '../button/MainButtonLabel';
import CancelButtonLabel from '../button/CancelButtonLabel';
import InfoLabel from '../display_elements/InfoLabel';

type Props = {
  fundsRequest: FundsRequest;
};

const FundsRequestCard = (props: Props) => {
  return (
    <div className="flex justify-between items-start gap-10">
      {/* info */}
      <div className="flex flex-col items-start justify-start">
        <div className="flex justify-start items-center gap-10">
          <p className="textStyle-headline">{props.fundsRequest.title}</p>
          <InfoLabel label={props.fundsRequest.status} />
        </div>
        <p className="textStyle-subheadline">
          Amount requested: {props.fundsRequest.amountAsked}
        </p>
        <p className="textStyle-subheadline">
          {calculateTimeElapsed(props.fundsRequest.timestamp)} days ago
        </p>
        <p className="textStyle-body !font-normal !text-textColor-main">
          Expected deliveries:
        </p>
        <p className="textStyle-body">{props.fundsRequest.description}</p>
      </div>
      {/* buttons and stat */}
      <div className="flex flex-col items-start justify-center w-full gap-10">
        <p className="-mb-10 textStyle-body">
          votes repartition (
          {(
            (props.fundsRequest.voteFor * 100) /
            (props.fundsRequest.voteAgainst + props.fundsRequest.voteFor)
          ).toFixed(0)}
          % for)
        </p>
        <VoteProgressBar
          voteAgainst={props.fundsRequest.voteAgainst}
          voteFor={props.fundsRequest.voteFor}
        />
        {props.fundsRequest.status === 'ongoing' && (
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

export default FundsRequestCard;
