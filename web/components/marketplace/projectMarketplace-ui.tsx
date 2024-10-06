'use client';

import { useState } from 'react';
import Divider from '../z-library/display_elements/Divider';
import MainButtonLabelDynamic from '../z-library/button/MainButtonLabelDynamic';
import InfoLabel from '../z-library/display_elements/InfoLabel';
import BuyRewardPopup from './BuyRewardPopup';
import {
  calculateTimeElapsed,
  convertSplAmountToNumber,
} from '@/utils/functions/utilFunctions';
import { BN } from '@coral-xyz/anchor';
import ImageWithFallback from '../z-library/display_elements/ImageWithFallback';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBefundrProgramUser } from '../befundrProgram/befundr-user-access';
import { PublicKey } from '@solana/web3.js';

export const RewardMarketplaceBlock = ({
  reward,
  projectImageUrl,
  rewardSales,
  projectId,
  refetchProjectSalesPda,
  refetchSalesAccount,
}: {
  reward: Reward;
  projectImageUrl: string;
  rewardSales: AccountWrapper<SaleTransaction>[];
  projectId: PublicKey;
  refetchProjectSalesPda: () => void;
  refetchSalesAccount: () => void;
}) => {
  //* GLOBAL STATE
  const { publicKey } = useWallet();
  const { getUserPdaPublicKey } = useBefundrProgramUser();

  //* LOCAL DATA
  const { data: userPdaKey } = getUserPdaPublicKey(publicKey);
  // const [ownedContributions, setOwnedContributions] = useState<
  //   Contribution[] | null
  // >(null);

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [selectedSaleTx, setSelectedSaleTx] = useState<SaleTransaction | null>(
    null
  );

  // Check if at least on contribution could be sold
  // const hasNonSaleContributions = ownedContributions?.some(
  //   (contribution) => !contribution.isForSale
  // );

  return (
    <div className="flex justify-between w-full  gap-6">
      {/* image */}
      <div className="w-[200px] h-[200px]">
        <ImageWithFallback
          alt="image"
          classname="object-cover aspect-square"
          fallbackImageSrc="/images/default_project_image.jpg"
          height={200}
          width={200}
          src={projectImageUrl}
        />
      </div>
      {/* infos */}
      <div className="flex flex-col items-start justify-start w-1/3">
        <p className="textStyle-headline">{reward.name}</p>
        <p className="textStyle-subheadline">
          Initial price - {convertSplAmountToNumber(new BN(reward.price))}$
        </p>
        <p className="textStyle-subheadline">
          Supply - {reward.currentSupply} rewards
        </p>
        <p className="textStyle-body mt-4">{reward.description}</p>
      </div>
      {/* Sell offers */}
      <div className="flex flex-col items-start justify-start w-1/3 h-full">
        {/* legend */}
        <p className="textStyle-headline">
          Sell offers available ({rewardSales?.length})
        </p>
        <div className="grid grid-cols-2 justify-items-stretch w-full">
          <p className="textStyle-body !font-normal !text-textColor-main">
            Sale date
          </p>
          <p className="textStyle-body !font-normal !text-textColor-main">
            Price
          </p>
        </div>
        {/* offers */}
        <div className="flex flex-col items-start justify-start w-full gap-1 overflow-auto">
          {rewardSales &&
            rewardSales.map((saleTx, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-start gap-1 w-full "
              >
                <div className="grid grid-cols-2 justify-items-stretch items-center w-full my-1">
                  <div className="flex justify-start gap-1">
                    <p className="textStyle-body">
                      {calculateTimeElapsed(
                        saleTx.account.creationTimestamp
                      ) === 0
                        ? 'Today'
                        : `${calculateTimeElapsed(
                            saleTx.account.creationTimestamp
                          )} days ago`}
                    </p>
                    {saleTx.account.seller === userPdaKey?.toString() && (
                      <div className="textStyle-body !text-custom-red">
                        (your)
                      </div>
                    )}
                  </div>
                  <button
                    className="relative self-end w-full"
                    onClick={() => {
                      setSelectedSaleTx(saleTx.account);
                      setIsShowPopup(true);
                    }}
                  >
                    <MainButtonLabelDynamic
                      label={`Buy for ${convertSplAmountToNumber(
                        new BN(saleTx.account.sellingPrice)
                      )}$`}
                    />
                  </button>
                </div>
                <Divider />
              </div>
            ))}
        </div>
        {/* if no sale offer */}
        {rewardSales?.length === 0 && (
          <div className="flex justify-center items-center w-full h-full flex-grow mt-10 ">
            <InfoLabel label="No sale offer available" />
          </div>
        )}
        {/* spacer */}
        <div className="flex-grow"></div>
        {/* sell button */}
        {/* {hasNonSaleContributions && (
          <div className="mt-4 w-full">
            <button className="w-full">
              <SecondaryButtonLabelDynamic label="Sell your reward" />
            </button>
          </div>
        )} */}
      </div>
      {isShowPopup && selectedSaleTx && (
        <BuyRewardPopup
          reward={reward}
          saleTx={selectedSaleTx}
          handleClose={() => setIsShowPopup(false)}
          projectId={projectId}
          refetchProjectSalesPda={refetchProjectSalesPda}
          refetchSalesAccount={refetchSalesAccount}
        />
      )}
    </div>
  );
};
