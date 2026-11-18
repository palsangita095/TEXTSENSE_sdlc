"use client";

import { useMemo, useState } from "react";
import { feedbackRows, type FeedbackRow } from "@/data/admin/feedbackRows";
import FeedbackDetailsModal from "./FeedbackDetailsModal";

const sentimentBadgeClasses: Record<FeedbackRow["sentiment"], string> = {
  Positive: "bg-green-50 text-green-600",
  Neutral: "bg-amber-50 text-amber-600",
  Negative: "bg-red-50 text-red-600",
};

const statusBadgeClasses: Record<FeedbackRow["status"], string> = {
  Reviewed: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function FeedbackTable() {
  const [search, setSearch] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [selectedRow, setSelectedRow] = useState<FeedbackRow | null>(null);

  const filteredRows = useMemo(() => {
    const query = search.toLowerCase();

    return feedbackRows.filter((row) => {
      const rowText = [
        row.preview,
        row.category,
        row.sentiment,
        row.confidence,
        row.date,
        row.status,
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch = rowText.includes(query);
      const sentimentMatch = sentiment === "all" || row.sentiment === sentiment;
      const categoryMatch = category === "all" || row.category === category;

      return searchMatch && sentimentMatch && categoryMatch;
    });
  }, [search, sentiment, category]);

  return (
    <>
      <section
        id="feedback"
        className="mb-8 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
        <div className="mb-6 flex flex-col items-start justify-between xl:flex-row xl:items-center">
          <h3 className="mb-4 text-lg font-semibold xl:mb-0">Recent Customer Feedback</h3>

          <div className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:items-center xl:w-auto">
            <label className="relative mb-3 w-full sm:mr-3 sm:w-56">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500"
                placeholder="Search feedback..."
              />
            </label>

            <select
              value={sentiment}
              onChange={(event) => setSentiment(event.target.value)}
              className="mb-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm sm:mr-2 sm:w-auto">
              <option value="all">All Sentiments</option>
              <option>Positive</option>
              <option>Neutral</option>
              <option>Negative</option>
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mb-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm sm:mr-2 sm:w-auto">
              <option value="all">All Categories</option>
              <option>Customer Support</option>
              <option>Product Quality</option>
              <option>Delivery</option>
              <option>Pricing</option>
              <option>General Experience</option>
            </select>

            <a href="#feedback" className="mb-3 text-sm font-semibold text-indigo-600 sm:ml-2">
              View All
            </a>
          </div>
        </div>

        <div className="w-full min-w-0 overflow-x-auto rounded-xl">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wide text-slate-500">
                <th className="px-2 py-4">Feedback</th>
                <th className="px-2 py-4">Category</th>
                <th className="px-2 py-4">Sentiment</th>
                <th className="px-2 py-4">Confidence</th>
                <th className="px-2 py-4">Date</th>
                <th className="px-2 py-4">Status</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td className="max-w-[230px] px-2 py-5">{row.preview}</td>
                  <td className="px-2 py-5 text-slate-500">{row.category}</td>
                  <td className="px-2 py-5">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 font-semibold ${sentimentBadgeClasses[row.sentiment]}`}>
                      {row.sentiment}
                    </span>
                  </td>
                  <td className="px-2 py-5">{row.confidence}</td>
                  <td className="whitespace-nowrap px-2 py-5 text-slate-500">{row.date}</td>
                  <td className="px-2 py-5">
                    <span
                      className={`rounded-full px-3 py-1 font-semibold ${statusBadgeClasses[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-5">
                    <button
                      onClick={() => setSelectedRow(row)}
                      className="details-btn font-semibold text-indigo-600">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FeedbackDetailsModal
        open={selectedRow !== null}
        row={selectedRow}
        onClose={() => setSelectedRow(null)}
      />
    </>
  );
}
