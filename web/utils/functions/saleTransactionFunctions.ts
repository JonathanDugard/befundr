import { BN } from '@coral-xyz/anchor';
import { convertSplAmountToNumber } from '@/utils/functions/genericTools';

export const getMinSellingPrice = (
  salesTx: AccountWrapper<SaleTransaction>[] | null
): number | null => {
  if (!salesTx || salesTx.length === 0) return null;
  const price = Math.min(...salesTx.map((tx) => tx.account.sellingPrice));
  return convertSplAmountToNumber(new BN(price));
};

// Helper function to transform an account into a saleTransaction object
export const transformAccountToSaleTransaction = (
  account: SaleTransaction
): SaleTransaction => {
  return {
    contribution: account.contribution.toString(),
    contributionAmount: new BN(account.contributionAmount).toNumber(),
    creationTimestamp: new BN(account.creationTimestamp).toNumber(),
    seller: account.seller.toString(),
    sellingPrice: new BN(account.sellingPrice).toNumber(),
    rewardId: new BN(account.rewardId).toNumber(),
  };
};
