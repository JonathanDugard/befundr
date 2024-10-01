type AccountWrapper<T> = {
  publicKey: PublicKey;
  account: T;
};

type Project = {
  user: string;
  name: string;
  category: ProjectCategory;
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
  fundsRequests: FundsRequest[];
  xAccountUrl: string;
};

type Reward = {
  id: string;
  name: string;
  imageUrl: string;
  imageFile?: File; // only to handle creation process
  description: string;
  price: number;
  maxSupply: number | null;
  currentSupply: number;
  isAvailable: boolean;
  redeemLimitTime?: number;
};

type User = {
  owner: string;
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
  id: string;
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

type FundsRequest = {
  id: string;
  title: string;
  amountAsked: number;
  timestamp: number;
  description: string;
  status: 'ongoing' | 'accepted' | 'rejected';
  voteFor: number;
  voteAgainst: number;
};
