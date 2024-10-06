import React from 'react';

type Props = {
  label: string;
};

const DisabledButtonLabel = (props: Props) => {
  return (
    <div 
      className="relative bg-gray-300 rounded-md h-8 w-44 px-2 py-1"
      title="DID not available"
    >
      <div className="text-main text-center">{props.label}</div>
    </div>
  );
};

export default DisabledButtonLabel;
