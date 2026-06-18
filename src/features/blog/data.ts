import type { Post } from "@/types/content";

export async function getPosts(): Promise<Post[]> {
  return [];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();

  return posts.find((post) => post.slug === slug);
}
