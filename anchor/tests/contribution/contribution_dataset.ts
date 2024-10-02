import { Contribution } from "./contribution_type";
import { BN } from "@coral-xyz/anchor";
import { ContributionStatus } from "./contribution_status";


export const ONE_DAY_MILLISECONDS = 86_400_000;
const now = Date.now();
/*
  Some contributions datasets

*/
export const contributionData1: Contribution = {
  amount: new BN(10),
  status: ContributionStatus.Active
}