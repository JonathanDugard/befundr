'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BackButton from '../z-library/button/BackButton';
import { getRewardByRewardId } from '@/utils/functions/rewardsFunctions';
import { contributions, projects, rewards, sales } from '@/data/localdata';
import { getProjectByRewardId } from '@/utils/functions/projectsFunctions';
import { getContributionById } from '@/utils/functions/contributionsFunctions';
import InfoLabel from '../z-library/display elements/InfoLabel';
import Image from 'next/image';
import {
  getMinSellingPrice,
  getSaleTransactionByRewardId,
} from '@/utils/functions/saleTransactionFunctions';
import SecondaryButtonLabelBig from '../z-library/button/SecondaryButtonLabelBig';
import { calculateTimeRemaining } from '@/utils/functions/utilFunctions';
import MainButtonLabelBig from '../z-library/button/MainButtonLabelBig';
import SaleRewardPopup from '../z-library/popup/SaleRewardPopup';
import RedeemRewardPopup from '../z-library/popup/RedeemRewardPopup';
import CancelRewardSalePopup from '../z-library/popup/CancelRewardSalePopup';

type Props = {
  contributionId: string;
};

const ContributionDetail = (props: Props) => {
  //* GLOBAL STATE
  const router = useRouter();

  //* LOCAL STATE
  const [contributionToDisplay, setContributionToDisplay] = useState<
    Contribution | null | undefined
  >(null);
  const [projectToDisplay, setProjectToDisplay] = useState<
    Project | null | undefined
  >(null);
  const [rewardToDisplay, setRewardToDisplay] = useState<
    Reward | null | undefined
  >(null);
  const [salesTx, setSalesTx] = useState<SaleTransaction[] | null>(null);

  // popup mngt
  const [isSalePopup, setIsSalePopup] = useState(false);
  const [isRedeemPopup, setIsRedeemPopup] = useState(false);
  const [isCancelSalePopup, setIsCancelSalePopup] = useState(false);

  // 1-fetch the contribution
  useEffect(() => {
    const fetchContribution = () => {
      setContributionToDisplay(
        getContributionById(contributions, props.contributionId)
      );
    };

    fetchContribution();
  }, [props.contributionId]);

  // 2-fetch the reward associated to the contribution
  useEffect(() => {
    const fetchReward = () => {
      if (contributionToDisplay)
        setRewardToDisplay(
          getRewardByRewardId(rewards, contributionToDisplay.rewardId)
        );
    };

    if (contributionToDisplay) fetchReward();
  }, [contributionToDisplay]);

  // 3-fetch the project associated to the reward
  useEffect(() => {
    const fetchProject = () => {
      if (rewardToDisplay)
        setProjectToDisplay(getProjectByRewardId(projects, rewardToDisplay));
    };

    if (rewardToDisplay) fetchProject();
  }, [rewardToDisplay]);

  // 4-fetch the sales tx associated to the reward
  useEffect(() => {
    const fetchSalesTx = () => {
      if (rewardToDisplay)
        setSalesTx(getSaleTransactionByRewardId(sales, rewardToDisplay.id));
    };

    if (rewardToDisplay) fetchSalesTx();
  }, [rewardToDisplay]);

  if (projectToDisplay && rewardToDisplay && contributionToDisplay)
    return (
      <div className="flex flex-col items-start justify-start gap-4 w-full">
        {/* header */}
        <button onClick={() => router.back()}>
          <BackButton />
        </button>
        {/* card */}
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          {/* title */}
          <div className="flex justify-start items-center gap-10">
            <p className="textStyle-title">
              {rewardToDisplay.name} -
              <strong className="!text-accent"> {projectToDisplay.name}</strong>
            </p>
            {rewardToDisplay.isAvailable && (
              <InfoLabel label="Reward available" />
            )}
          </div>
          {/* detail */}
          <div className="flex justify-start items-start w-full gap-4">
            {/* image */}
            <div className="relative w-1/3 h-40 flex items-center justify-center">
              <Image
                alt="reward pic"
                src={rewardToDisplay.imageUrl}
                fill
                className="object-contain"
              />
            </div>
            {/* reward detail */}
            <div className="flex flex-col justify-start items-start w-1/3">
              <p className="textStyle-headline">{rewardToDisplay.name}</p>
              <p className="textStyle-subheadline">
                Initial price : {rewardToDisplay.price}$
              </p>
              <p className="textStyle-body mb-4">
                {rewardToDisplay.currentSupply} rewards
              </p>
              <p className="textStyle-body">{rewardToDisplay.description}</p>
            </div>
            {/* market info */}
            <div className="flex flex-col justify-between items-start w-1/3 h-full ">
              <p className="textStyle-headline">Market info</p>
              {!contributionToDisplay.isForSale ? (
                <>
                  {salesTx && salesTx.length > 0 ? (
                    <p className="textStyle-body">
                      {salesTx.length} equivalent rewards to sell on the
                      marketplace with a minimum price of{' '}
                      {getMinSellingPrice(salesTx)}$
                    </p>
                  ) : (
                    <p className="textStyle-body">
                      No equivalent rewards to sell on the marketplace
                    </p>
                  )}
                  <button
                    className="w-full mt-4"
                    onClick={() => setIsSalePopup(true)}
                  >
                    <SecondaryButtonLabelBig label="Sale" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                  <p className="textStyle-body">This reward is on sale.</p>
                  <button
                    className="w-full"
                    onClick={() => setIsCancelSalePopup(true)}
                  >
                    <MainButtonLabelBig label="Cancel sale" />
                  </button>
                  <button className="w-full">
                    <SecondaryButtonLabelBig label="Share the selling link on X" />
                  </button>
                </div>
              )}

              <div className="flex-grow my-4"></div>
              {/* if reward avaiable */}
              {rewardToDisplay.isAvailable ? (
                rewardToDisplay.redeemLimitTime && (
                  <div className="flex flex-col items-start justify-ends w-full mt-auto">
                    <p className="textStyle-headline">Reward available</p>
                    <p className="textStyle-body !text-custom-red">
                      Remaining days to redeem :{' '}
                      {calculateTimeRemaining(rewardToDisplay.redeemLimitTime)}
                    </p>

                    <button
                      className="w-full"
                      onClick={() => setIsRedeemPopup(true)}
                    >
                      <MainButtonLabelBig
                        label={`${
                          contributionToDisplay.isForSale
                            ? 'Cancel sale to redeem'
                            : 'Redeem reward'
                        }`}
                        disabled={contributionToDisplay.isForSale}
                      />
                    </button>
                  </div>
                )
              ) : (
                <p className="textStyle-body !text-custom-red">
                  This reward is not yet redeemable
                </p>
              )}
            </div>
          </div>
        </div>
        {isSalePopup && (
          <SaleRewardPopup
            reward={rewardToDisplay}
            floorPrice={getMinSellingPrice(salesTx)}
            handleClose={() => setIsSalePopup(false)}
          />
        )}
        {isRedeemPopup && (
          <RedeemRewardPopup
            reward={rewardToDisplay}
            handleClose={() => setIsRedeemPopup(false)}
          />
        )}
        {isCancelSalePopup && (
          <CancelRewardSalePopup
            reward={rewardToDisplay}
            handleClose={() => setIsCancelSalePopup(false)}
          />
        )}
      </div>
    );
};

export default ContributionDetail;
