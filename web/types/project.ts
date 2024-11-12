import { PublicKey } from '@solana/web3.js';
import { ProjectStatus } from './projectStatus';
import { ProjectCategory } from './projectCategory';
import { Metadata } from './metadata';

export class Project {
  owner: PublicKey | null;
  user: PublicKey | null;
  goalAmount: number;
  raisedAmount: number;
  timestamp: number;
  endTime: number;
  status: ProjectStatus;
  contributionCounter: number;
  safetyDeposit: number;
  metadata: Metadata<ProjectMetadata> | null;

  constructor(
    owner: PublicKey,
    user: PublicKey,
    goalAmount: number,
    raisedAmount: number,
    timestamp: number,
    endTime: number,
    status: ProjectStatus,
    contributionCounter: number,
    safetyDeposit: number,
    metadata: Metadata<ProjectMetadata>
  ) {
    this.owner = owner;
    this.user = user;
    this.goalAmount = goalAmount;
    this.raisedAmount = raisedAmount;
    this.timestamp = timestamp;
    this.endTime = endTime;
    this.status = status;
    this.contributionCounter = contributionCounter;
    this.safetyDeposit = safetyDeposit;
    this.metadata = metadata;
  }
}

export type ProjectMetadata = {
  name: string;
  category: ProjectCategory;
  imageUrl: string;
  description: string;
  xAccountUrl: string;
};

export const ProjectMetadataDefault = {
  name: '',
  category: ProjectCategory.Undefined,
  imageUrl: '',
  description: '',
  xAccountUrl: '',
}

export const ProjectDefault = {
  owner: null,
  user: null,
  goalAmount: 0,
  raisedAmount: 0,
  timestamp: 0,
  endTime: 0,
  status: ProjectStatus.Draft,
  contributionCounter: 0,
  safetyDeposit: 0,
  metadata: null,
}