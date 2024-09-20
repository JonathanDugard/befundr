'use client'
import React, { useState } from 'react'

type Props = {
    initValue:number
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

const Slider = (props: Props) => {
    const [value, setValue] = useState(props.initValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      setValue(newValue);
      props.onChange(newValue);
    };

    return (
        <div className="w-full flex justify-start gap-2">
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={value}
                step={props.step}
                onChange={handleChange}
                className="bg-accent w-full accent-accent"
            />
            <div className='textStyle-body'>{value}</div>
        </div>
    )
}

export default Slider