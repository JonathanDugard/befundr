import React from 'react'
import { HiArrowLongLeft } from "react-icons/hi2";


type Props = {}

const BackButton = (props: Props) => {
  return (
    <div className='flex items-center gap-2 textStyle-body'><HiArrowLongLeft size={25}/>back</div>
  )
}

export default BackButton