import type { Project } from "@/types/content";

export async function getProjects(): Promise<Project[]> {
  return [];
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getProjects();

  return projects.find((project) => project.slug === slug);
}
