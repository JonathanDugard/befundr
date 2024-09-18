import { Project } from "./project_type";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ProjectStatus } from "./project_status";
import { reward1, reward2, reward3 } from "./reward_dataset";
/*
  Some projects datasets

*/
export const projectData1: Project = {
  name: 'Don association',
  project_description: 'Donec et nisl id sapien blandit mattis. Aenean dictum odio sit amet risus. Morbi purus. Nulla a est sit amet purus venenatis iaculis. Vivamus viverra purus vel magna. Donec in justo sed odio malesuada dapibus. Nunc ultrices aliquam nunc. Vivamus facilisis pellentesque velit. Nulla nunc ',
  image_url: '/images/don.png',
  goal_amount: new BN(1000 * LAMPORTS_PER_SOL),
  created_time: new Date().getTime(),
  end_time: new Date('2024-07-31T00:00:00Z').getTime(),
  rewards: [reward1, reward2, reward3],
}

export const projectData2: Project = {
  name: 'Envoyer une fusée dans l\'espace',
  project_description: 'Donec et nisl id sapien blandit mattis. Aenean dictum odio sit amet ',
  image_url: '/images/fusee.jpg',
  goal_amount: new BN(100 * LAMPORTS_PER_SOL),
  created_time: new Date('2024-05-01T00:00:00Z').getTime(),
  end_time: new Date('2024-08-31T00:00:00Z').getTime(),
  rewards: [reward1, reward2, reward3],
}

export const projectData3: Project = {
  name: 'Construction d\'une guitare',
  project_description: 'Donec et nisl.',
  image_url: '/images/guitare.jpg',
  goal_amount: new BN(100 * LAMPORTS_PER_SOL),
  raised_amount: new BN(50 * LAMPORTS_PER_SOL),
  status: ProjectStatus.Abandoned,
  created_time: new Date('2024-01-01T00:00:00Z').getTime(),
  end_time: new Date('2024-06-31T00:00:00Z').getTime(),
  rewards: [reward1, reward2, reward3],
}