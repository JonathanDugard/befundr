import { projects } from '@/data/localdata';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Divider from '../z-library/display elements/Divider';
import WhiteBlock from '../z-library/display elements/WhiteBlock';
import Link from 'next/link';
import ProjectCard from '../z-library/card/ProjectCard';

export const KeyFigures = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full my-10">
      <div className="grid grid-cols-3 justify-items-stretch items-center w-full">
        <div className="flex items-end gap-1">
          <p className="text-accent text-5xl font-light">20</p>
          <p className="textStyle-subheadline w-32">projects funded</p>
        </div>
        <div className="flex items-end gap-1 justify-self-center">
          <p className="text-accent text-5xl font-light">1250</p>
          <p className="textStyle-subheadline w-32">contributors</p>
        </div>
        <div className="flex justify-end items-end gap-1">
          <p className="text-accent text-5xl font-light">210</p>
          <p className="textStyle-subheadline text-right">rewards available</p>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export const HighlightSelection = ({ title }: { title: string }) => {
  const projectsSelection = projects.slice(0, 3);

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <h2 className="textStyle-subtitle">{title}</h2>
      <div className="flex justify-between gap-4 w-full overflow-x-auto">
        {projectsSelection.map((project: Project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <div className="flex justify-end w-full mb-10">
        <Link href={'/projects'}>
          <MainButtonLabel label="See more projects" />
        </Link>
      </div>
      <Divider />
    </div>
  );
};

export const UserDashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <h2 className="textStyle-subtitle">My dashboard</h2>
      <WhiteBlock>
        <div className="flex justify-start items-baseline gap-4">
          <p className="textStyle-subheadline">
            <strong className="text-4xl text-accent">8 </strong>funded projects
          </p>
          <button>
            <MainButtonLabel label="My projects" />
          </button>
        </div>
        <div className="flex justify-start items-baseline gap-4">
          <p className="textStyle-subheadline">
            <strong className="text-4xl text-accent">10 </strong>owned
            contributions
          </p>
          <button>
            <MainButtonLabel label="My contributions" />
          </button>
        </div>
      </WhiteBlock>
    </div>
  );
};