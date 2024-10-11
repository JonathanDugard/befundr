import React from 'react';

type Props = {
  voteFor: number;
  voteAgainst: number;
};

const VoteProgressBar = (props: Props) => {
  return (
    <div className="w-full bg-custom-red z-0 rounded-full h-3">
      <div
        className="bg-custom-green h-3 rounded-full"
        style={{
          width: `${Math.min(
            (props.voteFor * 100) / (props.voteFor + props.voteAgainst),
            100
          )}%`,
        }}
      ></div>
    </div>
  );
};

export default VoteProgressBar;
