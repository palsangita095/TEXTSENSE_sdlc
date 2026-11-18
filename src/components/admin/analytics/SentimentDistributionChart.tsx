"use client";

import { useState } from "react";
import {
  getDistributionSegments,
  sentimentNumberFormatter,
  type DistributionView,
  type SentimentCounts,
  type SentimentLabel,
} from "@/data/admin/sentimentAnalytics";

interface SentimentDistributionChartProps {
  summary: SentimentCounts;
}

const radius = 80;
const circumference = 2 * Math.PI * radius;

const donutColors: Record<SentimentLabel, string> = {
  Positive: "#16A34A",
  Neutral: "#E0A526",
  Negative: "#DC2626",
};

const legendColors: Record<SentimentLabel, string> = {
  Positive: "#16A34A",
  Neutral: "#94A3B8",
  Negative: "#DC2626",
};

export default function SentimentDistributionChart({
  summary,
}: SentimentDistributionChartProps) {
  const [view, setView] = useState<DistributionView>("monthly");
  const [activeLabel, setActiveLabel] = useState<SentimentLabel | null>(null);

  const segments = getDistributionSegments(summary, view);
  const activeSegment = segments.find((segment) => segment.label === activeLabel);

  const renderedSegments = segments.map((segment, index) => {
    const length = (segment.value / 100) * circumference;
    const accumulated = segments
      .slice(0, index)
      .reduce((total, item) => total + item.value, 0);
    const offset = -(accumulated / 100) * circumference;

    return { ...segment, length, offset };
  });

  const centerValue = activeSegment
    ? `${Math.round(activeSegment.value)}%`
    : sentimentNumberFormatter.format(summary.total);
  const centerLabel = activeSegment ? activeSegment.label : "Total Analyzed";

  return (
    <div className="mb-5 w-full px-3 xl:w-1/2">
      <article className="h-full rounded-2xl border border-[#E2E5EC] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">
              Sentiment Distribution
            </h3>
            <p className="mt-1 text-sm text-[#64748B] sm:text-base">
              Overall feedback distribution
            </p>
          </div>

          <label className="relative inline-flex items-center">
            <span className="sr-only">Distribution period</span>
            <select
              value={view}
              onChange={(event) => setView(event.target.value as DistributionView)}
              className="appearance-none rounded-xl border border-[#E2E5EC] bg-white py-3 pl-4 pr-10 text-sm font-semibold text-[#64748B] outline-none transition focus:border-[#4338CA]">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 text-xs text-[#64748B]"></i>
          </label>
        </div>

        <div className="relative mx-auto mt-2 h-[300px] w-full max-w-[340px] sm:h-[330px]">
          <svg
            viewBox="0 0 220 220"
            className="h-full w-full"
            role="img"
            aria-label={`Sentiment distribution: ${segments
              .map((segment) => `${segment.label} ${segment.value.toFixed(1)}%`)
              .join(", ")}`}>
            <circle cx="110" cy="110" r={radius} fill="none" stroke="#F8FAFC" strokeWidth="38" />

            {renderedSegments.map((segment) => (
              <circle
                key={segment.label}
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke={donutColors[segment.label]}
                strokeWidth={activeLabel === segment.label ? 44 : 38}
                strokeDasharray={`${segment.length} ${circumference - segment.length}`}
                strokeDashoffset={segment.offset}
                transform="rotate(-90 110 110)"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setActiveLabel(segment.label)}
                onMouseLeave={() => setActiveLabel(null)}
                onFocus={() => setActiveLabel(segment.label)}
                onBlur={() => setActiveLabel(null)}
                tabIndex={0}>
                <title>{`${segment.label}: ${segment.value.toFixed(1)}%`}</title>
              </circle>
            ))}

            <g pointerEvents="none">
              <text
                x="110"
                y="106"
                textAnchor="middle"
                fill="#111827"
                fontSize="26"
                fontWeight="700">
                {centerValue}
              </text>
              <text
                x="110"
                y="130"
                textAnchor="middle"
                fill="#64748B"
                fontSize="12"
                fontWeight="500">
                {centerLabel}
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="flex cursor-default items-center text-sm text-[#64748B]"
              onMouseEnter={() => setActiveLabel(segment.label)}
              onMouseLeave={() => setActiveLabel(null)}>
              <span
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: legendColors[segment.label] }}></span>
              {segment.label}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
