"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  initialFeedbackRows,
  type UserFeedbackRow,
} from "@/data/admin/profile";

interface RowMenuState {
  id: number;
  top: number;
  left: number;
}

export default function RecentFeedback() {
  const [search, setSearch] = useState<string>("");
  const [rowMenu, setRowMenu] = useState<RowMenuState | null>(null);
  const [detailsRow, setDetailsRow] = useState<UserFeedbackRow | null>(null);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return initialFeedbackRows;

    return initialFeedbackRows.filter((row) =>
      [row.date, row.feedback, row.category, row.sentiment, row.status]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  useEffect(() => {
    if (!detailsRow) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailsRow(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [detailsRow]);

  const openRowMenu = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 180;
    const menuHeight = 92;
    const left = Math.max(
      8,
      Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8),
    );
    const top =
      rect.bottom + 6 + menuHeight > window.innerHeight
        ? rect.top - menuHeight - 6
        : rect.bottom + 6;

    setRowMenu({ id, top, left });
  };

  const exportCsv = () => {
    const header = ["Date", "Feedback", "Category", "Sentiment", "Status"];
    const csv = [
      header,
      ...filteredRows.map((row) => [
        row.date,
        row.feedback,
        row.category,
        row.sentiment,
        row.status,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "user-feedback.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success(
      `Exported ${filteredRows.length} feedback ${
        filteredRows.length === 1 ? "item" : "items"
      }`,
    );
  };

  const copyFeedback = async (row: UserFeedbackRow) => {
    try {
      await navigator.clipboard.writeText(row.feedback);
      toast.success("Feedback copied");
    } catch {
      toast.error("Could not copy feedback");
    }

    setRowMenu(null);
  };

  const menuRow = rowMenu
    ? initialFeedbackRows.find((row) => row.id === rowMenu.id) ?? null
    : null;

  return (
    <>
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#E2E5EC] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
            Recent feedback history
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Latest feedback submitted by this user
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E2E5EC] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <label className="relative w-full sm:max-w-xs">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]"></i>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search feedback..."
              className="w-full rounded-lg border border-[#E2E5EC] bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#4338CA] focus:bg-white"
            />
          </label>

          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center justify-center rounded-lg border border-[#E2E5EC] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] transition hover:bg-[#F8FAFC]">
            <i className="fa-solid fa-download mr-2"></i>
            Export
          </button>
        </div>

        <div className="overflow-x-auto border-t border-[#E2E5EC]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-[11px] uppercase tracking-wide text-[#64748B]">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Feedback</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold">Category</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold">Sentiment</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2E5EC]">
              {filteredRows.map((row) => (
                <tr key={row.id} className="transition hover:bg-[#F8FAFC]">
                  <td className="whitespace-nowrap px-4 py-4 text-[#64748B]">
                    {row.date}
                  </td>

                  <td className="min-w-[260px] px-4 py-4">
                    <p className="line-clamp-2 max-w-md text-[#334155]">
                      {row.feedback}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.categoryClasses}`}>
                      {row.category}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.sentimentClasses}`}>
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${row.sentimentDotClasses}`}></span>
                      {row.sentiment}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.statusClasses}`}>
                      {row.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={(event) => openRowMenu(event, row.id)}
                      className="rounded-lg px-2 py-1 text-[#94A3B8] transition hover:bg-[#EEF2FF] hover:text-[#4338CA]"
                      aria-label={`Open actions for feedback from ${row.date}`}>
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRows.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-[#64748B]">
              No feedback matches your search.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 border-t border-[#E2E5EC] px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[#64748B]">
            Showing{" "}
            <span className="font-semibold text-slate-900">{filteredRows.length}</span>{" "}
            of 86 feedback items
          </p>

          <Link
            href="/admin/feedback"
            className="font-semibold text-[#4338CA] transition hover:text-[#3730A3]">
            View all 86
            <i className="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
          </Link>
        </div>
      </section>

      {rowMenu && menuRow && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setRowMenu(null)}
            aria-hidden="true"></div>

          <div
            style={{ top: rowMenu.top, left: rowMenu.left }}
            className="fixed z-50 w-44 rounded-lg border border-[#E2E5EC] bg-white py-2 text-left shadow-lg">
            <button
              type="button"
              onClick={() => {
                setDetailsRow(menuRow);
                setRowMenu(null);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-[#334155] hover:bg-[#F8FAFC]">
              <i className="fa-regular fa-eye mr-2"></i>
              View details
            </button>

            <button
              type="button"
              onClick={() => copyFeedback(menuRow)}
              className="block w-full px-4 py-2 text-left text-sm text-[#334155] hover:bg-[#F8FAFC]">
              <i className="fa-regular fa-copy mr-2"></i>
              Copy feedback
            </button>
          </div>
        </>
      )}

      {detailsRow && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-3 py-5 sm:px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setDetailsRow(null);
          }}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Feedback Details</h3>

              <button
                type="button"
                onClick={() => setDetailsRow(null)}
                className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <p className="mb-5 rounded-xl bg-[#F8FAFC] p-4 text-sm leading-6 text-[#334155]">
              {detailsRow.feedback}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-[#94A3B8]">
                  Date
                </p>
                <p className="text-sm font-semibold">{detailsRow.date}</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-[#94A3B8]">
                  Category
                </p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${detailsRow.categoryClasses}`}>
                  {detailsRow.category}
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-[#94A3B8]">
                  Sentiment
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${detailsRow.sentimentClasses}`}>
                  <span
                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${detailsRow.sentimentDotClasses}`}></span>
                  {detailsRow.sentiment}
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-[#94A3B8]">
                  Status
                </p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${detailsRow.statusClasses}`}>
                  {detailsRow.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailsRow(null)}
                className="rounded-xl bg-[#4338CA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3730A3]">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
