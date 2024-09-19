import React from 'react'
import InfoLabel from '../display elements/InfoLabel'
import { calculateDaysBetween } from '@/utils/functions/utilFunctions'
import { update1 } from '@/data/localdata'

type Props = {
    update:Update
}

const UpdateCard = (props: Props) => {
  return (
    <div className='flex flex-col items-start justify-start'>
        {/* title */}
        <div className='flex justify-start items-center gap-10'>
            <p className='textStyle-headline'>{props.update.title}</p>
            <InfoLabel label={props.update.type}/>
        </div>
        {/* date */}
        <p className='textStyle-subheadline'>{calculateDaysBetween(props.update.createdAt,new Date())} days ago</p>
        {/* description */}
        <p className='textStyle-body pt-2'>{props.update.description}</p>

    </div>
  )
}

export default UpdateCard