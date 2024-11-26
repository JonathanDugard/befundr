import { Enum } from '@solana/web3.js';

export class UnlockRequestStatus extends Enum {
  static Approved = new UnlockRequestStatus({ approved: 'Approved' });
  static Rejected = new UnlockRequestStatus({ rejected: 'Rejected' });
}
