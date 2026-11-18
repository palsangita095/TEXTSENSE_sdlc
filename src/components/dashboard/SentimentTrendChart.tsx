"use client";

import { useState } from "react";
import { sentimentChartSeries, type ChartPeriod } from "@/data/dashboard";

const periods: { label: string; value: ChartPeriod }[] = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export default function SentimentTrendChart() {
  const [period, setPeriod] = useState<ChartPeriod>("month");
  const series = sentimentChartSeries[period];
  const areaPath = `${series.linePath} L580 185 L45 185 Z`;

  return (
    <div className="mb-4 w-full px-2 xl:w-7/12">
      <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Sentiment Trend</h3>
            <p className="pt-1 text-xs text-slate-500">Customer sentiment over time</p>
          </div>

          <div className="mt-3 flex rounded-lg bg-slate-100 p-1 sm:mt-0">
            {periods.map((option) => {
              const isActive = option.value === period;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPeriod(option.value)}
                  aria-pressed={isActive}
                  className={`chart-period rounded-md px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}>
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <span className="mr-2 h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
          <span className="text-xs text-slate-500">Positive sentiment</span>
        </div>

        <div className="w-full overflow-hidden">
          <svg
            id="sentimentChart"
            viewBox="0 0 600 230"
            className="h-auto w-full"
            role="img"
            aria-label={`Sentiment trend line chart for the selected ${period}`}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            <line
              x1="45"
              y1="25"
              x2="580"
              y2="25"
              stroke="#eef0f7"
              strokeDasharray="4 5"
            />
            <line
              x1="45"
              y1="65"
              x2="580"
              y2="65"
              stroke="#eef0f7"
              strokeDasharray="4 5"
            />
            <line
              x1="45"
              y1="105"
              x2="580"
              y2="105"
              stroke="#eef0f7"
              strokeDasharray="4 5"
            />
            <line
              x1="45"
              y1="145"
              x2="580"
              y2="145"
              stroke="#eef0f7"
              strokeDasharray="4 5"
            />
            <line
              x1="45"
              y1="185"
              x2="580"
              y2="185"
              stroke="#eef0f7"
              strokeDasharray="4 5"
            />

            <g fill="#94a3b8" fontSize="10">
              <text x="8" y="29">
                100
              </text>
              <text x="14" y="69">
                80
              </text>
              <text x="14" y="109">
                60
              </text>
              <text x="14" y="149">
                40
              </text>
              <text x="14" y="189">
                20
              </text>
            </g>

            <path
              id="chartArea"
              className="chart-area"
              d={areaPath}
              fill="url(#chartGradient)"
            />

            <path
              id="chartLine"
              className="chart-line"
              d={series.linePath}
              fill="none"
              stroke="#4f6ee8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g
              id="chartPoints"
              fill="#ffffff"
              stroke="#4f6ee8"
              strokeWidth="3">
              {series.points.map((point) => (
                <circle
                  key={point.label}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                />
              ))}
            </g>

            <g
              id="chartLabels"
              fill="#94a3b8"
              fontSize="10"
              textAnchor="middle">
              {series.points.map((point) => (
                <text key={point.label} x={point.x} y="215">
                  {point.label}
                </text>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
