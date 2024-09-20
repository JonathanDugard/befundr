'use client'
import React, { useState } from 'react'

type Props = {}

const ToggleButton = (props: Props) => {
    const [isSelected,setIsSelected] = useState(false)

    return (
        <button 
            className={`border border-gray-300 rounded-md ${isSelected && "bg-accent"} w-5 h-5 transition-all ease-in-out`}
            onClick={(()=>setIsSelected(!isSelected))}>
            
        </button>
    )
}

export default ToggleButton