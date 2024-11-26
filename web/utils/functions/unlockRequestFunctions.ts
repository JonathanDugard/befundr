import { UnlockRequestStatus } from '@/data/unlockRequestStatus';
import { BN } from '@coral-xyz/anchor';

// Helper function to transform an account into a Project object
export const transformAccountToUnlockRequest = (
  account: UnlockRequest
): UnlockRequest => {
  // Transform category and status
  const status = getUnlockRequestStatusFromAccount(account.status);

  return {
    title: account.title ? account.title.toString() : '',
    project: account.project, // Add this line
    amountRequested: new BN(account.amountRequested).toNumber(),
    votesAgainst: new BN(account.votesAgainst).toNumber(), // Add this line
    createdTime: new BN(account.createdTime).toNumber(),
    endTime: new BN(account.endTime).toNumber(),
    unlockTime: new BN(account.unlockTime).toNumber(), // Add this line
    status: status.enum,
    isClaimed: account.isClaimed,
    votes: account.votes, // Add this line
  };
};

const getUnlockRequestStatusFromAccount = (
  status: any
): UnlockRequestStatus => {
  if (status.approved) return UnlockRequestStatus.Approved;
  if (status.rejected) return UnlockRequestStatus.Rejected;

  throw new Error(
    `Unknown status received from account: ${JSON.stringify(status)}`
  );
};
