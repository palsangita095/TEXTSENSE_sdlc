"use client";

import { useEffect, useRef, useState } from "react";
import {
  keywordCategoryOptions,
  keywordSentimentOptions,
  keywordSortOptions,
  topicRangeOptions,
  type SentimentFilter,
  type TopicRange,
  type TopicSort,
} from "@/data/admin/keywords";

const fieldLabelClasses =
  "mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500";

interface KeywordFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  range: TopicRange;
  onRangeChange: (value: TopicRange) => void;
  sentiment: SentimentFilter;
  onSentimentChange: (value: SentimentFilter) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: TopicSort;
  onSortChange: (value: TopicSort) => void;
  onExport: (format: "csv" | "json") => void;
}

export default function KeywordFilters({
  search,
  onSearchChange,
  range,
  onRangeChange,
  sentiment,
  onSentimentChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  onExport,
}: KeywordFiltersProps) {
  const [exportOpen, setExportOpen] = useState<boolean>(false);
  const exportWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!exportWrapRef.current?.contains(event.target as Node)) {
        setExportOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const handleExport = (format: "csv" | "json") => {
    onExport(format);
    setExportOpen(false);
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="-mx-1 flex flex-wrap items-end">
        <div className="mb-3 w-full px-1 sm:w-1/2 xl:mb-0 xl:w-[22%]">
          <label htmlFor="keywordSearch" className={fieldLabelClasses}>
            Search
          </label>

          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

            <input
              id="keywordSearch"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search keywords or topics"
              className="h-[42px] w-full min-w-0 rounded-xl border border-slate-200 bg-[#F7F8FC] pl-10 pr-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#4338CA] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="mb-3 w-full px-1 sm:w-1/2 xl:mb-0 xl:w-[14%]">
          <label htmlFor="dateRange" className={fieldLabelClasses}>
            Date Range
          </label>

          <div className="relative">
            <i className="fa-regular fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500"></i>

            <select
              id="dateRange"
              value={range}
              onChange={(event) => onRangeChange(event.target.value as TopicRange)}
              className="h-[42px] w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-8 pr-6 text-xs font-semibold text-slate-700 outline-none focus:border-[#4338CA] sm:text-sm">
              {topicRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500"></i>
          </div>
        </div>

        <div className="mb-3 w-full px-1 xl:mb-0 xl:w-[23%]">
          <span className={fieldLabelClasses}>Sentiment</span>

          <div
            id="sentimentFilters"
            className="scrollbar-hide flex min-h-[42px] w-full items-center justify-between gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-[#F7F8FC] p-1">
            {keywordSentimentOptions.map((option) => {
              const isActive = sentiment === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSentimentChange(option.value)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-xs transition sm:text-sm ${
                    isActive
                      ? "bg-[#4338CA] font-semibold text-white shadow-sm"
                      : `font-medium text-slate-500 hover:bg-white ${option.hoverClasses}`
                  }`}>
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-3 w-1/2 px-1 xl:mb-0 xl:w-[13%]">
          <label htmlFor="categoryFilter" className={fieldLabelClasses}>
            Category
          </label>

          <div className="relative">
            <select
              id="categoryFilter"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="h-[42px] w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-2 pr-6 text-xs font-semibold text-slate-700 outline-none focus:border-[#4338CA] sm:text-sm">
              {keywordCategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500"></i>
          </div>
        </div>

        <div className="mb-3 w-1/2 px-1 xl:mb-0 xl:w-[14%]">
          <label htmlFor="sortBy" className={fieldLabelClasses}>
            Sort By
          </label>

          <div className="relative">
            <i className="fa-solid fa-arrow-trend-down absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-red-500"></i>

            <select
              id="sortBy"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as TopicSort)}
              className="h-[42px] w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-5 pr-5 text-xs font-semibold text-slate-700 outline-none focus:border-[#4338CA] sm:text-sm">
              {keywordSortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-500"></i>
          </div>
        </div>

        <div className="mb-0 w-full px-1 sm:w-full xl:w-[14%]">
          <span className={fieldLabelClasses}>Actions</span>

          <div ref={exportWrapRef} className="relative">
            <button
              type="button"
              onClick={() => setExportOpen((value) => !value)}
              aria-haspopup="menu"
              aria-expanded={exportOpen}
              className="flex h-[42px] w-full items-center justify-between rounded-xl bg-[#4338CA] px-3 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-700 hover:shadow-md">
              <span className="flex min-w-0 items-center">
                <i className="fa-solid fa-download mr-2 shrink-0"></i>
                <span>Export Data</span>
              </span>

              <i
                className={`fa-solid fa-chevron-down ml-2 shrink-0 text-[10px] transition-transform duration-300 ${
                  exportOpen ? "rotate-180" : ""
                }`}></i>
            </button>

            <div
              role="menu"
              className={`absolute right-0 top-full z-50 mt-2 w-full min-w-[170px] rounded-xl border border-slate-100 bg-white p-2 shadow-lg ${
                exportOpen ? "" : "hidden"
              }`}>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleExport("csv")}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100">
                <i className="fa-solid fa-file-csv mr-2 text-[#4338CA]"></i>
                Export as CSV
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => handleExport("json")}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100">
                <i className="fa-solid fa-file-code mr-2 text-[#4338CA]"></i>
                Export as JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
