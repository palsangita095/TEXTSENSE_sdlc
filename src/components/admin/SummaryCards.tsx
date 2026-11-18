"use client";

import { useRef } from "react";
import useChartDrawIn from "@/hooks/useChartDrawIn";
import {
  formatNumber,
  getAnalysisCoverage,
  getSentimentCounts,
  getSentimentPercentages,
} from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";

interface SummaryCard {
  icon: string;
  iconClasses: string;
  trend: string;
  trendClasses: string;
  value: string;
  label: string;
  color: string;
  area: string;
  points: string;
}

const sparklines = [
  {
    color: "#4f46e5",
    area: "M0 29 L20 24 L40 27 L60 19 L80 22 L100 15 L120 9 L140 12 L160 5 L180 8 L220 0 L220 34 L0 34 Z",
    points: "0,29 20,24 40,27 60,19 80,22 100,15 120,9 140,12 160,5 180,8 220,0",
  },
  {
    color: "#2563eb",
    area: "M0 27 L20 23 L40 23 L60 18 L80 14 L100 18 L120 10 L140 5 L160 9 L180 1 L200 0 L220 4 L220 34 L0 34 Z",
    points: "0,27 20,23 40,23 60,18 80,14 100,18 120,10 140,5 160,9 180,1 200,0 220,4",
  },
  {
    color: "#16a34a",
    area: "M0 9 L30 8 L60 9 L90 7 L120 5 L150 6 L180 4 L220 5 L220 34 L0 34 Z",
    points: "0,9 30,8 60,9 90,7 120,5 150,6 180,4 220,5",
  },
  {
    color: "#ef4444",
    area: "M0 5 L20 8 L40 10 L60 7 L80 13 L100 10 L120 13 L140 16 L160 13 L180 16 L200 13 L220 16 L220 34 L0 34 Z",
    points: "0,5 20,8 40,10 60,7 80,13 100,10 120,13 140,16 160,13 180,16 200,13 220,16",
  },
];

export default function SummaryCards() {
  const sectionRef = useRef<HTMLElement>(null);
  useChartDrawIn(sectionRef);

  const analytics = useAppSeletor((state) => state.admin.analytics);
  const counts = getSentimentCounts(analytics);
  const percentages = getSentimentPercentages(counts);
  const coverage = getAnalysisCoverage(analytics);

  const summaryCards: SummaryCard[] = [
    {
      icon: "fa-regular fa-comment-dots",
      iconClasses: "bg-violet-50 text-violet-600",
      trend: analytics ? `${formatNumber(analytics.pending_analysis)} pending` : "—",
      trendClasses:
        analytics && analytics.pending_analysis > 0
          ? "bg-amber-50 text-amber-600"
          : "bg-green-50 text-green-600",
      value: analytics ? formatNumber(analytics.total_feedback) : "—",
      label: "Total Feedback",
      ...sparklines[0],
    },
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      iconClasses: "bg-blue-50 text-blue-600",
      trend: analytics ? `${coverage}% analyzed` : "—",
      trendClasses: "bg-green-50 text-green-600",
      value: analytics ? formatNumber(analytics.total_analyzed) : "—",
      label: "Analyzed Feedback",
      ...sparklines[1],
    },
    {
      icon: "fa-regular fa-face-smile",
      iconClasses: "bg-green-50 text-green-600",
      trend: analytics ? `${formatNumber(counts.positive)} mentions` : "—",
      trendClasses: "bg-green-50 text-green-600",
      value: analytics ? `${percentages.positive}%` : "—",
      label: "Positive Feedback",
      ...sparklines[2],
    },
    {
      icon: "fa-solid fa-triangle-exclamation",
      iconClasses: "bg-red-50 text-red-600",
      trend: analytics ? `${formatNumber(counts.negative)} mentions` : "—",
      trendClasses: "bg-red-50 text-red-600",
      value: analytics ? `${percentages.negative}%` : "—",
      label: "Negative Feedback",
      ...sparklines[3],
    },
  ];

  return (
    <section ref={sectionRef} className="-mx-2 mb-8 flex flex-wrap">
      {summaryCards.map((card) => (
        <div key={card.label} className="w-full px-2 pb-4 sm:w-1/2 xl:w-1/4">
          <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${card.iconClasses}`}>
                <i className={card.icon}></i>
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${card.trendClasses}`}>
                {card.trend}
              </span>
            </div>

            <p className="mt-6 text-2xl font-bold sm:text-3xl">{card.value}</p>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">{card.label}</p>

            <svg className="mt-4 h-9 w-full" viewBox="0 0 220 34" preserveAspectRatio="none">
              <path d={card.area} fill={card.color} opacity=".08" />
              <polyline points={card.points} fill="none" stroke={card.color} strokeWidth="2" />
            </svg>
          </article>
        </div>
      ))}
    </section>
  );
}
