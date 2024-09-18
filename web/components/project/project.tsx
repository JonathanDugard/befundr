'use client'
import { exampleProject } from '@/data/localdata';
import { useRouter } from 'next/navigation';
import React from 'react'
import BackButton from '../z_library/button/BackButton';
import Divider from '../z_library/display elements/Divider';
import InfoLabel from '../z_library/display elements/InfoLabel';

type Props = {
    projectId:string
}



const Project = (props: Props) => {
    //* GENERAL STATE
    const router = useRouter()
    console.log("projectId :",props.projectId);

    return (
        <div className='flex flex-col items-start justify-start gap-4 w-full'>
            {/* header */}
            <button onClick={()=>router.back()}><BackButton/></button>
            <div className='flex items-center gap-10'>
                <h1 className='textStyle-title'>{exampleProject.title}</h1>
                <InfoLabel label='info label'/>
            </div>
            <main className='textStyle-headline2 -mt-4'>{exampleProject.shortDescription}</main>
            <Divider/>
            {/* main info */}
            <div className='w-full'>
                <div className='bg-neutral-400 w-1/2 aspect-square'></div>
            </div>
        </div>
    )
}

export default Project