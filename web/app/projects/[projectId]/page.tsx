import Project from '@/components/project/project'
import React from 'react'

type Props = {
    params:{
        projectId:string
    }
}

const page = (props: Props) => {
  return <Project projectId={props.params.projectId}/>
}

export default page