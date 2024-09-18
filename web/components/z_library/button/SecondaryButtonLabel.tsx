import React from 'react'

type Props = {
    label:string
}

const SecondaryButtonLabel = (props: Props) => {
  return (
    <div className='relative bg-main rounded-md h-8 w-44 py-1 group'>
        <div className='absolute bg-main h-2 w-2 rounded-full bottom-1 group-hover:-translate-y-4 right-1 transition-all    ease-in-out'/>

        <div className='text-main'>{props.label}</div>
    </div>
  )
}

export default SecondaryButtonLabel