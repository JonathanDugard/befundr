import React from 'react';

type Props = {
  placeholder: string;
  label: string;
  type: string;
  value: string | number;
  inputName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  min?: number;
  max?: number;
};

const InputField = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="textStyle-subheadline !text-textColor-main !font-normal">
        {props.label}
      </p>
      <input
        className={`bg-main rounded-md w-full border border-gray-300 p-2  ${
          props.isDisabled && '!text-second'
        } textStyle-body`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.inputName}
        onChange={props.handleChange}
        value={props.type === 'number' && props.value === 0 ? '' : props.value}
        disabled={props.isDisabled}
        minLength={props.min}
        maxLength={props.max}
        min={props.min}
        max={props.max}
      />
    </div>
  );
};

export default InputField;
