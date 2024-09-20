import { BN } from '@coral-xyz/anchor';
import { ProjectStatus } from "./project_status"
import { Reward } from "./reward_type"

// Some attributes are optional because they are set by the program at creation
export type Project = {
  owner?: string
  user?: string
  name: string
  imageUrl: string
  description: string
  goalAmount: BN
  raisedAmount?: BN
  createdTime: BN
  endTime: BN
  status?: ProjectStatus
  contributionCounter?: BN
  rewards: Reward[],
  safetyDeposit: BN
}