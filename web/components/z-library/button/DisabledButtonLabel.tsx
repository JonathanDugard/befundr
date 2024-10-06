import React from 'react';

type Props = {
  label: string;
  displaySoonBadge?: boolean;
};

const DisabledButtonLabel = (props: Props) => {
  return (
    <div 
      className="relative bg-gray-400 rounded-md h-8 w-60 px-2 py-1"
    >
      <div className="text-main text-center">
        {props.label}
        { props.displaySoonBadge && (
        <span className="absolute -top-2.5 -right-3 bg-main border border-accent text-accent font-normal text-xs font-medium px-1.5 py-0.3 rounded shadow-lg">
          Coming Soon
        </span>
        )}
        </div>
    </div>
  );
};

export default DisabledButtonLabel;
