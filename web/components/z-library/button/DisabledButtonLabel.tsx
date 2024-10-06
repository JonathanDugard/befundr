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
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-main border border-accent text-accent font-normal text-sm font-medium px-2.5 py-0.5 rounded shadow-lg">
          Coming Soon
        </span>
        )}
        </div>
    </div>
  );
};

export default DisabledButtonLabel;
