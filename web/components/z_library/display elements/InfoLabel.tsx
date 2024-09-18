import React from 'react'

type Props = {
    label:string
}

const InfoLabel = (props: Props) => {
  return (
    <div className='
      bg-main rounded-md h-8 w-44 px-2 py-1 border border-accent
        textStyle-body-accent text-center
    '>
        {props.label}
    </div>
  )
}

export default InfoLabel