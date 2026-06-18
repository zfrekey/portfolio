export type ContentStatus = "draft" | "published";

export type ContentBase = {
  slug: string;
  title: string;
  description: string;
  status?: ContentStatus;
  tags?: string[];
};

export type Book = ContentBase & {
  author?: string;
  finishedAt?: string;
};

export type Project = ContentBase & {
  repositoryUrl?: string;
  liveUrl?: string;
};

export type Post = ContentBase & {
  publishedAt?: string;
};

export type StackItem = {
  name: string;
  category: string;
  description?: string;
};
