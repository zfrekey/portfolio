import type { Book } from "@/types/content";

export async function getBooks(): Promise<Book[]> {
  return [];
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const books = await getBooks();

  return books.find((book) => book.slug === slug);
}
