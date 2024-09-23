import React from 'react';

type Props = {
  placeholder: string;
  label: string;
  rows: number;
};

const TextArea = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </p>
      <textarea
        className="bg-main rounded-md w-full border border-gray-300 p-2 textStyle-body"
        rows={props.rows}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextArea;
