import Image from 'next/image'
import React from 'react'

type Props = {
    trustValue:number
}

const TrustScore = (props: Props) => {
    const heightPercentage = `${props.trustValue}%`;

    return (
        
    <div className="relative w-full aspect-square">
        {/* Rectangle de fond dont la hauteur varie */}
        <div
        className="absolute bottom-0 w-full bg-accent"
        style={{ height: heightPercentage }}
        ></div>

        {/* L'image qui sert de masque */}
        <div className="absolute inset-0 mask-image">
            <Image src="/logo_mask.png" alt="logo svg" layout="fill" />
        </div>
    </div>
 
    
  )
}

export default TrustScore