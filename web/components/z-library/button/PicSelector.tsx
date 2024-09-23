import React from 'react';
import { IoMdCloudUpload } from 'react-icons/io';

type Props = {
  label: string;
  placeholder: string;
  setSelectedPic: () => void;
};

const PicSelector = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </p>
      <div className="flex flex-col justify-center items-center border border-gray-300 rounded-md w-full p-4">
        <IoMdCloudUpload size={50} className="text-accent" />
        <p className="textStyle-body">{props.placeholder}</p>
      </div>
    </div>
  );
};

export default PicSelector;
