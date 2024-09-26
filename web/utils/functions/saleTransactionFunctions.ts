// function to get all the saleTransaction based on a reward id
export const getSaleTransactionByRewardId = (
  sales: SaleTransaction[],
  rewardId: string
): SaleTransaction[] => {
  const fileteredSales = sales.filter((sale) => sale.rewardId === rewardId);
  return fileteredSales;
};

export const getMinSellingPrice = (
  salesTx: SaleTransaction[] | null
): number | null => {
  if (!salesTx || salesTx.length === 0) return null;
  return Math.min(...salesTx.map((tx) => tx.sellingPrice));
};
