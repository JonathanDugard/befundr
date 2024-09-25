export const getRewardByRewardId = (
  rewards: Reward[],
  rewardId: string
): Reward | undefined => {
  return rewards.find((reward) => reward.id === rewardId);
};
