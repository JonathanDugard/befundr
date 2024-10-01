export const getProjectById = (
  projects: Project[],
  projectId: string
): Project | undefined => {
  return projects.find((project) => project.id === projectId);
};

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

  // Transformation de la catégorie et du statut
  const category = getCategoryFromAccount(account.category);
  const status = getStatusFromAccount(account.status);

  const project: Project = {
    user: account.owner.toString(),
    name: account.name,
    category: category.enum,
    imageUrl: account.imageUrl,
    projectDescription: account.description,
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
    feed: account.feed || [],
    fundsRequests: account.fundsRequests || [],
    xAccountUrl: account.xAccountUrl,
  };

  return {
    publicKey: programAccount.publicKey,
    account: project,
  };
};

// Fonction pour obtenir la catégorie à partir des données du compte
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

// Fonction pour obtenir le statut à partir des données du compte
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
