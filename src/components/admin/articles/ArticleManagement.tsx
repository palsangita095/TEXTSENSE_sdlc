"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import Pagination from "@/components/admin/Pagination";
import {
  ARTICLE_PAGE_SIZE,
  articleSortOptions,
  articleStatusFilters,
  articleStatusLabels,
  sortArticles,
  type ArticleSort,
} from "@/data/admin/articles";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import {
  clearContentError,
  deleteArticle,
  fetchArticles,
} from "@/store/slices/content.slice";
import type { ArticleRecord, ArticleStatus } from "@/type/type/content.type";
import ArticleFormModal from "./ArticleFormModal";
import ArticleMobileCards from "./ArticleMobileCards";
import ArticleStatsCards from "./ArticleStatsCards";
import ArticleTable from "./ArticleTable";
import ArticleViewModal from "./ArticleViewModal";
import DeleteArticleModal from "./DeleteArticleModal";

const filterFieldClasses =
  "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function ArticleManagement() {
  const dispatch = useAppDispatch();
  const articles = useAppSeletor((state) => state.content.articles);
  const isLoading = useAppSeletor((state) => state.content.isLoading);
  const error = useAppSeletor((state) => state.content.error);
  const deletingSlug = useAppSeletor((state) => state.content.deletingSlug);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | "all">("all");
  const [sort, setSort] = useState<ArticleSort>("newest");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleRecord | null>(null);
  const [viewArticle, setViewArticle] = useState<ArticleRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ArticleRecord | null>(null);

  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;
    dispatch(fetchArticles());
  }, [dispatch]);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    const matching = articles.filter((article) => {
      const searchableText = [
        article.title,
        article.slug,
        article.content,
        article.meta_title,
        article.meta_description,
        article.created_by_name ?? "",
        articleStatusLabels[article.status],
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch = !query || searchableText.includes(query);
      const statusMatch =
        statusFilter === "all" || article.status === statusFilter;

      return searchMatch && statusMatch;
    });

    return sortArticles(matching, sort);
  }, [articles, search, statusFilter, sort]);

  const totalItems = filteredArticles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ARTICLE_PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageRows = filteredArticles.slice(
    (currentPage - 1) * ARTICLE_PAGE_SIZE,
    currentPage * ARTICLE_PAGE_SIZE,
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSort("newest");
    setPage(1);
  };

  const handleRefresh = () => {
    dispatch(clearContentError());
    dispatch(fetchArticles());
  };

  const openCreateForm = () => {
    dispatch(clearContentError());
    setEditingArticle(null);
    setFormOpen(true);
  };

  const openEditForm = (article: ArticleRecord) => {
    dispatch(clearContentError());
    setViewArticle(null);
    setEditingArticle(article);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingArticle(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await dispatch(deleteArticle(deleteTarget.slug)).unwrap();
      toast.success("Article deleted successfully");
      setDeleteTarget(null);

      if (pageRows.length === 1 && currentPage > 1) {
        setPage(currentPage - 1);
      }
    } catch (deleteError) {
      toast.error(
        typeof deleteError === "string"
          ? deleteError
          : "Unable to delete the article. Please try again.",
      );
    }
  };

  return (
    <>
      <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-blue-600">
            Content Studio
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Content / Articles
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, edit, publish, and remove SEO-ready content from one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
            <i
              className={`fa-solid fa-rotate mr-2 ${
                isLoading ? "fa-spin" : ""
              }`}></i>
            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
            <i className="fa-solid fa-plus mr-2"></i>
            New Article
          </button>
        </div>
      </section>

      <ArticleStatsCards />

      {error && (
        <div
          role="alert"
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {error}
          </p>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
            Retry
          </button>
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Article Library</h2>

            <p className="mt-1 text-sm text-slate-500">
              {totalItems} {totalItems === 1 ? "article" : "articles"} in view
              {articles.length !== totalItems ? ` of ${articles.length} total` : ""}.
            </p>
          </div>

          <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
            <i className="fa-solid fa-database mr-1.5 text-[9px]"></i>
            Live API
          </span>
        </div>

        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-sm">
            <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400"></i>

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search title, slug, content, or author..."
              aria-label="Search articles"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as ArticleStatus | "all");
                setPage(1);
              }}
              aria-label="Filter articles by status"
              className={filterFieldClasses}>
              {articleStatusFilters.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as ArticleSort);
                setPage(1);
              }}
              aria-label="Sort articles"
              className={filterFieldClasses}>
              {articleSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 active:translate-y-px">
              <i className="fa-solid fa-rotate-left mr-2"></i>
              Reset
            </button>
          </div>
        </div>

        {isLoading && articles.length === 0 ? (
          <div className="flex items-center justify-center gap-3 border-t border-slate-100 px-4 py-16 text-sm text-slate-500">
            <i className="fa-solid fa-spinner fa-spin text-blue-600"></i>
            Loading articles...
          </div>
        ) : totalItems === 0 ? (
          <div className="p-5">
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-slate-400 shadow-sm">
                <i className="fa-regular fa-file-lines"></i>
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                {articles.length === 0
                  ? "No articles yet"
                  : "No articles match your filters"}
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                {articles.length === 0
                  ? "Create your first article to start building the content library and publishing insights."
                  : "Try a different search term or reset the status filter to see more articles."}
              </p>

              <button
                type="button"
                onClick={articles.length === 0 ? openCreateForm : resetFilters}
                className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700">
                <i
                  className={`mr-2 ${
                    articles.length === 0 ? "fa-solid fa-plus" : "fa-solid fa-rotate-left"
                  }`}></i>
                {articles.length === 0 ? "Create Article" : "Reset Filters"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <ArticleTable
              rows={pageRows}
              deletingSlug={deletingSlug}
              onView={setViewArticle}
              onEdit={openEditForm}
              onDelete={setDeleteTarget}
            />

            <ArticleMobileCards
              rows={pageRows}
              deletingSlug={deletingSlug}
              onView={setViewArticle}
              onEdit={openEditForm}
              onDelete={setDeleteTarget}
            />

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={ARTICLE_PAGE_SIZE}
              onPageChange={setPage}
              itemLabel="articles"
            />
          </>
        )}
      </section>

      {formOpen && (
        <ArticleFormModal
          open
          article={editingArticle}
          onClose={handleFormClose}
        />
      )}

      <ArticleViewModal
        open={viewArticle !== null}
        article={viewArticle}
        onClose={() => setViewArticle(null)}
        onEdit={openEditForm}
      />

      <DeleteArticleModal
        open={deleteTarget !== null}
        article={deleteTarget}
        isDeleting={Boolean(
          deleteTarget && deletingSlug === deleteTarget.slug,
        )}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
