import React from 'react';

type Props = {
  label: string;
  disabled?: boolean;
};

const MainButtonLabel = (props: Props) => {
  return (
    <div
      className={`relative ${
        props.disabled
          ? 'bg-main border border-second '
          : 'bg-accent hover:bg-accent-hover'
      } rounded-lg min-w-44 h-8 px-8 py-1 transition-all ease-in-out group`}
    >
      <div className="absolute bg-main h-2 w-2 rounded-full bottom-1 group-hover:-translate-y-4 right-1 transition-all ease-in-out " />
      <div
        className={`text-main text-center ${
          props.disabled ? 'text-second' : 'text-main'
        } text-center`}
      >
        {props.label}
      </div>
    </div>
  );
};

export default MainButtonLabel;
