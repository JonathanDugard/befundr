import React from 'react'

type Props = {
    label:string
}

const MainButtonLabelBig = (props: Props) => {
  return (
    <div className='relative bg-accent hover:bg-accent-hover rounded-lg w-full h-14 px-8 py-4 transition-all ease-in-out group'>
        <div className='absolute bg-main h-3 w-3 rounded-full bottom-1 group-hover:-translate-y-9 right-1 transition-all ease-in-out'/>
        <div className='text-main'>{props.label}</div>
    </div>
  )
}

export default MainButtonLabelBig