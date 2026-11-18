import {
  articleStatusBadgeClasses,
  articleStatusLabels,
} from "@/data/admin/articles";
import type { ArticleStatus } from "@/type/type/content.type";

interface ArticleStatusBadgeProps {
  status: ArticleStatus;
}

export default function ArticleStatusBadge({ status }: ArticleStatusBadgeProps) {
  const isPublished = status === "PUBLISHED";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${articleStatusBadgeClasses[status]}`}>
      <i
        className={`${
          isPublished ? "fa-solid fa-circle-check" : "fa-regular fa-file-lines"
        } mr-1.5 text-[10px]`}></i>
      {articleStatusLabels[status]}
    </span>
  );
}
