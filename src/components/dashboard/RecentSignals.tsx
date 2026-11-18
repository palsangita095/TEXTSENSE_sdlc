"use client";

import { useCallback, useMemo, useState } from "react";
import {
  dashboardSignals,
  SIGNALS_PER_PAGE,
  SIGNAL_TOTAL,
  sentimentStyles,
  type FeedbackSignal,
} from "@/data/dashboard";
import FeedbackDetailsModal from "./FeedbackDetailsModal";
import { useDashboard } from "./dashboard-context";

export default function RecentSignals() {
  const { query, signals } = useDashboard();
  const resetKey = `${query}:${signals.length}`;
  const [pagination, setPagination] = useState({ page: 1, resetKey });
  const [selectedSignal, setSelectedSignal] = useState<FeedbackSignal | null>(
    null,
  );

  const filteredSignals = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return signals;

    return signals.filter((signal) =>
      [
        signal.source,
        signal.message,
        signal.preview,
        signal.sentiment,
        signal.time,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [query, signals]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSignals.length / SIGNALS_PER_PAGE),
  );
  const currentPage =
    pagination.resetKey === resetKey
      ? Math.min(pagination.page, totalPages)
      : 1;
  const pageRows = filteredSignals.slice(
    (currentPage - 1) * SIGNALS_PER_PAGE,
    currentPage * SIGNALS_PER_PAGE,
  );

  const setPage = useCallback(
    (pageNumber: number) => setPagination({ page: pageNumber, resetKey }),
    [resetKey],
  );
  const closeDetails = useCallback(() => setSelectedSignal(null), []);
  const totalSignalCount =
    SIGNAL_TOTAL + Math.max(0, signals.length - dashboardSignals.length);

  return (
    <>
      <section
        id="feedback-history"
        className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 px-4 py-5 sm:px-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Signals</h3>
            <p className="pt-1 text-xs text-slate-500">
              Latest customer feedback and analysis
            </p>
          </div>

          <a
            href="#feedback-history"
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 sm:mt-0">
            View All History
            <i className="fa-solid fa-arrow-right ml-1" aria-hidden="true"></i>
          </a>
        </div>

        {pageRows.length === 0 ? (
          <div className="px-4 py-12 text-center sm:px-6">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <i className="fa-regular fa-face-frown text-lg" aria-hidden="true"></i>
            </span>
            <p className="mt-4 text-sm font-semibold text-slate-700">
              No signals found
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <>
            <div className="block md:hidden">
              {pageRows.map((signal, index) => {
                const styles = sentimentStyles[signal.sentiment];
                const isLast = index === pageRows.length - 1;

                return (
                  <div
                    key={signal.id}
                    className={
                      isLast ? "p-4" : "border-b border-slate-100 p-4"
                    }>
                    <div className="mb-4 flex items-center">
                      <span
                        className={`mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${signal.iconClasses}`}>
                        <i
                          className={signal.icon}
                          aria-hidden="true"></i>
                      </span>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800">
                          {signal.source}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {signal.time}
                        </p>
                      </div>

                      <span
                        className={`ml-auto rounded-full px-3 py-1.5 text-[10px] font-semibold ${styles.badgeClasses}`}>
                        <i
                          className="fa-solid fa-circle mr-1 text-[6px]"
                          aria-hidden="true"></i>
                        {signal.sentiment}
                      </span>
                    </div>

                    <p className="mb-4 text-xs leading-5 text-slate-500">
                      &quot;{signal.preview}&quot;
                    </p>

                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">
                        Confidence
                      </span>

                      <div className="flex items-center">
                        <div className="mr-2 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${styles.barClasses}`}
                            style={{ width: `${signal.confidenceValue}%` }}></div>
                        </div>

                        <span className="text-xs font-semibold text-slate-600">
                          {signal.confidence}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedSignal(signal)}
                        className="details-btn text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        aria-label={`View details for ${signal.source}`}>
                        View Details
                        <i
                          className="fa-solid fa-arrow-right ml-1"
                          aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Feedback Source</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Sentiment</th>
                    <th className="px-6 py-4">Confidence</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs">
                  {pageRows.map((signal) => {
                    const styles = sentimentStyles[signal.sentiment];

                    return (
                      <tr
                        key={signal.id}
                        className="transition hover:bg-slate-50/70">
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <span
                              className={`mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${signal.iconClasses}`}>
                              <i
                                className={signal.icon}
                                aria-hidden="true"></i>
                            </span>

                            <div>
                              <p className="font-bold text-slate-800">
                                {signal.source}
                              </p>
                              <p className="mt-1 text-[10px] text-slate-400">
                                {signal.time}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-xs px-6 py-5 text-slate-500">
                          &quot;{signal.preview}&quot;
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1.5 font-semibold ${styles.badgeClasses}`}>
                            <span
                              className={`mr-2 h-1.5 w-1.5 rounded-full ${styles.dotClasses}`}></span>
                            {signal.sentiment}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="mr-2 h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full ${styles.barClasses}`}
                                style={{ width: `${signal.confidenceValue}%` }}></div>
                            </div>
                            <span className="font-semibold text-slate-600">
                              {signal.confidence}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => setSelectedSignal(signal)}
                            className="details-btn font-semibold text-indigo-600 hover:text-indigo-800"
                            aria-label={`View details for ${signal.source}`}>
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="flex flex-wrap items-center justify-between border-t border-slate-100 px-4 py-4 sm:px-6">
          <p className="text-xs text-slate-500">
            Showing {pageRows.length} of {totalSignalCount} recent signals
          </p>

          <div className="mt-3 flex items-center sm:mt-0">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed"
              aria-label="Previous page">
              <i
                className="fa-solid fa-chevron-left text-[10px]"
                aria-hidden="true"></i>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  aria-label={`Page ${pageNumber}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    pageNumber === 1 ? "" : "ml-2"
                  } ${
                    pageNumber === currentPage
                      ? "bg-indigo-600 text-xs font-bold text-white"
                      : "border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                  }`}>
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed"
              aria-label="Next page">
              <i
                className="fa-solid fa-chevron-right text-[10px]"
                aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </section>

      <FeedbackDetailsModal signal={selectedSignal} onClose={closeDetails} />
    </>
  );
}
