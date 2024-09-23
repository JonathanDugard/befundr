'use client';
import React, { useState } from 'react';

type Props = {
  options: string[];
  label: string;
  onChange: (value: string) => void;
};

const Selector = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>(props.options[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    props.onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </label>
      <select
        className="border border-gray-300 rounded-md p-2 textStyle-body"
        value={selectedValue}
        onChange={handleChange}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
