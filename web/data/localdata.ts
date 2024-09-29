//* CATEGORY=================================
export const categories: string[] = [
  'All',
  'Art',
  'Education',
  'Entertainment',
  'Environment',
  'Finance',
  'Health',
  'Science',
  'Social impact',
  'Technology',
];

//* USER=================================
export const user1: User = {
  owner: 'xxxx',
  name: 'Albert HALL',
  city: 'London',
  avatarUrl: '',
  bio: 'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
  createdProjectCounter: 2,
};

//* REWARD=================================
export const reward1: Reward = {
  id: '1',
  name: 'Reward 1',
  imageUrl: '/Reward.png',
  description:
    'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
  price: 50,
  maxSupply: 1000,
  currentSupply: 243,
  isAvailable: true,
  redeemLimitTime: 1728382939,
};

export const reward2: Reward = {
  id: '2',
  name: 'Reward 2',
  imageUrl: '/Reward2.jpg',
  description:
    'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
  price: 100,
  maxSupply: 100,
  currentSupply: 100,
  isAvailable: false,
};

export const reward3: Reward = {
  id: '3',
  name: 'Reward 3',
  imageUrl: '/Reward.png',
  description:
    'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
  price: 200,
  maxSupply: 50,
  currentSupply: 40,
  isAvailable: false,
};

export const rewards: Reward[] = [
  reward1,
  reward1,
  reward2,
  reward3,
  reward1,
  reward1,
  reward1,
  reward2,
  reward1,
  reward1,
  reward3,
  reward3,
];

//* FEED =================================
export const feed1: Feed = {
  title: 'Project update example',
  type: 'information',
  timestamp: 1725228000,
  description:
    'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
};

//* VOTE =================================
export const fundsRequest1: FundsRequest = {
  id: '1',
  amountAsked: 20000,
  title: 'Launch of the project',
  timestamp: 1725919200,
  description:
    'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
  status: 'accepted',
  voteAgainst: 10,
  voteFor: 95,
};

export const fundsRequest2: FundsRequest = {
  id: '2',
  amountAsked: 40000,
  title: 'Second phase of the project',
  timestamp: 1726750330,
  description:
    'Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.',
  status: 'ongoing',
  voteAgainst: 5,
  voteFor: 35,
};

//* PROJECT=================================
export const project1: Project = {
  id: '1',
  ownerId: 'xxxx',
  name: 'First project',
  category: 'tech',
  imageUrl: '',
  projectDescription:
    'Morbi congue congue metus. Aenean sed purus.  Nam pede magna, tristique nec, porta id, sollicitudin quis, sapien.  Vestibulum blandit. Suspendisse ut augue ac nibh ullamcorper  posuere. Integer euismod, neque at eleifend fringilla, augue elit  ornare dolor, vel tincidunt purus est id lacus. Vivamus lorem dui,  commodo quis, scelerisque eu, tincidunt non, magna. Cras sodales.  Quisque vestibulum pulvinar diam. Phasellus tincidunt, leo vitae  tristique facilisis, ipsum wisi interdum sem, dapibus semper nulla  velit vel lectus. Cras dapibus mauris et augue. Quisque cursus nulla  in libero. Suspendisse et lorem sit amet mauris malesuada mollis.  Nullam id justo. Maecenas venenatis. Donec lacus arcu, egestas ac,  fermentum consectetuer, tempus eu, metus. Proin sodales, sem in  pretium fermentum, arcu sapien commodo mauris, venenatis consequat  augue urna in wisi. Quisque sapien nunc, varius eget, condimentum  quis, lacinia in, est. Fusce facilisis. Praesent nec ipsum.\n\n Integer interdum varius diam. Nam aliquam  velit a pede. Vivamus dictum nulla et wisi. Vestibulum a massa.  Donec vulputate nibh vitae risus dictum varius. Nunc suscipit, nunc  nec facilisis convallis, lacus ligula bibendum nulla, ac  sollicitudin sapien nisl fermentum velit. Lorem ipsum dolor sit  amet, consectetuer adipiscing elit. Nullam commodo dui ut augue  molestie scelerisque. Sed aliquet rhoncus tortor. Fusce laoreet,  turpis a facilisis tristique, leo mauris accumsan tellus, vitae  ornare lacus pede sit amet purus. Sed dignissim velit vitae ligula.  Sed sit amet diam sit amet arcu luctus ullamcorper.\n\n Nulla venenatis lorem id arcu. Morbi cursus urna  a ipsum. Donec porttitor. Integer eleifend, est non mattis  malesuada, mi nulla convallis mi, et auctor lectus sapien ut purus.  Aliquam nulla augue, pharetra sit amet, faucibus semper, molestie  vel, nibh. Pellentesque vestibulum magna et mi. Sed fringilla dolor  vel tellus. Nunc libero nunc, venenatis eget, convallis hendrerit,  iaculis elementum, mi. Nullam aliquam, felis et accumsan vehicula,  magna justo vehicula diam, eu condimentum nisl felis et nunc.  Quisque volutpat mauris a velit. Pellentesque massa. Integer at  lorem. Nam metus erat, lacinia id, convallis ut, pulvinar non, wisi.   Cras iaculis mauris ut neque. Cras sodales, sem vitae imperdiet  consequat, pede purus sollicitudin urna, ac aliquam metus orci in  leo. Ut molestie ultrices mauris. Vivamus vitae sem. Aliquam erat  volutpat. Praesent commodo, nisl ac dapibus aliquet, tortor orci  sodales lorem, non ornare nulla lorem quis nisl.',
  goalAmount: 50000,
  raisedAmount: 12150,
  timestamp: 1725055200,
  endTime: 1727647200,
  status: 'Fundraising',
  contributionCounter: 243,
  trustScore: 75,
  rewards: [reward1],
  safetyDeposit: 5000,
  feed: [feed1, feed1, feed1],
  fundsRequests: [],
  // xAccountUrl: 'https://x.com/befundr',
};

export const project2: Project = {
  id: '2',
  ownerId: '0',
  name: 'Second project',
  category: 'art',
  imageUrl: '',
  projectDescription:
    'Morbi congue congue metus. Aenean sed purus.  Nam pede magna, tristique nec, porta id, sollicitudin quis, sapien.  Vestibulum blandit. Suspendisse ut augue ac nibh ullamcorper  posuere. Integer euismod, neque at eleifend fringilla, augue elit  ornare dolor, vel tincidunt purus est id lacus. Vivamus lorem dui,  commodo quis, scelerisque eu, tincidunt non, magna. Cras sodales.  Quisque vestibulum pulvinar diam. Phasellus tincidunt, leo vitae  tristique facilisis, ipsum wisi interdum sem, dapibus semper nulla  velit vel lectus. Cras dapibus mauris et augue. Quisque cursus nulla  in libero. Suspendisse et lorem sit amet mauris malesuada mollis.  Nullam id justo. Maecenas venenatis. Donec lacus arcu, egestas ac,  fermentum consectetuer, tempus eu, metus. Proin sodales, sem in  pretium fermentum, arcu sapien commodo mauris, venenatis consequat  augue urna in wisi. Quisque sapien nunc, varius eget, condimentum  quis, lacinia in, est. Fusce facilisis. Praesent nec ipsum.\n\n Integer interdum varius diam. Nam aliquam  velit a pede. Vivamus dictum nulla et wisi. Vestibulum a massa.  Donec vulputate nibh vitae risus dictum varius. Nunc suscipit, nunc  nec facilisis convallis, lacus ligula bibendum nulla, ac  sollicitudin sapien nisl fermentum velit. Lorem ipsum dolor sit  amet, consectetuer adipiscing elit. Nullam commodo dui ut augue  molestie scelerisque. Sed aliquet rhoncus tortor. Fusce laoreet,  turpis a facilisis tristique, leo mauris accumsan tellus, vitae  ornare lacus pede sit amet purus. Sed dignissim velit vitae ligula.  Sed sit amet diam sit amet arcu luctus ullamcorper.\n\n Nulla venenatis lorem id arcu. Morbi cursus urna  a ipsum. Donec porttitor. Integer eleifend, est non mattis  malesuada, mi nulla convallis mi, et auctor lectus sapien ut purus.  Aliquam nulla augue, pharetra sit amet, faucibus semper, molestie  vel, nibh. Pellentesque vestibulum magna et mi. Sed fringilla dolor  vel tellus. Nunc libero nunc, venenatis eget, convallis hendrerit,  iaculis elementum, mi. Nullam aliquam, felis et accumsan vehicula,  magna justo vehicula diam, eu condimentum nisl felis et nunc.  Quisque volutpat mauris a velit. Pellentesque massa. Integer at  lorem. Nam metus erat, lacinia id, convallis ut, pulvinar non, wisi.   Cras iaculis mauris ut neque. Cras sodales, sem vitae imperdiet  consequat, pede purus sollicitudin urna, ac aliquam metus orci in  leo. Ut molestie ultrices mauris. Vivamus vitae sem. Aliquam erat  volutpat. Praesent commodo, nisl ac dapibus aliquet, tortor orci  sodales lorem, non ornare nulla lorem quis nisl.',
  goalAmount: 40000,
  raisedAmount: 84500,
  timestamp: 1719784800,
  endTime: 1725055200,
  status: 'Realising',
  contributionCounter: 1250,
  trustScore: 90,
  rewards: [reward2, reward3],
  safetyDeposit: 5000,
  feed: [feed1, feed1, feed1],
  fundsRequests: [fundsRequest1, fundsRequest2],
  // xAccountUrl: 'https://x.com/befundr',
};

export const projects: Project[] = [
  project1,
  project2,
  project1,
  project2,
  project2,
  project2,
  project1,
  project1,
  project1,
  project2,
  project2,
  project1,
  project2,
  project1,
  project1,
  project1,
];

//* SALE TRANSACTION=================================

export const sale1_1: SaleTransaction = {
  seller: 'xxxx',
  projectId: '0',
  rewardId: '1',
  contributionAmount: 50,
  sellingPrice: 65,
  creationTimestamp: 1726750330,
};

export const sale1_2: SaleTransaction = {
  seller: 'yyyy',
  projectId: '0',
  rewardId: '1',
  contributionAmount: 50,
  sellingPrice: 75,
  creationTimestamp: 1726750330,
};

export const sale2_1: SaleTransaction = {
  seller: 'yyyy',
  projectId: '0',
  rewardId: '2',
  contributionAmount: 100,
  sellingPrice: 125,
  creationTimestamp: 1726750330,
};

export const sale2_2: SaleTransaction = {
  seller: '0',
  projectId: '0',
  rewardId: '2',
  contributionAmount: 100,
  sellingPrice: 145,
  creationTimestamp: 1726750330,
};

export const sale3_1: SaleTransaction = {
  seller: '0',
  projectId: '0',
  rewardId: '3',
  contributionAmount: 200,
  sellingPrice: 270,
  creationTimestamp: 1726750330,
};

export const sale3_2: SaleTransaction = {
  seller: '0',
  projectId: '0',
  rewardId: '3',
  contributionAmount: 200,
  sellingPrice: 299,
  creationTimestamp: 1726750330,
};

export const sales: SaleTransaction[] = [
  sale1_1,
  sale1_1,
  sale1_1,
  sale1_1,
  sale1_1,
  sale1_2,
  sale1_2,
  sale2_1,
  sale2_1,
  sale2_2,
  sale2_2,
  sale2_2,
  sale2_2,
];

//* CONTRIBUTIONS =================================

export const contribution1: Contribution = {
  id: '0',
  initialOwner: 'xxxx',
  currentOwner: 'xxxx',
  amount: 50,
  rewardId: '1',
  timestamp: 1726783200,
  isForSale: true,
};

export const contribution2: Contribution = {
  id: '1',
  initialOwner: 'xxxx',
  currentOwner: 'xxxx',
  amount: 100,
  rewardId: '2',
  timestamp: 1726783200,
  isForSale: false,
};

export const contribution3: Contribution = {
  id: '2',
  initialOwner: 'xxxx',
  currentOwner: 'xxxx',
  amount: 200,
  rewardId: '3',
  timestamp: 1726783200,
  isForSale: false,
};

export const contributions: Contribution[] = [
  contribution1,
  contribution2,
  contribution3,
];
