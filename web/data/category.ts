export enum ProjectCategoryEnum {
  Technology = 'Technology',
  Art = 'Art',
  Education = 'Education',
  Health = 'Health',
  Environment = 'Environment',
  SocialImpact = 'SocialImpact',
  Entertainment = 'Entertainment',
  Science = 'Science',
  Finance = 'Finance',
  Sports = 'Sports',
}

// mapping to link displayed values and stored values
export const projectCategoryLabels: Record<ProjectCategoryEnum, string> = {
  [ProjectCategoryEnum.Technology]: 'Technology',
  [ProjectCategoryEnum.Art]: 'Art',
  [ProjectCategoryEnum.Education]: 'Education',
  [ProjectCategoryEnum.Health]: 'Health',
  [ProjectCategoryEnum.Environment]: 'Environment',
  [ProjectCategoryEnum.SocialImpact]: 'Social Impact', // Ce que vous voulez afficher
  [ProjectCategoryEnum.Entertainment]: 'Entertainment',
  [ProjectCategoryEnum.Science]: 'Science',
  [ProjectCategoryEnum.Finance]: 'Finance',
  [ProjectCategoryEnum.Sports]: 'Sports',
};
