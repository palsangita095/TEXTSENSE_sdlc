"use client";

import { useState } from "react";
import {
  sentimentPalette,
  sentimentTrendSeries,
  type SentimentLabel,
  type SentimentRange,
} from "@/data/admin/sentimentAnalytics";

interface SentimentTrendsChartProps {
  range: SentimentRange;
}

type TrendKey = "positive" | "neutral" | "negative";

interface ChartPoint {
  x: number;
  y: number;
}

const chartWidth = 700;
const chartHeight = 400;
const padding = { top: 20, right: 30, bottom: 52, left: 58 };
const plotWidth = chartWidth - padding.left - padding.right;
const plotHeight = chartHeight - padding.top - padding.bottom;
const yTicks = Array.from({ length: 11 }, (_, index) => 100 - index * 10);

const seriesMeta: { key: TrendKey; label: SentimentLabel; color: string }[] = [
  { key: "positive", label: "Positive", color: sentimentPalette.Positive.color },
  { key: "neutral", label: "Neutral", color: sentimentPalette.Neutral.color },
  { key: "negative", label: "Negative", color: sentimentPalette.Negative.color },
];

function buildSmoothPath(points: ChartPoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x} ${points[0].y}`;

  let path = `M${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const current = points[index];
    const next = points[index + 1];
    const afterNext = points[index + 2] ?? next;

    const control1X = current.x + (next.x - previous.x) / 6;
    const control1Y = current.y + (next.y - previous.y) / 6;
    const control2X = next.x - (afterNext.x - current.x) / 6;
    const control2Y = next.y - (afterNext.y - current.y) / 6;

    path += ` C${control1X} ${control1Y} ${control2X} ${control2Y} ${next.x} ${next.y}`;
  }

  return path;
}

export default function SentimentTrendsChart({ range }: SentimentTrendsChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = sentimentTrendSeries[range];
  const columnWidth = plotWidth / Math.max(data.length, 1);

  const xForIndex = (index: number) =>
    padding.left + (data.length === 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth);
  const yForValue = (value: number) =>
    padding.top + ((100 - value) / 100) * plotHeight;

  const seriesPoints = seriesMeta.map((series) => ({
    ...series,
    points: data.map((point, index) => ({
      x: xForIndex(index),
      y: yForValue(point[series.key]),
    })),
  }));

  const positivePoints = seriesPoints[0].points;
  const positiveLine = buildSmoothPath(positivePoints);
  const plotBottom = padding.top + plotHeight;
  const positiveArea = `${positiveLine} L${positivePoints[positivePoints.length - 1].x} ${plotBottom} L${positivePoints[0].x} ${plotBottom} Z`;

  const activePoint = activeIndex === null ? null : data[activeIndex];
  const activeX = activeIndex === null ? 0 : xForIndex(activeIndex);
  const activeY =
    activeIndex === null
      ? 0
      : Math.min(...seriesMeta.map((series) => yForValue(data[activeIndex][series.key])));

  const tooltipWidth = 188;
  const tooltipHeight = 96;
  const tooltipX = Math.min(
    Math.max(activeX - tooltipWidth / 2, padding.left),
    chartWidth - padding.right - tooltipWidth,
  );
  const tooltipY = Math.max(activeY - tooltipHeight - 14, padding.top + 4);

  return (
    <div className="mb-5 w-full px-3 xl:w-1/2">
      <article className="h-full rounded-2xl border border-[#E2E5EC] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#111827] sm:text-2xl">Sentiment Trends</h3>
          <p className="mt-1 text-sm text-[#64748B] sm:text-base">
            Sentiment changes over time
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="h-[320px] w-full min-w-[360px] sm:h-[350px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="h-full w-full"
              role="img"
              aria-label={`Sentiment trends for the selected ${range} day range`}
              onMouseLeave={() => setActiveIndex(null)}>
              <defs>
                <linearGradient id="positiveAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sentimentPalette.Positive.color} stopOpacity="0.16" />
                  <stop offset="100%" stopColor={sentimentPalette.Positive.color} stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {yTicks.map((tick) => {
                const y = yForValue(tick);

                return (
                  <g key={tick}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#E8ECF2"
                    />
                    <text
                      x={padding.left - 12}
                      y={y + 5}
                      textAnchor="end"
                      fill="#64748B"
                      fontSize="16">
                      {tick}%
                    </text>
                  </g>
                );
              })}

              <path d={positiveArea} fill="url(#positiveAreaGradient)" />

              {seriesPoints.map((series, index) => (
                <path
                  key={`${range}-${series.key}`}
                  d={buildSmoothPath(series.points)}
                  fill="none"
                  stroke={series.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                  strokeDasharray="100"
                  strokeDashoffset="100">
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur="1.4s"
                    begin={`${index * 0.15}s`}
                    fill="freeze"
                  />
                </path>
              ))}

              {data.map((point, index) => (
                <rect
                  key={`hover-${point.label}`}
                  x={xForIndex(index) - columnWidth / 2}
                  y={padding.top}
                  width={columnWidth}
                  height={plotHeight}
                  fill="transparent"
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}

              <g pointerEvents="none">
                {seriesPoints.map((series) =>
                  series.points.map((point, index) => (
                    <circle
                      key={`${series.key}-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r={activeIndex === index ? 7 : 5.5}
                      fill="#FFFFFF"
                      stroke={series.color}
                      strokeWidth="2.5"
                    />
                  )),
                )}
              </g>

              <g pointerEvents="none">
                {data.map((point, index) => (
                  <text
                    key={`label-${point.label}`}
                    x={xForIndex(index)}
                    y={chartHeight - 16}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="16">
                    {point.label}
                  </text>
                ))}
              </g>

              {activeIndex !== null && (
                <g pointerEvents="none">
                  <line
                    x1={activeX}
                    y1={padding.top}
                    x2={activeX}
                    y2={plotBottom}
                    stroke="#CBD5E1"
                    strokeDasharray="3 4"
                  />

                  <rect
                    x={tooltipX}
                    y={tooltipY}
                    width={tooltipWidth}
                    height={tooltipHeight}
                    rx="10"
                    fill="#111827"
                    opacity="0.96"
                  />
                  <text
                    x={tooltipX + 12}
                    y={tooltipY + 21}
                    fill="#F8FAFC"
                    fontSize="13"
                    fontWeight="700">
                    {activePoint?.label}
                  </text>

                  {activePoint &&
                    seriesMeta.map((series, index) => (
                      <g key={series.key}>
                        <circle
                          cx={tooltipX + 16}
                          cy={tooltipY + 42 + index * 17}
                          r="3.5"
                          fill={series.color}
                        />
                        <text
                          x={tooltipX + 27}
                          y={tooltipY + 46 + index * 17}
                          fill="#CBD5E1"
                          fontSize="12">
                          {series.label}
                        </text>
                        <text
                          x={tooltipX + tooltipWidth - 12}
                          y={tooltipY + 46 + index * 17}
                          textAnchor="end"
                          fill="#F8FAFC"
                          fontSize="12"
                          fontWeight="700">
                          {activePoint[series.key]}%
                        </text>
                      </g>
                    ))}
                </g>
              )}
            </svg>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[#475569]">
          {seriesMeta.map((series) => (
            <span key={series.label} className="flex items-center">
              <span
                className="mr-2 h-[18px] w-[18px] rounded-full border-2 bg-white"
                style={{ borderColor: series.color }}></span>
              {series.label}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
