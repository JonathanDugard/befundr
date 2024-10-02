import { Enum } from "@solana/web3.js";

export class ContributionStatus extends Enum {
    static Active = new ContributionStatus({ active: "active" });
    static Cancelled = new ContributionStatus({ cancelled: "cancelled" });
}