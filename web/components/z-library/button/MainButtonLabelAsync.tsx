import React from 'react';

type Props = {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
};

const MainButtonLabelAsync = (props: Props) => {
  return (
    <div
      className={`relative bg-accent hover:bg-accent-hover rounded-md h-8 min-w-44 px-2 py-1 transition-all ease-in-out group ${
        props.isLoading && 'bg-accent-hover'
      }`}
    >
      <div
        className={`absolute bg-main h-2 w-2 rounded-full bottom-1 group-hover:-translate-y-4 right-1 transition-all ease-in-out ${
          props.isLoading && 'animate-bounce-button'
        }`}
      />
      <div className="text-main text-center">
        {props.isLoading ? props.loadingLabel : props.label}
      </div>
    </div>
  );
};

export default MainButtonLabelAsync;
