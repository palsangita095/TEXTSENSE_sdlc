import type { ArticleRecord, ArticleStatus } from "@/type/type/content.type";

export const ARTICLE_PAGE_SIZE = 8;

export const articleStatusLabels: Record<ArticleStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
};

export const articleStatusBadgeClasses: Record<ArticleStatus, string> = {
  DRAFT: "bg-amber-100 text-amber-700",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
};

export const articleStatusFilters: { value: ArticleStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "PUBLISHED", label: "Published" },
  { value: "DRAFT", label: "Draft" },
];

export type ArticleSort = "newest" | "oldest" | "title" | "published";

export const articleSortOptions: { value: ArticleSort; label: string }[] = [
  { value: "newest", label: "Recently Updated" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "Title A-Z" },
  { value: "published", label: "Recently Published" },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatArticleDate(value: string | null | undefined): string {
  const date = parseDate(value);

  return date ? dateFormatter.format(date) : "—";
}

export function formatArticleDateTime(value: string | null | undefined): string {
  const date = parseDate(value);

  return date ? dateTimeFormatter.format(date) : "—";
}

export function toPlainText(content: string): string {
  return content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getArticleExcerpt(content: string, maxLength = 150): string {
  const text = toPlainText(content);

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function getAuthorInitials(name: string | null | undefined): string {
  if (!name) return "TS";

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return initials || "TS";
}

export function sortArticles(
  articles: ArticleRecord[],
  sort: ArticleSort,
): ArticleRecord[] {
  const sorted = [...articles];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (first, second) =>
          new Date(first.updated_at).getTime() -
          new Date(second.updated_at).getTime(),
      );
    case "title":
      return sorted.sort((first, second) =>
        first.title.localeCompare(second.title),
      );
    case "published":
      return sorted.sort((first, second) => {
        const firstTime = first.published_at
          ? new Date(first.published_at).getTime()
          : 0;
        const secondTime = second.published_at
          ? new Date(second.published_at).getTime()
          : 0;

        return secondTime - firstTime;
      });
    default:
      return sorted.sort(
        (first, second) =>
          new Date(second.updated_at).getTime() -
          new Date(first.updated_at).getTime(),
      );
  }
}
