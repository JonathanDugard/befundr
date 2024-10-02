import { Project } from "./project_type";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
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
  description: 'Donec et nisl id sapien blandit mattis. Aenean dictum odio sit amet risus. Morbi purus. Nulla a est sit amet purus venenatis iaculis. Vivamus viverra purus vel magna. Donec in justo sed odio malesuada dapibus. Nunc ultrices aliquam nunc. Vivamus facilisis pellentesque velit. Nulla nunc ',
  imageUrl: '/images/don.png',
  goalAmount: new BN(convertAmountToDecimals(1000)),
  createdTime: new BN(now),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  xAccountUrl: "https://myURL.com/myXAccount",
  safetyDeposit: new BN(convertAmountToDecimals(0)),
  category: ProjectCategory.SocialImpact
}

export const projectData2: Project = {
  name: 'Envoyer une fusée dans l\'espace',
  description: 'Donec et nisl id sapien blandit mattis. Aenean dictum odio sit amet ',
  imageUrl: '/images/fusee.jpg',
  goalAmount: new BN(convertAmountToDecimals(100)),
  createdTime: new BN(new Date('2024-05-01T00:00:00Z').getTime()),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  xAccountUrl: "https://myURL.com/myXAccount",
  safetyDeposit: new BN(convertAmountToDecimals(0)),
  category: ProjectCategory.Technology
}

export const projectData3: Project = {
  name: 'Construction d\'une guitare',
  description: 'Donec et nisl.',
  imageUrl: '/images/guitare.jpg',
  goalAmount: new BN(convertAmountToDecimals(100)),
  status: ProjectStatus.Abandoned,
  createdTime: new BN(new Date('2024-01-01T00:00:00Z').getTime()),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  xAccountUrl: "https://myURL.com/myXAccount",
  safetyDeposit: new BN(convertAmountToDecimals(100)),
  category: ProjectCategory.Art

}