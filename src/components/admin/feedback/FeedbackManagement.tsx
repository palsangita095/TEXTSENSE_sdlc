"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  FEEDBACK_PAGE_SIZE,
  mapFeedbackRecord,
  type FeedbackItem,
} from "@/data/admin/feedbackManagement";
import { feedbackStatusLabels } from "@/services/helpers/admin.helper";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import {
  fetchAdminAnalytics,
  fetchCategories,
  fetchFeedbacks,
  updateFeedbackStatus,
} from "@/store/slices/admin.slice";
import type { FeedbackStatus } from "@/type/type/admin.type";
import AddFeedbackModal from "./AddFeedbackModal";
import FeedbackDesktopTable from "./FeedbackDesktopTable";
import FeedbackMobileCards from "./FeedbackMobileCards";
import FeedbackStatsCards from "./FeedbackStatsCards";
import ViewFeedbackModal from "./ViewFeedbackModal";

type PageItem = number | "gap";

function buildPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  let start = current - 1;
  let end = current + 1;

  if (current <= 2) {
    start = 1;
    end = 3;
  } else if (current >= total - 1) {
    start = total - 2;
    end = total;
  }

  const items: PageItem[] = [];

  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("gap");
  }

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (end < total) {
    if (end < total - 1) items.push("gap");
    items.push(total);
  }

  return items;
}

const filterSelectClasses =
  "mb-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none sm:mb-0 sm:mr-3";

const controlClasses =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

const inactiveControlClasses =
  "border-gray-200 bg-white text-gray-600 hover:bg-gray-50";

const activeControlClasses =
  "border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700";

export default function FeedbackManagement() {
  const dispatch = useAppDispatch();
  const feedbacks = useAppSeletor((state) => state.admin.feedbacks);
  const categories = useAppSeletor((state) => state.admin.categories);
  const isFeedbackLoading = useAppSeletor((state) => state.admin.isFeedbackLoading);
  const feedbackError = useAppSeletor((state) => state.admin.feedbackError);
  const currentUser = useAppSeletor((state) => state.auth.user);

  const [search, setSearch] = useState<string>("");
  const [sentimentFilter, setSentimentFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [viewRow, setViewRow] = useState<FeedbackItem | null>(null);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    dispatch(fetchFeedbacks());
    dispatch(fetchCategories());
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  const items = useMemo(
    () => feedbacks.map((feedback) => mapFeedbackRecord(feedback, categoryMap, currentUser)),
    [feedbacks, categoryMap, currentUser],
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const rowText = [
        item.customer,
        item.title,
        item.message,
        item.categoryName,
        item.source,
        item.sentiment,
        feedbackStatusLabels[item.status],
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch = !query || rowText.includes(query);
      const sentimentMatch = !sentimentFilter || item.sentiment === sentimentFilter;
      const statusMatch = !statusFilter || item.status === statusFilter;

      return searchMatch && sentimentMatch && statusMatch;
    });
  }, [items, search, sentimentFilter, statusFilter]);

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / FEEDBACK_PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageRows = filteredItems.slice(
    (currentPage - 1) * FEEDBACK_PAGE_SIZE,
    currentPage * FEEDBACK_PAGE_SIZE,
  );

  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * FEEDBACK_PAGE_SIZE + 1;
  const lastItem = Math.min(currentPage * FEEDBACK_PAGE_SIZE, totalItems);

  const allSelected =
    pageRows.length > 0 && pageRows.every((row) => selectedIds.includes(row.id));

  const pageItems = buildPageItems(currentPage, totalPages);

  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    const pageIds = pageRows.map((row) => row.id);

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const resetFilters = () => {
    setSearch("");
    setSentimentFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const handleRefresh = () => {
    dispatch(fetchFeedbacks());
    dispatch(fetchCategories());
    dispatch(fetchAdminAnalytics());
  };

  const handleMarkReviewed = async () => {
    if (selectedIds.length === 0) return;

    const ids = [...selectedIds];

    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          await dispatch(updateFeedbackStatus({ id, status: "REVIEWED" })).unwrap();
          return true;
        } catch {
          return false;
        }
      }),
    );

    const updatedCount = results.filter(Boolean).length;
    const failedIds = ids.filter((_, index) => !results[index]);

    if (updatedCount === 0) {
      toast.error("Unable to update feedback status");
      return;
    }

    if (failedIds.length > 0) {
      toast.warning(`${updatedCount} updated, ${failedIds.length} failed`);
      setSelectedIds(failedIds);
    } else {
      toast.success(
        `${updatedCount} ${updatedCount === 1 ? "feedback" : "feedback entries"} marked as reviewed`,
      );
      setSelectedIds([]);
    }

    dispatch(fetchAdminAnalytics());
  };

  const handleExport = () => {
    const header = [
      "Customer",
      "Title",
      "Feedback",
      "Category",
      "Source",
      "Sentiment",
      "Confidence",
      "Date",
      "Status",
    ];
    const csv = [
      header,
      ...filteredItems.map((item) => [
        item.customer,
        item.title,
        item.message,
        item.categoryName,
        item.source,
        item.sentiment,
        item.confidence,
        item.date,
        feedbackStatusLabels[item.status],
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "feedback.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filteredItems.length} feedback entries`);
  };

  return (
    <>
      <section id="pageHeading" className="relative z-20 mb-6 block w-full bg-white p-4">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Feedback Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              View, filter, and manage all customer feedback.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isFeedbackLoading}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60">
              <i
                className={`fa-solid fa-rotate mr-2 ${isFeedbackLoading ? "fa-spin" : ""}`}></i>
              Refresh
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              Export Feedback
            </button>
          </div>
        </div>
      </section>

      <FeedbackStatsCards />

      {feedbackError && (
        <div
          role="alert"
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {feedbackError}
          </p>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isFeedbackLoading}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
            Retry
          </button>
        </div>
      )}

      <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">All Feedback</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage customer reviews and responses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:mt-0">
            <i className="fa-solid fa-plus mr-2"></i>
            Add Feedback
          </button>
        </div>

        <div className="mb-5 flex flex-col flex-wrap items-stretch sm:flex-row sm:items-center">
          <div className="relative mb-3 sm:mb-0 sm:mr-3">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"></i>
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search feedback..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-56"
            />
          </div>

          <select
            value={sentimentFilter}
            onChange={(event) => {
              setSentimentFilter(event.target.value);
              setPage(1);
            }}
            className={filterSelectClasses}>
            <option value="">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
            <option value="Unknown">Not analyzed</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
            className={filterSelectClasses}>
            <option value="">All Status</option>
            {(Object.keys(feedbackStatusLabels) as FeedbackStatus[]).map((status) => (
              <option key={status} value={status}>
                {feedbackStatusLabels[status]}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="mb-3 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 active:translate-y-px sm:mb-0">
            <i className="fa-solid fa-rotate-left mr-2"></i>
            Reset
          </button>
        </div>

        {selectedIds.length > 0 && (
          <div className="mb-4 flex flex-col items-start justify-between gap-3 rounded-lg bg-blue-50 p-3 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-blue-700">
              <span>{selectedIds.length}</span> feedback selected
            </p>

            <div className="flex flex-wrap items-center">
              <button
                type="button"
                onClick={handleMarkReviewed}
                className="mr-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700">
                <i className="fa-solid fa-check mr-1"></i>
                Mark as Reviewed
              </button>

              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="w-full min-w-0">
          {isFeedbackLoading && feedbacks.length === 0 ? (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-14 text-sm text-gray-500">
              <i className="fa-solid fa-spinner fa-spin text-blue-600"></i>
              Loading feedback...
            </div>
          ) : (
            <>
              <FeedbackDesktopTable
                rows={pageRows}
                selectedIds={selectedIds}
                allSelected={allSelected}
                onToggleRow={toggleRow}
                onToggleAll={toggleAll}
                onView={setViewRow}
              />

              <FeedbackMobileCards
                rows={pageRows}
                selectedIds={selectedIds}
                onToggleRow={toggleRow}
                onView={setViewRow}
              />
            </>
          )}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-500">
            Showing {firstItem}-{lastItem} of {totalItems} feedback
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:ml-auto sm:justify-end">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
              aria-label="Previous page"
              className={`${controlClasses} ${inactiveControlClasses}`}>
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>

            {pageItems.map((item, index) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  type="button"
                  aria-current={item === currentPage ? "page" : undefined}
                  onClick={() => setPage(item)}
                  aria-label={`Page ${item}`}
                  className={`${controlClasses} ${
                    item === currentPage ? activeControlClasses : inactiveControlClasses
                  }`}>
                  {item}
                </button>
              ) : (
                <span
                  key={`gap-${index}`}
                  aria-hidden="true"
                  className="px-1 text-sm text-gray-400">
                  ...
                </span>
              ),
            )}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
              aria-label="Next page"
              className={`${controlClasses} ${inactiveControlClasses}`}>
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      </section>

      <ViewFeedbackModal open={viewRow !== null} row={viewRow} onClose={() => setViewRow(null)} />

      <AddFeedbackModal open={addOpen} onClose={() => setAddOpen(false)} />
    </>
  );
}
