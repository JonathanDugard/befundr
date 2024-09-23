// function to get all the saleTransaction based on a reward id
export const getSaleTransactionByRewardId = (
  sales: SaleTransaction[],
  rewardId: string
): SaleTransaction[] => {
  const fileteredSales = sales.filter((sale) => sale.rewardId === rewardId);
  return fileteredSales;
};
