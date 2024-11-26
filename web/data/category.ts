import { Enum } from '@solana/web3.js';

export class ProjectCategory extends Enum {
  static Technology = new ProjectCategory({ technology: 'technology' });
  static Art = new ProjectCategory({ art: 'art' });
  static Education = new ProjectCategory({ education: 'education' });
  static Health = new ProjectCategory({ health: 'health' });
  static Environment = new ProjectCategory({ environment: 'environment' });
  static SocialImpact = new ProjectCategory({
    socialImpact: 'socialImpact',
  });
  static Entertainment = new ProjectCategory({
    entertainment: 'entertainment',
  });
  static Science = new ProjectCategory({ science: 'science' });
  static Finance = new ProjectCategory({ finance: 'finance' });
  static Sports = new ProjectCategory({ sports: 'sports' });
  static Web3 = new ProjectCategory({ web3: 'web3' });
}

export const projectCategoryOptions = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Art', value: 'Art' },
  { label: 'Education', value: 'Education' },
  { label: 'Health', value: 'Health' },
  { label: 'Environment', value: 'Environment' },
  { label: 'Social Impact', value: 'SocialImpact' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Science', value: 'Science' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Web3', value: 'Web3' },
];
