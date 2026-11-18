export type ArticleStatus = "DRAFT" | "PUBLISHED";

export interface ArticleRecord {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  status: ArticleStatus;
  created_by: number | null;
  created_by_name: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface ArticleCreatePayload {
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  status?: ArticleStatus;
  slug?: string;
}

export type ArticleUpdatePayload = Partial<ArticleCreatePayload>;

export interface ArticleListResponse {
  message?: string;
  articles?: ArticleRecord[];
  results?: ArticleRecord[];
}
