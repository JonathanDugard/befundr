'use client'
import { project1 } from '@/data/localdata';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import BackButton from '../z_library/button/BackButton';
import Divider from '../z_library/display elements/Divider';
import InfoLabel from '../z_library/display elements/InfoLabel';
import ProgressBar from '../z_library/display elements/ProgressBar';
import { calculateDaysBetween } from '@/utils/functions/utilFunctions';
import TrustScore from '../z_library/display elements/TrustScore';
import MainButtonLabelBig from '../z_library/button/MainButtonLabelBig';
import SecondaryButtonLabelBig from '../z_library/button/SecondaryButtonLabelBig';

type Props = {
    projectId:string
}



const Project = (props: Props) => {
    //* GENERAL STATE
    const router = useRouter()

    //* LOCAL STATE
    const [selectedMenu,setSelectedMenu] = useState<null | "about" | "rewards" | "funder" | "update" | "vote">(null)

    return (
        <div className='flex flex-col items-start justify-start gap-4 w-full'>
            {/* header */}
            <button onClick={()=>router.back()}><BackButton/></button>
            <div className='flex items-center gap-10'>
                <h1 className='textStyle-title'>{project1.name}</h1>
                <InfoLabel label='info label'/>
            </div>
            <main className='textStyle-headline2 -mt-4'>{project1.headline}</main>
            <Divider/>
            {/* main info */}
            <div className='w-full flex justify-start items-start gap-8 mb-10'>
                {/* image */}
                <div className='bg-neutral-400 w-1/2 md:w-1/3 aspect-square'></div>
                {/* info */}
                <div className='flex flex-col items-start justify-start gap-4 w-1/2 md:w-1/3 h-full'>
                    <p className='textStyle-headline2'>Contributions amount</p>
                    <ProgressBar currentAmount={project1.raisedAmount} goalAmount={project1.goalAmount}/>
                    {/* metrics + trust */}
                    <div className='flex justify-between items-center  w-full gap-4 '>
                        <div className='flex flex-col items-start justify-center w-1/2 flex-grow'>
                            <p className='textStyle-headline2'><strong className='textStyle-title2'>{project1.raisedAmount} $</strong> on {project1.goalAmount}$ goal</p>
                            <p className='textStyle-headline2'><strong className='textStyle-title2'>{project1.contributionCounter}</strong> contributors</p>
                            <p className='textStyle-headline2'><strong className='textStyle-title2'>{calculateDaysBetween(new Date(),project1.endTime)}</strong> days remaining</p>
                        </div>
                        <div className='w-1/3 aspect-square relative'>
                            <TrustScore trustValue={project1.trustScore}/>
                            <p className='absolute top-1 flex justify-center w-full textStyle-headline2'>Trust level {project1.trustScore}%</p>
                        </div>
                    </div>
                    {/* spacer */}
                    <div className='flex-grow '></div>
                    {/* buttons */}
                    <button className='w-full'><MainButtonLabelBig label='Contribute'/></button>
                    <button className='w-full'><SecondaryButtonLabelBig label='Share direct contribution link on X'/></button>
                </div>
            </div>
            {/* menu */}
            <div className='w-full h-10 bg-second flex justify-between items-center px-4'>
                <button className='textStyle-body' onClick={()=>setSelectedMenu("about")}>About the project</button>
                <button className='textStyle-body' onClick={()=>setSelectedMenu("rewards")}>Rewards</button>
                <button className='textStyle-body' onClick={()=>setSelectedMenu("funder")}>Funder trustworthiness</button>
                <button className='textStyle-body' onClick={()=>setSelectedMenu("update")}>Update</button>
                {project1.status === "Realising" &&<button className='textStyle-body' onClick={()=>setSelectedMenu("vote")}>Vote</button>}
            </div>
        </div>
    )
}

export default Project