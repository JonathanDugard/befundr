'use client';

import { contributions, sales, user1 } from '@/data/localdata';
import { getSaleTransactionByRewardId } from '@/utils/functions/saleTransactionFunctions';
import { useEffect, useState } from 'react';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Divider from '../z-library/display elements/Divider';
import { getContributionByRewardIdAndUserAddress } from '@/utils/functions/contributionsFunctions';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import SecondaryButtonLabelBig from '../z-library/button/SecondaryButtonLabelBig';
import MainButtonLabelDynamic from '../z-library/button/MainButtonLabelDynamic';
import SecondaryButtonLabelDynamic from '../z-library/button/SecondaryButtonLabelDynamic';
import InfoLabel from '../z-library/display elements/InfoLabel';
import BuyRewardPopup from '../z-library/popup/BuyRewardPopup';
import { calculateTimeElapsed } from '@/utils/functions/utilFunctions';

export const RewardMarketplaceBlock = ({ reward }: { reward: Reward }) => {
  //* LOCAL DATA
  const [saleTxToDisplay, setSaleTxToDisplay] = useState<
    SaleTransaction[] | null
  >(null);

  const [ownedContributions, setOwnedContributions] = useState<
    Contribution[] | null
  >(null);

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [selectedSaleTx, setSelectedSaleTx] = useState<SaleTransaction | null>(
    null
  );

  // fetch the saleTransaction and owned Rewards
  useEffect(() => {
    setSaleTxToDisplay(getSaleTransactionByRewardId(sales, reward.id));
    setOwnedContributions(
      getContributionByRewardIdAndUserAddress(
        contributions,
        reward.id,
        user1.ownerAddress
      )
    );
  }, [reward.id]);

  // Check if at least on contribution could be sold
  const hasNonSaleContributions = ownedContributions?.some(
    (contribution) => !contribution.isForSale
  );

  return (
    <div className="flex justify-between w-full h-80 gap-6">
      {/* image */}
      <div className="w-1/3 aspect-square bg-neutral-400"></div>
      {/* infos */}
      <div className="flex flex-col items-start justify-start w-1/3">
        <p className="textStyle-headline">{reward.name}</p>
        <p className="textStyle-subheadline">Initial price - {reward.price}$</p>
        <p className="textStyle-subheadline">
          Supply - {reward.currentSupply} rewards
        </p>
        <p className="textStyle-body mt-4">{reward.description}</p>
      </div>
      {/* Sell offers */}
      <div className="flex flex-col items-start justify-start w-1/3 h-full">
        {/* legend */}
        <p className="textStyle-headline">
          Sell offers available ({saleTxToDisplay?.length})
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
          {saleTxToDisplay &&
            saleTxToDisplay.map((saleTx, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-start gap-1 w-full "
              >
                <div className="grid grid-cols-2 justify-items-stretch items-center w-full my-1">
                  <div className="flex justify-start gap-1">
                    <p className="textStyle-body">
                      {calculateTimeElapsed(saleTx.creationTimestamp)} days ago
                    </p>
                    {saleTx.seller === user1.ownerAddress && (
                      <div className="textStyle-body !text-custom-red">
                        (your)
                      </div>
                    )}
                  </div>
                  <button
                    className="relative self-end w-full"
                    onClick={() => {
                      setSelectedSaleTx(saleTx);
                      setIsShowPopup(true);
                    }}
                  >
                    <MainButtonLabelDynamic
                      label={`Buy for ${saleTx.sellingPrice}$`}
                    />
                  </button>
                </div>
                <Divider />
              </div>
            ))}
        </div>
        {/* if no sale offer */}
        {saleTxToDisplay?.length === 0 && (
          <div className="flex justify-center items-center w-full h-full flex-grow ">
            <InfoLabel label="No sale offer available" />
          </div>
        )}
        {/* spacer */}
        <div className="flex-grow"></div>
        {/* sell button */}
        {hasNonSaleContributions && (
          <div className="mt-4 w-full">
            <button className="w-full">
              <SecondaryButtonLabelDynamic label="Sell your reward" />
            </button>
          </div>
        )}
      </div>
      {isShowPopup && selectedSaleTx && (
        <BuyRewardPopup
          reward={reward}
          saleTx={selectedSaleTx}
          handleClose={() => setIsShowPopup(false)}
        />
      )}
    </div>
  );
};