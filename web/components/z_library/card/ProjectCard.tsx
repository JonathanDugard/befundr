import Link from 'next/link'
import React from 'react'

type Props = {
    projectId:any
}

const ProjectCard = (props: Props) => {
  return (
    <Link href={`/projects/${props.projectId}`}>
        <div className="w-80 h-60 bg-neutral-400"></div>
    </Link>
  )
}

export default ProjectCard