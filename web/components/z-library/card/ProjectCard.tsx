import Link from 'next/link';
import React from 'react';
import InfoLabel from '../display elements/InfoLabel';

type Props = {
  project: Project;
};

const ProjectCard = (props: Props) => {
  return (
    <Link href={`/projects/${props.project.id}`} className="relative">
      <div className="w-80 h-60 bg-neutral-400"></div>
      <div className="absolute bottom-2 left-2">
        <InfoLabel label={props.project.status} />
      </div>
    </Link>
  );
};

export default ProjectCard;
