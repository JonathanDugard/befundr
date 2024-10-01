import React from 'react';

type Props = {
  isSelected: boolean;
};

const ToggleButton = (props: Props) => {
  return (
    <div
      className={`border border-gray-300 rounded-md ${
        props.isSelected && 'bg-accent'
      } w-5 h-5 transition-all ease-in-out`}
    ></div>
  );
};

export default ToggleButton;
