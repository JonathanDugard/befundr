import { BN } from '@coral-xyz/anchor';
import { convertSplAmountToNumber } from './utilFunctions';

// function to get all the saleTransaction based on a reward id
export const getSaleTransactionByRewardId = (
  sales: SaleTransaction[],
  rewardId: string
): SaleTransaction[] => {
  const fileteredSales = sales.filter((sale) => sale.rewardId === rewardId);
  return fileteredSales;
};

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
