'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import BackButton from '../z-library/button/BackButton';
import Divider from '../z-library/display_elements/Divider';
import { RewardMarketplaceBlock } from './projectMarketplace-ui';
import { useBefundrProgramSaleTransaction } from '../befundrProgram/befundr-saleTransaction-access';
import { PublicKey } from '@solana/web3.js';

type Props = {
  project: Project;
  projectId: string;
};

const ProjectMarketplace = (props: Props) => {
  //* GENERAL STATE
  const router = useRouter();
  const {
    getProjectSalesPdaFromProjectPdaKey,
    salesAccountsFromPublicKeysArray,
  } = useBefundrProgramSaleTransaction();

  //* LOCAL STATE
  const { data: projectSalesPda, refetch: refetchProjectSalesPda } =
    getProjectSalesPdaFromProjectPdaKey(new PublicKey(props.projectId));

  //get all the sale transaction of the project
  const { data: salesAccount, refetch: refetchSalesAccount } =
    salesAccountsFromPublicKeysArray(projectSalesPda?.saleTransactions);

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      {/* header */}
      <button onClick={() => router.back()}>
        <BackButton />
      </button>
      <h1 className="textStyle-title">
        Rewards marketplace -{' '}
        <strong className="!text-accent">{props.project.name}</strong>
      </h1>
      <h2 className="textStyle-headline -mt-6">
        Find all the available rewards for this project
      </h2>
      {/* rewards */}
      {props.project.rewards.map((reward: Reward, index) => {
        // Filter the sales account for the current reward
        const rewardSales = salesAccount
          ? salesAccount.filter((sale) => sale.account.rewardId === index)
          : [];
        return (
          <div key={index} className="flex flex-col gap-6 w-full h-full">
            <RewardMarketplaceBlock
              reward={reward}
              projectImageUrl={props.project.imageUrl}
              rewardSales={rewardSales}
              projectId={new PublicKey(props.projectId)}
              refetchProjectSalesPda={refetchProjectSalesPda}
              refetchSalesAccount={refetchSalesAccount}
            />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectMarketplace;
