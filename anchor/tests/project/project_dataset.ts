import { Project } from "./project_type";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ProjectStatus } from "./project_status";
import { reward1, reward2, reward3 } from "./reward_dataset";

const ONE_DAY_MILLISECONDS = 86400000;
const now = Date.now();
/*
  Some projects datasets

*/
export const projectData1: Project = {
  name: 'Don association',
  description: 'Donec et nisl id sapien blandit mattis. Aenean dictum odio sit amet risus. Morbi purus. Nulla a est sit amet purus venenatis iaculis. Vivamus viverra purus vel magna. Donec in justo sed odio malesuada dapibus. Nunc ultrices aliquam nunc. Vivamus facilisis pellentesque velit. Nulla nunc ',
  imageUrl: '/images/don.png',
  goalAmount: new BN(1000 * LAMPORTS_PER_SOL),
  createdTime: new BN(now - ONE_DAY_MILLISECONDS),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  safetyDeposit: new BN(0)
}

export const projectData2: Project = {
  name: 'Envoyer une fusée dans l\'espace',
  description: 'Donec et nisl id sapien blandit mattis. Aenean dictum odio sit amet ',
  imageUrl: '/images/fusee.jpg',
  goalAmount: new BN(100 * LAMPORTS_PER_SOL),
  createdTime: new BN(new Date('2024-05-01T00:00:00Z').getTime()),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  safetyDeposit: new BN(0)
}

export const projectData3: Project = {
  name: 'Construction d\'une guitare',
  description: 'Donec et nisl.',
  imageUrl: '/images/guitare.jpg',
  goalAmount: new BN(100 * LAMPORTS_PER_SOL),
  status: ProjectStatus.Abandoned,
  createdTime: new BN(new Date('2024-01-01T00:00:00Z').getTime()),
  endTime: new BN(now + ONE_DAY_MILLISECONDS),
  rewards: [reward1, reward2, reward3],
  safetyDeposit: new BN(5000)
}