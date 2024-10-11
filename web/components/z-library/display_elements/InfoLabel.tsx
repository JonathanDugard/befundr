import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
  label: string;
  faeyeicon?: boolean;
  faeyeslashicon?: boolean;
};

const InfoLabel = (props: Props) => {
  return (
    <div
      className="
      rounded-md h-8 min-w-44 px-3 py-1 border border-gray-300
      textStyle-body-accent text-center shadow-sm hover:bg-gray-200
      flex items-center justify-center space-x-2 font-weight:600
    "
    >
      {props.faeyeicon && <FaEye />}
      {props.faeyeslashicon && <FaEyeSlash />}
      <span>{props.label}</span>
    </div>
  );
};

export default InfoLabel;
