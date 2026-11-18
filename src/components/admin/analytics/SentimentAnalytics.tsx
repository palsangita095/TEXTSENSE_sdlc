"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  getRangeLabel,
  getSentimentPercentages,
  recentSentimentFeedback,
  sentimentByRange,
  sentimentRangeOptions,
  type SentimentRange,
} from "@/data/admin/sentimentAnalytics";
import { downloadCsv } from "@/lib/exportCsv";
import RecentSentimentFeedback from "./RecentSentimentFeedback";
import SentimentBreakdownCard from "./SentimentBreakdownCard";
import SentimentDistributionChart from "./SentimentDistributionChart";
import SentimentStatsCards from "./SentimentStatsCards";
import SentimentTrendsChart from "./SentimentTrendsChart";

export default function SentimentAnalytics() {
  const [range, setRange] = useState<SentimentRange>("30");

  const summary = sentimentByRange[range];
  const rangeLabel = getRangeLabel(range);

  const handleExportReport = () => {
    const percentages = getSentimentPercentages(summary);

    downloadCsv(`textsense-sentiment-report-${range}-days.csv`, [
      ["Sentiment Analytics Report"],
      ["Date Range", rangeLabel],
      ["Generated At", new Date().toLocaleString("en-US")],
      [],
      ["Metric", "Value", "Percentage"],
      ["Total Feedback Analyzed", summary.total, "100%"],
      ["Positive Sentiment", summary.positive, `${percentages.positive}%`],
      ["Neutral Sentiment", summary.neutral, `${percentages.neutral}%`],
      ["Negative Sentiment", summary.negative, `${percentages.negative}%`],
      [],
      ["Date", "Feedback", "Category", "Sentiment", "Confidence"],
      ...recentSentimentFeedback.map((row) => [
        row.date,
        row.feedback,
        row.category,
        row.sentiment,
        row.confidence,
      ]),
    ]);

    toast.success("Sentiment report exported.");
  };

  const handleExportFeedback = () => {
    downloadCsv("textsense-recent-sentiment-feedback.csv", [
      ["Date", "Feedback", "Category", "Sentiment", "Confidence"],
      ...recentSentimentFeedback.map((row) => [
        row.date,
        row.feedback,
        row.category,
        row.sentiment,
        row.confidence,
      ]),
    ]);

    toast.success("Recent feedback exported.");
  };

  return (
    <main className="min-h-screen min-w-0 flex-1 overflow-x-hidden bg-[#F6F7FB] px-4 py-6 sm:px-5 lg:px-8">
      <section className="mb-7">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">Sentiment Overview</h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Track positive, neutral and negative customer feedback.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center lg:mt-0">
            <label className="relative mr-2">
              <span className="sr-only">Date range</span>
              <select
                id="dateFilter"
                value={range}
                onChange={(event) => setRange(event.target.value as SentimentRange)}
                className="rounded-xl border border-[#E2E5EC] bg-white px-4 py-3 text-sm font-semibold text-[#111827] outline-none focus:border-[#4338CA]">
                {sentimentRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleExportReport}
              className="mt-2 rounded-xl bg-[#4338CA] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3730A3] sm:mt-0">
              <i className="fa-solid fa-download mr-2"></i>
              Export Report
            </button>
          </div>
        </div>
      </section>

      <SentimentStatsCards summary={summary} />

      <section className="mb-7">
        <div className="-mx-3 flex flex-wrap">
          <SentimentDistributionChart summary={summary} />
          <SentimentTrendsChart range={range} />
        </div>
      </section>

      <SentimentBreakdownCard summary={summary} />

      <RecentSentimentFeedback
        rows={recentSentimentFeedback}
        total={summary.total}
        onExport={handleExportFeedback}
      />
    </main>
  );
}
