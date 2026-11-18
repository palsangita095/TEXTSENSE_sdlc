"use client";

import {
  keywordRangeOptions,
  type KeywordBarRow,
  type KeywordChartMode,
  type KeywordRange,
  type KeywordSentimentRow,
  type SentimentFilter,
} from "@/data/admin/keywords";
import KeywordSentimentAnalysis from "./KeywordSentimentAnalysis";
import MostMentionedKeywords from "./MostMentionedKeywords";

const fieldLabelClasses =
  "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500";

interface KeywordSentimentSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  range: KeywordRange;
  onRangeChange: (value: KeywordRange) => void;
  sentiment: SentimentFilter;
  onSentimentChange: (value: SentimentFilter) => void;
  chartMode: KeywordChartMode;
  onChartModeChange: (mode: KeywordChartMode) => void;
  barRows: KeywordBarRow[];
  sentimentRows: KeywordSentimentRow[];
  rangeLabel: string;
}

export default function KeywordSentimentSection({
  search,
  onSearchChange,
  range,
  onRangeChange,
  sentiment,
  onSentimentChange,
  chartMode,
  onChartModeChange,
  barRows,
  sentimentRows,
  rangeLabel,
}: KeywordSentimentSectionProps) {
  return (
    <section
      id="keywordSentiment"
      className="scroll-mt-32 px-3 pb-8 pt-2 sm:px-7 sm:pt-3 lg:px-8">
      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-end">
          <div className="mb-3 w-full pr-2 xl:mb-0 xl:min-w-0 xl:flex-1">
            <label htmlFor="keywordDetailSearch" className={fieldLabelClasses}>
              Search
            </label>

            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

              <input
                id="keywordDetailSearch"
                type="search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search keywords or topics"
                className="h-[46px] w-full min-w-0 rounded-xl border border-slate-200 bg-[#F7F8FC] pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="mb-3 w-2/3 pr-2 sm:w-1/2 xl:mb-0 xl:w-[155px] xl:shrink-0">
            <label htmlFor="keywordDateRange" className={fieldLabelClasses}>
              Date Range
            </label>

            <div className="relative">
              <i className="fa-regular fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500"></i>

              <select
                id="keywordDateRange"
                value={range}
                onChange={(event) => onRangeChange(event.target.value as KeywordRange)}
                className="h-[46px] w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-8 pr-6 text-xs font-semibold text-slate-700 outline-none focus:border-[#4338CA] sm:text-sm">
                {keywordRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <i className="fa-solid fa-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500"></i>
            </div>
          </div>

          <div className="mb-3 w-1/3 sm:w-1/2 xl:mb-0 xl:w-[110px] xl:shrink-0">
            <label
              htmlFor="keywordSentimentFilter"
              className={`${fieldLabelClasses} truncate`}>
              Sentiment
            </label>

            <select
              id="keywordSentimentFilter"
              aria-label="Filter by sentiment"
              value={sentiment}
              onChange={(event) =>
                onSentimentChange(event.target.value as SentimentFilter)
              }
              className="h-[46px] w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-[#F7F8FC] px-2 text-xs text-slate-700 outline-none focus:border-[#4338CA] sm:text-sm">
              <option value="all">All</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
      </div>

      <div className="-mx-2 flex flex-wrap items-stretch">
        <MostMentionedKeywords
          rows={barRows}
          mode={chartMode}
          onModeChange={onChartModeChange}
          rangeLabel={rangeLabel}
        />

        <KeywordSentimentAnalysis rows={sentimentRows} />
      </div>
    </section>
  );
}
