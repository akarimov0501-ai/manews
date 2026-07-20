export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  publishedAt: string;
  readingTime: string;
  category: {
    name: string;
    slug: string;
  } | null;
  author: {
    name: string;
    avatarUrl: string;
  };
  isArchived?: boolean;
}
