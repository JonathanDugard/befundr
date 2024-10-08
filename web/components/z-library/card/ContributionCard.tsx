'use client';
import { useBefundrProgramProject } from '@/components/befundrProgram/befundr-project-access';
import { transformAccountToContribution } from '@/utils/functions/contributionsFunctions';
import { transformAccountToProject } from '@/utils/functions/projectsFunctions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ImageWithFallback from '../display_elements/ImageWithFallback';
import Divider from '../display_elements/Divider';
import { useBefundrProgramSaleTransaction } from '@/components/befundrProgram/befundr-saleTransaction-access';
import { PublicKey } from '@solana/web3.js';

type Props = {
  contribution: Contribution;
  contributionPdaPublicKey: string;
};

const ContributionCard = (props: Props) => {
  //* GLOBAL STATE
  const { projectAccountFromAccountPublicKey } = useBefundrProgramProject();
  const { getSaleTxFromContributionPdaPublicKey } =
    useBefundrProgramSaleTransaction();

  const [contributionToDisplay, setContributionToDisplay] =
    useState<Contribution | null>(null);
  const [projectToDisplay, setProjectToDisplay] = useState<Project | null>(
    null
  );
  const { data: project } = projectAccountFromAccountPublicKey(
    props.contribution.project
  );

  const { data: saleTx } = getSaleTxFromContributionPdaPublicKey(
    new PublicKey(props.contributionPdaPublicKey)
  );

  // convert contribution account to Contribution object
  useEffect(() => {
    if (props.contribution)
      setContributionToDisplay(
        transformAccountToContribution(props.contribution)
      );
  }, [props.contribution]);

  // convert the associated project account to Project object
  useEffect(() => {
    if (project) setProjectToDisplay(transformAccountToProject(project));
  }, [project]);

  if (projectToDisplay && contributionToDisplay)
    return (
      <Link
        href={`/profile/mycontributions/${props.contributionPdaPublicKey}`}
        className="relative"
      >
        <div className="flex flex-col w-[200px] h-[300px] bg-second">
          {/* project image */}
          <ImageWithFallback
            alt="image"
            classname="object-cover aspect-square"
            fallbackImageSrc="/images/default_project_image.jpg"
            height={200}
            width={200}
            src={projectToDisplay.imageUrl}
          />
          <div className="flex flex-col justify-stretch items-start p-2 h-full">
            <p className="textStyle-headline">{projectToDisplay.name}</p>
            <Divider />
            <p className="textStyle-subheadline mt-auto">
              {projectToDisplay.rewards[contributionToDisplay.rewardId].name}
            </p>
          </div>
        </div>
        {saleTx && (
          <div
            className=" absolute top-2 left-2
          bg-none rounded-md h-8  px-2 py-1 border border-accent
          textStyle-body-accent text-center bg-main"
          >
            On sale
          </div>
        )}
      </Link>
    );
};

export default ContributionCard;
