import React from 'react';

type Props = {
  raisedAmount: number;
  unlockAmount: number;
  askForUnlockAmount: number;
};

const FundsOverviewBar = (props: Props) => {
  return (
    <div className="w-full bg-accent rounded-full h-3 relative">
      <div
        className="bg-second h-3 rounded-full absolute top-0 left-0"
        style={{
          width: `${Math.min(
            ((props.unlockAmount + props.askForUnlockAmount) * 100) /
              props.raisedAmount,
            100
          )}%`,
        }}
      ></div>
      <div
        className="bg-accent-hover h-3 rounded-full absolute top-0 left-0"
        style={{
          width: `${Math.min(
            (props.unlockAmount * 100) / props.raisedAmount,
            100
          )}%`,
        }}
      ></div>
    </div>
  );
};

export default FundsOverviewBar;
