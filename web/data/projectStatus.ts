import { Enum } from '@solana/web3.js';

export class ProjectStatus extends Enum {
  static Draft = new ProjectStatus({ draft: 'Draft' });
  static Fundraising = new ProjectStatus({ fundraising: 'Fundraising' });
  static Realising = new ProjectStatus({ realising: 'Realising' });
  static Completed = new ProjectStatus({ completed: 'Completed' });
  static Abandoned = new ProjectStatus({ abandoned: 'Abandoned' });
  static Suspended = new ProjectStatus({ suspended: 'Suspended' });
}
