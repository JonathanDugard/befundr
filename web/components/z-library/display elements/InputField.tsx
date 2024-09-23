import React from 'react'
import { CiSearch } from "react-icons/ci";


type Props = {
    placeholder:string
}

const InputField = (props: Props) => {
  return (
    <div className='flex justify-start items-center gap-2 p-1 h-8 border border-textColor-second textStyle-body-black rounded-md bg-main w-full'>
      <CiSearch size={20}/>
      <input 
          className='bg-main rounded-md w-full'
          type='text' 
          placeholder={props.placeholder}
      />
    </div>
    
  )
}

export default InputField