'use client'
import React, { useState } from 'react'

type Props = {}

const ToggleSwitch = (props: Props) => {
    const [isSelected,setIsSelected] = useState(false)

    return (
        <button onClick={(()=>setIsSelected(!isSelected))}>
            <div className='relative bg-second rounded-full w-10 h-6 p-1'>
                <div className={`absolute bg-accent w-4 h-4 rounded-full top-1 ${isSelected && "translate-x-4"} transition-all ease-in-out`}/>
            </div>
        </button>
    )
}

export default ToggleSwitch