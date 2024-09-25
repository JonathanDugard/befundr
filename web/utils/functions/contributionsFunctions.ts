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

export const getContributionByUserAddress = (
  contributions: Contribution[],
  userAddress: string
): Contribution[] => {
  return contributions.filter(
    (contribution) => contribution.currentOwner === userAddress
  );
};

export const getContributionById = (
  contributions: Contribution[],
  contributionId: string
): Contribution | undefined => {
  return contributions.find(
    (contribution) => contribution.id === contributionId
  );
};
