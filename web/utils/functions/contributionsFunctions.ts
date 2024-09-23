// function to get all the contributions based on a user address
export const getContributionByRewardIdAndUserAddress = (
  contributions: Contribution[],
  rewardId: string,
  userAddress: string
): Contribution[] => {
  return contributions.filter(
    (contribution) =>
      contribution.currentOwner === userAddress &&
      contribution.rewardId === rewardId
  );
};
