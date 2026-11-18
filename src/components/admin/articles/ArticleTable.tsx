import {
  formatArticleDate,
  getArticleExcerpt,
  getAuthorInitials,
} from "@/data/admin/articles";
import type { ArticleRecord } from "@/type/type/content.type";
import ArticleStatusBadge from "./ArticleStatusBadge";

interface ArticleTableProps {
  rows: ArticleRecord[];
  deletingSlug: string | null;
  onView: (article: ArticleRecord) => void;
  onEdit: (article: ArticleRecord) => void;
  onDelete: (article: ArticleRecord) => void;
}

const actionButtonClasses =
  "flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50";

export default function ArticleTable({
  rows,
  deletingSlug,
  onView,
  onEdit,
  onDelete,
}: ArticleTableProps) {
  return (
    <div className="hidden w-full overflow-x-auto lg:block">
      <table className="w-full min-w-[960px] border-collapse text-left">
        <thead>
          <tr className="border-y border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3.5">Article</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5">Author</th>
            <th className="px-5 py-3.5">Updated</th>
            <th className="px-5 py-3.5">Published</th>
            <th className="px-5 py-3.5 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((article) => {
            const isDeleting = deletingSlug === article.slug;

            return (
              <tr key={article.id} className="transition hover:bg-slate-50/80">
                <td className="max-w-md px-5 py-4">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {article.title}
                  </p>

                  <p className="mt-1 line-clamp-2 max-w-md text-xs leading-5 text-slate-500">
                    {getArticleExcerpt(article.content, 130) || "No content yet."}
                  </p>

                  <p className="mt-1.5 flex items-center gap-1.5 truncate text-[11px] font-medium text-indigo-600">
                    <i className="fa-solid fa-link text-[9px]"></i>
                    {article.slug}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <ArticleStatusBadge status={article.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-700">
                      {getAuthorInitials(article.created_by_name)}
                    </span>

                    <span className="whitespace-nowrap text-sm text-slate-700">
                      {article.created_by_name || "TextSense team"}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatArticleDate(article.updated_at)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {article.published_at ? (
                    formatArticleDate(article.published_at)
                  ) : (
                    <span className="text-slate-400">Not published</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onView(article)}
                      aria-label={`View ${article.title}`}
                      title="View article"
                      className={`${actionButtonClasses} border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600`}>
                      <i className="fa-solid fa-eye text-xs"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(article)}
                      aria-label={`Edit ${article.title}`}
                      title="Edit article"
                      className={`${actionButtonClasses} border-slate-200 text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600`}>
                      <i className="fa-solid fa-pen text-xs"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(article)}
                      disabled={isDeleting}
                      aria-label={`Delete ${article.title}`}
                      title="Delete article"
                      className={`${actionButtonClasses} border-slate-200 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}>
                      <i
                        className={`text-xs ${
                          isDeleting
                            ? "fa-solid fa-spinner fa-spin"
                            : "fa-solid fa-trash-can"
                        }`}></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-12 text-center">
                <i className="fa-regular fa-file-lines mb-3 block text-3xl text-slate-300"></i>
                <p className="text-sm font-semibold text-slate-700">No articles to show</p>
                <p className="mt-1 text-xs text-slate-400">
                  Create a new article or adjust the filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
