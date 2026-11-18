"use client";

import {
  keywordChangeIcons,
  keywordChangeToneClasses,
  keywordNumberFormatter,
  keywordSentimentBadgeClasses,
  keywordSentimentIcons,
  type TrendingTopic,
} from "@/data/admin/keywords";
import Sparkline from "./Sparkline";

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  rangeLabel: string;
  totalMentions: number;
  changePercent: number;
  hasFilters: boolean;
  onResetFilters: () => void;
}

export default function TrendingTopics({
  topics,
  rangeLabel,
  totalMentions,
  changePercent,
  hasFilters,
  onResetFilters,
}: TrendingTopicsProps) {
  const trendIsUp = changePercent >= 0;
  const changeClasses =
    totalMentions === 0
      ? "bg-slate-100 text-slate-500"
      : trendIsUp
        ? "bg-green-50 text-green-600"
        : "bg-red-50 text-red-500";

  return (
    <section id="trendingTopics" className="mt-1 px-3 pb-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Trending Topics</h2>
          <p className="mt-1 text-sm text-slate-500">Top topics · {rangeLabel}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="sm:text-right">
            <h3 className="text-2xl font-bold text-[#111827]">
              {keywordNumberFormatter.format(totalMentions)}
            </h3>
            <p className="text-xs text-slate-500">Total mentions</p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${changeClasses}`}>
            <i
              className={`fa-solid ${
                trendIsUp ? "fa-arrow-trend-up" : "fa-arrow-trend-down"
              } mr-1`}></i>
            {trendIsUp ? "+" : ""}
            {changePercent.toFixed(1)}%
          </span>

          <svg
            viewBox="0 0 120 35"
            className="h-9 w-24 sm:w-32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true">
            <rect x="0" y="7" width="120" height="28" fill="#E5F3EE" />
            <path
              d="M2 18 L20 17 L38 16 L55 13 L72 14 L90 11 L108 12 L118 11"
              stroke="#16A34A"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <a
            href="#allTopics"
            className="flex shrink-0 items-center gap-2 border-l border-slate-200 pl-3 text-sm font-semibold text-[#4338CA] transition hover:text-indigo-700 sm:pl-4">
            View all
            <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
          </a>
        </div>
      </div>

      <div className="-mx-2 flex flex-wrap">
        {topics.length === 0 && (
          <div className="mb-4 w-full px-2">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No trending topics match your filters.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try a different keyword, sentiment or category.
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-4 rounded-xl bg-[#4338CA] px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Reset filters
              </button>
            </div>
          </div>
        )}

        {topics.map((topic, index) => {
          const changeIcon = keywordChangeIcons[topic.trend];

          return (
            <div key={topic.id} className="mb-4 w-full px-2 sm:w-1/2 xl:w-1/3">
              <div className="group h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_12px_30px_rgba(67,56,202,0.10)] sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <i className={`${topic.icon} text-lg`}></i>
                    </div>

                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-slate-400">#{index + 1}</span>
                      <h3 className="min-w-0 break-words text-sm font-bold leading-tight text-[#111827] sm:text-base">
                        {topic.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                      keywordSentimentBadgeClasses[topic.sentiment]
                    }`}>
                    <i className={`${keywordSentimentIcons[topic.sentiment]} mr-1`}></i>
                    {topic.sentiment}
                  </span>
                </div>

                <div className="mb-4 flex items-end justify-between gap-2">
                  <div>
                    <h2 className="text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
                      {keywordNumberFormatter.format(topic.mentions)}
                    </h2>
                    <p className="text-sm text-slate-500">mentions</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end">
                    <span
                      className={`mb-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        keywordChangeToneClasses[topic.changeTone]
                      }`}>
                      {changeIcon && <i className={`${changeIcon} mr-1`}></i>}
                      {topic.changeLabel}
                    </span>

                    <Sparkline
                      points={topic.sparkline}
                      stroke="#4338CA"
                      fill
                      fillOpacity={0.08}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
                  <p className="whitespace-nowrap text-xs text-slate-500 sm:text-sm">
                    Related feedback:{" "}
                    <span className="font-bold text-[#111827]">
                      {keywordNumberFormatter.format(topic.relatedFeedback)}
                    </span>
                  </p>

                  <a
                    href={`#${topic.anchor}`}
                    className="shrink-0 whitespace-nowrap text-xs font-semibold text-[#4338CA] transition hover:text-indigo-700 sm:text-sm">
                    View Topic Details
                    <i className="fa-solid fa-chevron-right ml-1 text-xs text-slate-400"></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasFilters && topics.length > 0 && (
        <p className="mt-1 text-xs text-slate-400">
          Showing {topics.length} of 6 topics for the selected filters ·{" "}
          <button
            type="button"
            onClick={onResetFilters}
            className="font-semibold text-[#4338CA] hover:underline">
            Clear filters
          </button>
        </p>
      )}
    </section>
  );
}
