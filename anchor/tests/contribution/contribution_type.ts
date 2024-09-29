import { BN } from '@coral-xyz/anchor';
import { ContributionStatus } from "./contribution_status"

export type Contribution = {
  // Should contain Signer Pubkey
  initial_owner?: string, // User PDA pubkey
  current_owner?: string, // User PDA pubkey
  project?: string,
  amount: BN,
  reward_id?: BN,
  creation_timestamp?: BN,
  isForSale?: boolean,
  sellingPrice?: BN,
  status?: ContributionStatus,
}