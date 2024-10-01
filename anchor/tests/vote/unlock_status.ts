import { Enum } from "@solana/web3.js";

export class UnlockStatus extends Enum {
    static Approved = new UnlockStatus({ approved: "approved" });
    static Rejected = new UnlockStatus({ rejected: "rejected" });
}
