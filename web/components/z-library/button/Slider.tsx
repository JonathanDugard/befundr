import React from 'react';

type Props = {
  initValue: number;
  min: number;
  max: number;
  step: number;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  name: string;
  value: number;
};

const Slider = (props: Props) => {
  return (
    <div className="w-full flex justify-start gap-2">
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step}
        onChange={props.handleChange}
        className="bg-accent w-full accent-accent"
        name={props.name}
      />
      <div className="textStyle-body">{props.value}</div>
    </div>
  );
};

export default Slider;
