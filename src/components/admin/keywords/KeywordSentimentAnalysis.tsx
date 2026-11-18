"use client";

import {
  keywordNumberFormatter,
  keywordSentimentIcons,
  keywordTableSentimentClasses,
  type KeywordSentimentRow,
} from "@/data/admin/keywords";

interface KeywordSentimentAnalysisProps {
  rows: KeywordSentimentRow[];
}

function SentimentBadge({ row }: { row: KeywordSentimentRow }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-1.5 font-semibold ${
        keywordTableSentimentClasses[row.dominant]
      }`}>
      <i className={`${keywordSentimentIcons[row.dominant]} mr-1`}></i>
      {row.dominant}
    </span>
  );
}

function KeywordLabel({ row }: { row: KeywordSentimentRow }) {
  if (!row.stacked) return <>{row.keyword}</>;

  const [first, ...rest] = row.keyword.split(" ");

  return (
    <>
      {first}
      {rest.length > 0 && (
        <>
          <br />
          {rest.join(" ")}
        </>
      )}
    </>
  );
}

export default function KeywordSentimentAnalysis({ rows }: KeywordSentimentAnalysisProps) {
  return (
    <div className="mb-5 w-full px-2 xl:mb-0 xl:w-1/2">
      <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_12px_30px_rgba(67,56,202,0.10)] sm:p-5 lg:p-6">
        <div className="mb-6 flex flex-col 2xl:flex-row 2xl:items-start 2xl:justify-between">
          <div className="mb-4 min-w-0 2xl:mb-0">
            <h2 className="text-xl font-bold leading-tight text-[#111827] sm:text-2xl">
              Keyword Sentiment Analysis
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sentiment associated with each keyword
            </p>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="mb-1 mr-3 flex items-center">
              <span className="mr-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-600"></span>
              <span className="text-xs font-medium text-slate-500">Positive</span>
            </div>

            <div className="mb-1 mr-3 flex items-center">
              <span className="mr-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500"></span>
              <span className="text-xs font-medium text-slate-500">Neutral</span>
            </div>

            <div className="mb-1 flex items-center">
              <span className="mr-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-600"></span>
              <span className="text-xs font-medium text-slate-500">Negative</span>
            </div>
          </div>
        </div>

        <div className="hidden w-full overflow-x-auto xl:block">
          <table className="w-full min-w-[580px] border-collapse text-center text-xs">
            <thead>
              <tr className="bg-[#F5F6FA] text-slate-500">
                <th className="rounded-l-xl px-2 py-3 text-left font-semibold">Keyword</th>
                <th className="px-1 py-3 font-semibold">
                  Total
                  <br />
                  Mentions
                </th>
                <th className="px-2 py-3 font-semibold">
                  Sentiment
                  <br />
                  Split
                </th>
                <th className="px-1 py-3 font-semibold">
                  Positive
                  <br />%
                </th>
                <th className="px-1 py-3 font-semibold">
                  Neutral
                  <br />%
                </th>
                <th className="px-1 py-3 font-semibold">
                  Negative
                  <br />%
                </th>
                <th className="px-2 py-3 font-semibold">Dominant</th>
                <th className="rounded-r-xl px-2 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-2 py-8 text-sm text-slate-500">
                    No keywords match the current filters.
                  </td>
                </tr>
              )}

              {rows.map((row) => (
                <tr
                  key={row.keyword}
                  className="border-b border-slate-200 transition hover:bg-[#F8F9FF]">
                  <td className="px-2 py-5 text-left font-semibold text-[#4338CA]">
                    <KeywordLabel row={row} />
                  </td>

                  <td className="px-1 py-5 font-bold text-[#111827]">
                    {keywordNumberFormatter.format(row.mentions)}
                  </td>

                  <td className="px-2 py-5">
                    <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                      <span className="bg-green-600" style={{ width: `${row.positive}%` }}></span>
                      <span className="bg-amber-500" style={{ width: `${row.neutral}%` }}></span>
                      <span className="bg-red-600" style={{ width: `${row.negative}%` }}></span>
                    </div>
                  </td>

                  <td
                    className={`px-1 py-5 ${
                      row.dominant === "Positive"
                        ? "font-bold text-[#111827]"
                        : "text-slate-500"
                    }`}>
                    {row.positive}%
                  </td>
                  <td
                    className={`px-1 py-5 ${
                      row.dominant === "Neutral" ? "font-bold text-[#111827]" : "text-slate-500"
                    }`}>
                    {row.neutral}%
                  </td>
                  <td
                    className={`px-1 py-5 ${
                      row.dominant === "Negative"
                        ? "font-bold text-[#111827]"
                        : "text-slate-500"
                    }`}>
                    {row.negative}%
                  </td>

                  <td className="px-2 py-5">
                    <SentimentBadge row={row} />
                  </td>

                  <td className="px-2 py-5">
                    <a
                      href={`#${row.anchor}`}
                      className="whitespace-nowrap font-semibold text-[#4338CA] transition hover:text-indigo-700 hover:underline">
                      View
                      <i className="fa-solid fa-chevron-right ml-1 text-[10px] text-slate-400"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="xl:hidden">
          {rows.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              No keywords match the current filters.
            </p>
          )}

          {rows.map((row, index) => (
            <div
              key={row.keyword}
              className={`border-b border-slate-200 py-4 ${
                index === rows.length - 1 ? "border-b-0 pb-0" : ""
              }`}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#4338CA]">{row.keyword}</h3>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    keywordTableSentimentClasses[row.dominant]
                  }`}>
                  <i className={`${keywordSentimentIcons[row.dominant]} mr-1`}></i>
                  {row.dominant}
                </span>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">Total Mentions</span>
                <span className="text-sm font-bold text-[#111827]">
                  {keywordNumberFormatter.format(row.mentions)}
                </span>
              </div>

              <div className="mb-3 flex h-2.5 w-full overflow-hidden rounded-full">
                <span className="bg-green-600" style={{ width: `${row.positive}%` }}></span>
                <span className="bg-amber-500" style={{ width: `${row.neutral}%` }}></span>
                <span className="bg-red-600" style={{ width: `${row.negative}%` }}></span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-medium sm:text-xs">
                <span className="text-green-600">Positive {row.positive}%</span>
                <span className="text-amber-600">Neutral {row.neutral}%</span>
                <span className="text-red-600">Negative {row.negative}%</span>
              </div>

              <a
                href={`#${row.anchor}`}
                className="mt-3 inline-flex items-center text-xs font-semibold text-[#4338CA] hover:underline">
                View keyword
                <i className="fa-solid fa-chevron-right ml-1 text-[10px] text-slate-400"></i>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-2 border-t border-slate-200 pt-4">
          <p className="text-xs leading-relaxed text-slate-500">
            Click a keyword to open its detail view and related feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
