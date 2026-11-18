import {
  formatArticleDate,
  getArticleExcerpt,
  getAuthorInitials,
} from "@/data/admin/articles";
import type { ArticleRecord } from "@/type/type/content.type";
import ArticleStatusBadge from "./ArticleStatusBadge";

interface ArticleMobileCardsProps {
  rows: ArticleRecord[];
  deletingSlug: string | null;
  onView: (article: ArticleRecord) => void;
  onEdit: (article: ArticleRecord) => void;
  onDelete: (article: ArticleRecord) => void;
}

export default function ArticleMobileCards({
  rows,
  deletingSlug,
  onView,
  onEdit,
  onDelete,
}: ArticleMobileCardsProps) {
  return (
    <div className="space-y-3 p-4 lg:hidden">
      {rows.map((article) => {
        const isDeleting = deletingSlug === article.slug;

        return (
          <article
            key={article.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900">{article.title}</h3>

                <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] font-medium text-indigo-600">
                  <i className="fa-solid fa-link text-[9px]"></i>
                  {article.slug}
                </p>
              </div>

              <ArticleStatusBadge status={article.status} />
            </div>

            <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-500">
              {getArticleExcerpt(article.content, 180) || "No content yet."}
            </p>

            <dl className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-[11px]">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-slate-400">
                  Author
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[8px] font-bold text-indigo-700">
                    {getAuthorInitials(article.created_by_name)}
                  </span>
                  <span className="truncate">
                    {article.created_by_name || "TextSense team"}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="font-semibold uppercase tracking-wide text-slate-400">
                  Updated
                </dt>
                <dd className="mt-1 font-medium text-slate-700">
                  {formatArticleDate(article.updated_at)}
                </dd>
              </div>

              <div className="col-span-2">
                <dt className="font-semibold uppercase tracking-wide text-slate-400">
                  Published
                </dt>
                <dd className="mt-1 font-medium text-slate-700">
                  {article.published_at
                    ? formatArticleDate(article.published_at)
                    : "Not published yet"}
                </dd>
              </div>
            </dl>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onView(article)}
                className="flex-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                <i className="fa-solid fa-eye mr-1.5"></i>
                View
              </button>

              <button
                type="button"
                onClick={() => onEdit(article)}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                <i className="fa-solid fa-pen mr-1.5"></i>
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(article)}
                disabled={isDeleting}
                className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">
                <i
                  className={`mr-1.5 ${
                    isDeleting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-trash-can"
                  }`}></i>
                Delete
              </button>
            </div>
          </article>
        );
      })}

      {rows.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 px-4 py-12 text-center">
          <i className="fa-regular fa-file-lines mb-3 block text-3xl text-slate-300"></i>
          <p className="text-sm font-semibold text-slate-700">No articles to show</p>
          <p className="mt-1 text-xs text-slate-400">
            Create a new article or adjust the filters.
          </p>
        </div>
      )}
    </div>
  );
}
