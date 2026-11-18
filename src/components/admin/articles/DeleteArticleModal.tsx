"use client";

import type { ArticleRecord } from "@/type/type/content.type";
import ArticleModalShell from "./ArticleModalShell";

interface DeleteArticleModalProps {
  open: boolean;
  article: ArticleRecord | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteArticleModal({
  open,
  article,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteArticleModalProps) {
  if (!article) return null;

  return (
    <ArticleModalShell
      open={open}
      onClose={onClose}
      labelledBy="delete-article-title"
      closeDisabled={isDeleting}
      maxWidthClass="max-w-md">
      <div className="flex justify-end px-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          aria-label="Close delete confirmation"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="px-5 pb-6 text-center sm:px-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl text-red-600">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>

        <h2
          id="delete-article-title"
          className="text-lg font-bold text-slate-900">
          Delete this article?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This action permanently removes the article from the content library. It
          cannot be undone.
        </p>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
          <p className="line-clamp-2 text-sm font-semibold text-slate-800">
            {article.title}
          </p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] text-slate-400">
            <i className="fa-solid fa-link text-[9px]"></i>
            {article.slug}
          </p>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
            Keep Article
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-80">
            {isDeleting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Deleting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-trash-can mr-2"></i>
                Delete Article
              </>
            )}
          </button>
        </div>
      </div>
    </ArticleModalShell>
  );
}
