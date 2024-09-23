import React from 'react';

type Props = {
  placeholder: string;
  label: string;
  type: string;
};

const InputField = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </p>
      <input
        className="bg-main rounded-md w-full border border-gray-300 p-2 textStyle-body"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputField;
