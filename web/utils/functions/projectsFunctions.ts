export const getProjectByRewardId = (
  projects: Project[],
  reward: Reward
): Project | undefined => {
  return projects.find((project) => project.rewards.includes(reward));
};

export const getProjectsByOwnerId = (
  projects: Project[],
  ownerId: string
): Project[] | undefined => {
  return projects.filter((project) => project.user === ownerId);
};

export const getUnlockedFundsForAProject = (project: Project): number => {
  return project.fundsRequests
    .filter((fundRequest) => fundRequest.status === 'accepted')
    .reduce((total, fundRequest) => total + fundRequest.amountAsked, 0);
};

export const getAskedFundsForAProject = (project: Project): number => {
  return project.fundsRequests
    .filter((fundRequest) => fundRequest.status === 'ongoing')
    .reduce((total, fundRequest) => total + fundRequest.amountAsked, 0);
};

export const isProjectHasVoteOngoing = (project: Project): boolean => {
  return project.fundsRequests.some(
    (fundRequest) => fundRequest.status === 'ongoing'
  );
};

export const getProgressPercentage = (start: number, end: number) => {
  return Math.floor((start / end) * 100);
};

//* SERIALIZATION
import { ProjectCategory } from '@/data/category';
import { ProjectStatus } from '@/data/projectStatus';
import { BN, ProgramAccount } from '@coral-xyz/anchor';

export const transformProgramAccountToProject = (
  programAccount: ProgramAccount<any>
): AccountWrapper<Project> => {
  const account = programAccount.account;

  // Transform account data into a Project object
  const project = transformAccountToProject(account);

  return {
    publicKey: programAccount.publicKey,
    account: project,
  };
};

// Helper function to transform an account into a Project object
export const transformAccountToProject = (account: any): Project => {
  // Transform category and status
  const category = getCategoryFromAccount(account.category);
  const status = getStatusFromAccount(account.status);

  return {
    owner: account.owner.toString(),
    user: account.user.toString(),
    name: account.name,
    category: category.enum,
    imageUrl: account.imageUrl,
    description: account.description,
    goalAmount: new BN(account.goalAmount).toNumber(),
    raisedAmount: new BN(account.raisedAmount).toNumber(),
    timestamp: new BN(account.createdTime).toNumber(),
    endTime: new BN(account.endTime).toNumber(),
    status: status.enum,
    contributionCounter: account.contributionCounter,
    trustScore: account.trustScore,
    rewards: account.rewards.map((reward: any) => ({
      id: reward.id,
      name: reward.name,
      imageUrl: reward.imageUrl,
      description: reward.description,
      price: new BN(reward.price).toNumber(),
      maxSupply: reward.maxSupply ? new BN(reward.maxSupply).toNumber() : null,
      currentSupply: new BN(reward.currentSupply).toNumber(),
      isAvailable: reward.isAvailable,
      redeemLimitTime: reward.redeemLimitTime
        ? new BN(reward.redeemLimitTime).toNumber()
        : undefined,
    })),
    safetyDeposit: new BN(account.safetyDeposit).toNumber(),
    xAccountUrl: account.xAccountUrl,
  };
};

// Function to get the category from account data
const getCategoryFromAccount = (category: any): ProjectCategory => {
  if (category.technology) return ProjectCategory.Technology;
  if (category.art) return ProjectCategory.Art;
  if (category.education) return ProjectCategory.Education;
  if (category.health) return ProjectCategory.Health;
  if (category.environment) return ProjectCategory.Environment;
  if (category.socialImpact) return ProjectCategory.SocialImpact;
  if (category.entertainment) return ProjectCategory.Entertainment;
  if (category.science) return ProjectCategory.Science;
  if (category.finance) return ProjectCategory.Finance;
  if (category.sports) return ProjectCategory.Sports;

  throw new Error(
    `Unknown category received from account: ${JSON.stringify(category)}`
  );
};

// Function to get the status from account data
const getStatusFromAccount = (status: any): ProjectStatus => {
  if (status.draft) return ProjectStatus.Draft;
  if (status.fundraising) return ProjectStatus.Fundraising;
  if (status.realising) return ProjectStatus.Realising;
  if (status.completed) return ProjectStatus.Completed;
  if (status.abandoned) return ProjectStatus.Abandoned;
  if (status.suspended) return ProjectStatus.Suspended;

  throw new Error(
    `Unknown status received from account: ${JSON.stringify(status)}`
  );
};
