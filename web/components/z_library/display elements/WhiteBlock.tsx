import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode
}

const WhiteBlock = (props: Props) => {
  return (
    <div className='bg-main drop-shadow-lg w-full flex justify-between p-4'>{props.children}</div>
  )
}

export default WhiteBlock