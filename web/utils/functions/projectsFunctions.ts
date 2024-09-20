export const getProjectById = (
  projects: Project[],
  projectId: string
): Project | undefined => {
  return projects.find((project) => project.id === projectId);
};
