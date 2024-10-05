import Link from 'next/link';
import ImageWithFallback from '../display elements/ImageWithFallback';
import InfoLabel from '../display elements/InfoLabel';

type Props = {
  project: Project;
  projectId: string;
};

const ProjectCardMarketplace = (props: Props) => {
  return (
    <Link href={`/marketplace/${props.projectId}`} className="relative">
      <div className="flex flex-col w-[200px] h-[300px] bg-second">
        {/* project image */}
        <ImageWithFallback
          alt="image"
          classname="object-cover aspect-square"
          fallbackImageSrc="/images/default_project_image.jpg"
          height={200}
          width={200}
          src={props.project.imageUrl}
        />
        <div className="flex flex-col justify-stretch items-start p-2 h-full gap-2">
          <p className="textStyle-headline">{props.project.name}</p>
          {/* <Divider /> */}
          <div className="mt-auto">
            <InfoLabel label="X rewards on sale" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardMarketplace;
