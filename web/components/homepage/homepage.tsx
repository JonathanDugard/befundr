import React from 'react'
import { HighlightSelection, KeyFigures } from './homepage-ui'

// type Props = {}

const Homepage = (/*props: Props*/) => {
  return (
    <div className='flex flex-col items-center justify-start gap-10 '>
        <h1 className='textStyle-title'>Your <strong className='text-accent'>secured</strong> crowdfunding platform</h1>
        <h3 className='textStyle-headline w-2/3 text-center'>With beFundr, contribute to early project is the most secure way. Don&apos;t want to wait for the project delivery ? Buy directly an available reward</h3>
        <KeyFigures/>   
        <HighlightSelection title='Almost funded'/>
        <HighlightSelection title='Top contribution'/>
        <HighlightSelection title='Most trusted'/>
        <HighlightSelection title='Ending soon'/>

    </div>

  )
}

export default Homepage