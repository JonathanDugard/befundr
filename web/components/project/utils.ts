import { Project, ProjectStatus } from "@/types";

export const requiresCheckBeforeAddContribution = (
  project: Project,
  amount: number
): boolean | string => {
  // check if project is in fundraising phase
  if (project.status !== ProjectStatus.Fundraising.enum) {
    return 'The fundraising is not ongoing on this project';
  }

  // check if in fundraising period
  if (project.endTime > Date.now()) {
    return 'The fundraising period is over';
  }

  // Amount must be positive and greater than 0
  if (amount <= 0) {
    return 'Amount must be positive';
  }

  // Else return true
  return true;
};
