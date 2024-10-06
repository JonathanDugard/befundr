'use client';
import Link from 'next/link';

import ImageWithFallback from '../display_elements/ImageWithFallback';
import InfoLabel from '../display_elements/InfoLabel';
import { useBefundrProgramSaleTransaction } from '@/components/befundrProgram/befundr-saleTransaction-access';
import { PublicKey } from '@solana/web3.js';
import { useMemo } from 'react';

type Props = {
  project: Project;
  projectId: string;
};

const ProjectCardMarketplace = (props: Props) => {
  const { getProjectSalesPdaFromProjectPdaKey } =
    useBefundrProgramSaleTransaction();

  const { data: projectSalesPda } = getProjectSalesPdaFromProjectPdaKey(
    new PublicKey(props.projectId)
  );

  const numberOfSales = useMemo(
    () => projectSalesPda?.saleTransactions.length,
    [projectSalesPda]
  );

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
          <p className="textStyle-subheadline !font-normal !text-textColor-main truncate">
            {props.project.name}
          </p>
          {/* <Divider /> */}
          <div className="mt-auto">
            <InfoLabel
              label={`${numberOfSales} reward${
                numberOfSales && numberOfSales > 1 ? 's' : ''
              } on sale`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardMarketplace;
