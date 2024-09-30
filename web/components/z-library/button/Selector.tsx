'use client';
import React from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  inputName: string;
  value: string;
};

const Selector = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </label>
      <select
        className="border border-gray-300 rounded-md p-2 textStyle-body"
        value={props.value}
        onChange={props.handleChange}
        name={props.inputName}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
