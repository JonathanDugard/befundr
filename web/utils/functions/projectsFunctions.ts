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
  return projects.filter((project) => project.ownerId === ownerId);
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
