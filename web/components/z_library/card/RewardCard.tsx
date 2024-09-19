import React from 'react'
import SecondaryButtonLabel from '../button/SecondaryButtonLabel'
import MainButtonLabel from '../button/MainButtonLabel'

type Props = {
    reward:Reward
}

const RewardCard = (props: Props) => {
  return (
    <div className='flex justify-start items-start gap-6 w-full h-full '>
        {/* image */}
        <div className='bg-neutral-400 w-1/4 aspect-square'></div>
        {/* info */}
        <div className='flex flex-col items-start justify-between gap-2 w-full '>
            <p className='textStyle-headline'>{props.reward.name}</p>
            <p className='textStyle-subheadline'>{props.reward.price}$</p>
            {props.reward.maxSupply ? 
                <p className='textStyle-body'>Limited supply : {props.reward.maxSupply}</p> 
                : 
                <p className='textStyle-body'>Illimited supply</p>
            }
            <p className='textStyle-body'>{props.reward.description}</p>
            <div className='grow'></div>
            <div className='flex justify-between items-center w-full mt-auto'>
                <p className='textStyle-subheadline'>{props.reward.currentSupply} contributors</p>
                <div className='flex justify-end gap-4'>
                    <button><SecondaryButtonLabel label='Go to marketplace'/></button>
                    <button><MainButtonLabel label='Contribute'/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RewardCard