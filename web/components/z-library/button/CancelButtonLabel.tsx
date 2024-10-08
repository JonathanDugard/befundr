import React from 'react';

type Props = {
  label: string;
};

const CancelButtonLabel = (props: Props) => {
  return (
    <div className="relative bg-custom-red hover:bg-red-500 rounded-md h-8 w-44 px-2 py-1 transition-all ease-in-out group">
      <div className="absolute bg-main h-2 w-2 rounded-full bottom-1 group-hover:-translate-y-4 right-1 transition-all ease-in-out" />
      <div className="text-main text-center">{props.label}</div>
    </div>
  );
};

export default CancelButtonLabel;
