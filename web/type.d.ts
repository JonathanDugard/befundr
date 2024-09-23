type ProjectStatus =
  | 'Draft'
  | 'Fundraising'
  | 'Realising'
  | 'Completed'
  | 'Abandoned'
  | 'Suspended';

type Project = {
  id: string;
  ownerId: string;
  name: string;
  imageUrl: string;
  projectDescription: string;
  goalAmount: number;
  raisedAmount: number;
  timestamp: number;
  endTime: number;
  status: ProjectStatus;
  contributionCounter: number;
  trustScore: number; //between 0 to 100
  rewards: Reward[];
  safetyDeposit: number;
  feed: Update[];
  votes: Vote[];
};

type Reward = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  maxSupply?: number;
  currentSupply: number;
};

type User = {
  ownerAddress: string;
  name: string;
  city?: string;
  avatarUrl: string;
  bio: string;
  createdProjectCounter: number;
};

type Feed = {
  title: string;
  type: 'information' | 'funds unlock' | 'milestone';
  timestamp: number;
  description: string;
};

type Contribution = {
  initialOwner: string;
  currentOwner: string;
  amount: number;
  rewardId: string;
  timestamp: number;
  isForSale: boolean;
  sellingPrice?: number;
};

type SaleTransaction = {
  seller: string;
  projectId: string;
  rewardId: string;
  contributionAmount: number;
  sellingPrice: number;
  creationTimestamp: number;
};

type Vote = {
  id: string;
  title: string;
  amountAsked: number;
  timestamp: number;
  description: string;
  status: 'ongoing' | 'accepted' | 'rejected';
  voteFor: number;
  voteAgainst: number;
};
