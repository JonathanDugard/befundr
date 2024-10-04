import { Project } from "./project_type";
import { BN } from "@coral-xyz/anchor";
import { ProjectStatus } from "./project_status";
import { reward1, reward2, reward3 } from "./reward_dataset";
import { ProjectCategory } from "./category_type";
import { convertAmountToDecimals } from "../token/token_config";

export const ONE_DAY_MILLISECONDS = 86_400_000;
const now = Date.now();
/*
  Some projects datasets

*/
export const projectData1: Project = {
  name: 'Don association',
  metadataUri: 'https://myURL.com/projects/project1',
  goalAmount: convertAmountToDecimals(1000),
  createdTime: new BN(now),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  safetyDeposit: convertAmountToDecimals(50),
  category: ProjectCategory.SocialImpact
}

export const projectData2: Project = {
  name: 'Envoyer une fusée dans l\'espace',
  metadataUri: 'https://myURL.com/projects/project2',
  goalAmount: convertAmountToDecimals(100),
  createdTime: new BN(new Date('2024-05-01T00:00:00Z').getTime()),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  safetyDeposit: convertAmountToDecimals(100),
  category: ProjectCategory.Technology
}

export const projectData3: Project = {
  name: 'Construction d\'une guitare',
  metadataUri: 'https://myURL.com/projects/project3',
  goalAmount: convertAmountToDecimals(100),
  status: ProjectStatus.Abandoned,
  createdTime: new BN(new Date('2024-01-01T00:00:00Z').getTime()),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  safetyDeposit: convertAmountToDecimals(150),
  category: ProjectCategory.Art

}