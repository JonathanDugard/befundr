import { Enum } from '@solana/web3.js';

export class ProjectStatus extends Enum {
  static Draft = new ProjectStatus({ draft: 'Draft' });
  static Fundraising = new ProjectStatus({ fundraising: 'Fundraising' });
  static Realising = new ProjectStatus({ realising: 'Realising' });
  static Completed = new ProjectStatus({ completed: 'Completed' });
  static Abandoned = new ProjectStatus({ abandoned: 'Abandoned' });
  static Suspended = new ProjectStatus({ suspended: 'Suspended' });

  static fromAccountStatus(status: any): ProjectStatus {
    const key = Object.keys(status).find(k => status[k]);
    if (key && ProjectStatus[key as keyof typeof ProjectStatus] instanceof ProjectStatus) {
      return ProjectStatus[key as keyof typeof ProjectStatus] as ProjectStatus;
    }

    throw new Error(
      `Unknown status received from account: ${JSON.stringify(status)}`
    );
  }
}
