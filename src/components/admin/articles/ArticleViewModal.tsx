"use client";

import {
  formatArticleDate,
  formatArticleDateTime,
  getAuthorInitials,
} from "@/data/admin/articles";
import type { ArticleRecord } from "@/type/type/content.type";
import ArticleModalShell from "./ArticleModalShell";
import ArticleStatusBadge from "./ArticleStatusBadge";

interface ArticleViewModalProps {
  open: boolean;
  article: ArticleRecord | null;
  onClose: () => void;
  onEdit: (article: ArticleRecord) => void;
}

export default function ArticleViewModal({
  open,
  article,
  onClose,
  onEdit,
}: ArticleViewModalProps) {
  if (!article) return null;

  return (
    <ArticleModalShell
      open={open}
      onClose={onClose}
      labelledBy="article-view-title"
      maxWidthClass="max-w-3xl">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <i className="fa-regular fa-file-lines"></i>
          </div>

          <div className="min-w-0">
            <h2
              id="article-view-title"
              className="line-clamp-2 text-lg font-bold leading-6 text-slate-900">
              {article.title}
            </h2>

            <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] font-medium text-indigo-600">
              <i className="fa-solid fa-link text-[9px]"></i>
              {article.slug}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close article preview"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
        <dl className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-4">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Status
            </dt>
            <dd className="mt-1.5">
              <ArticleStatusBadge status={article.status} />
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Author
            </dt>
            <dd className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[8px] font-bold text-indigo-700">
                {getAuthorInitials(article.created_by_name)}
              </span>
              <span className="truncate">
                {article.created_by_name || "TextSense team"}
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Last Updated
            </dt>
            <dd className="mt-1.5 text-xs font-medium text-slate-700">
              {formatArticleDate(article.updated_at)}
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Published
            </dt>
            <dd className="mt-1.5 text-xs font-medium text-slate-700">
              {article.published_at
                ? formatArticleDate(article.published_at)
                : "Not published"}
            </dd>
          </div>
        </dl>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Article Content
            </h3>

            <span className="text-[10px] text-slate-400">
              Created {formatArticleDateTime(article.created_at)}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            {article.content.trim() ? (
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                {article.content}
              </p>
            ) : (
              <p className="text-sm italic text-slate-400">
                This article does not have any content yet.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
            <i className="fa-solid fa-magnifying-glass mr-2 text-slate-400"></i>
            SEO Metadata
          </h3>

          <dl className="mt-3 space-y-3">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Meta Title
              </dt>
              <dd className="mt-1 text-sm text-slate-700">
                {article.meta_title || (
                  <span className="italic text-slate-400">Not set</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Meta Description
              </dt>
              <dd className="mt-1 text-sm leading-6 text-slate-700">
                {article.meta_description || (
                  <span className="italic text-slate-400">Not set</span>
                )}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
          Close
        </button>

        <button
          type="button"
          onClick={() => onEdit(article)}
          className="flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <i className="fa-solid fa-pen mr-2"></i>
          Edit Article
        </button>
      </div>
    </ArticleModalShell>
  );
}
