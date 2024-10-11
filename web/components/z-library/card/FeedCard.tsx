import React from 'react';
import InfoLabel from '../display_elements/InfoLabel';
import { calculateTimeElapsed } from '@/utils/functions/utilFunctions';

type Props = {
  feed: Feed;
};

const FeedCard = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start">
      {/* title */}
      <div className="flex justify-start items-center gap-10">
        <p className="textStyle-headline">{props.feed.title}</p>
        <InfoLabel label={props.feed.type} />
      </div>
      {/* date */}
      <p className="textStyle-subheadline">
        {calculateTimeElapsed(props.feed.timestamp)} days ago
      </p>
      {/* description */}
      <p className="textStyle-body pt-2">{props.feed.description}</p>
    </div>
  );
};

export default FeedCard;
