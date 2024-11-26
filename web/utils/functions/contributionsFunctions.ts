import { ContributionStatus } from '@/data/contributionStatus';
import { BN } from '@coral-xyz/anchor';

//* SERIALIZATION
// Helper function to transform an contribution account into a Contribution object
export const transformAccountToContribution = (
  account: Contribution
): Contribution => {
  // Transform category and status
  const status = getStatusFromAccount(account.status);

  return {
    initialOwner: account.initialOwner,
    currentOwner: account.currentOwner,
    amount: new BN(account.amount).toNumber(),
    creationTimestamp: new BN(account.creationTimestamp).toNumber(),
    isClaimed: account.isClaimed,
    project: account.project,
    rewardId: account.rewardId ? new BN(account.rewardId).toNumber() : null,
    status: status,
  };
};

// Function to get the status from account data
const getStatusFromAccount = (status: any): ContributionStatus => {
  if (status.active) return ContributionStatus.Active;
  if (status.cancelled) return ContributionStatus.Cancelled;

  throw new Error(
    `Unknown status received from account: ${JSON.stringify(status)}`
  );
};
