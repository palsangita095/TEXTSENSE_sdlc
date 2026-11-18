"use client";

import {
  formatNumber,
  getSentimentCounts,
  getStatusCounts,
} from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";

interface FeedbackStat {
  label: string;
  value: string;
  icon: string;
  iconBoxClasses: string;
  trend: string;
  trendClasses: string;
  showTrendIcon: boolean;
}

export default function FeedbackStatsCards() {
  const analytics = useAppSeletor((state) => state.admin.analytics);
  const feedbacks = useAppSeletor((state) => state.admin.feedbacks);

  const sentimentCounts = getSentimentCounts(analytics);
  const statusCounts = getStatusCounts(analytics);

  const total = analytics?.total_feedback ?? feedbacks.length;
  const positive = sentimentCounts.positive;
  const negative = sentimentCounts.negative;
  const analyzed = analytics?.total_analyzed ?? 0;
  const pending =
    analytics !== null
      ? statusCounts.PENDING ?? 0
      : feedbacks.filter((feedback) => feedback.status === "PENDING").length;

  const statCards: FeedbackStat[] = [
    {
      label: "Total Feedback",
      value: formatNumber(total),
      icon: "fa-solid fa-comments",
      iconBoxClasses: "bg-blue-100 text-blue-600",
      trend: "Live feedback records",
      trendClasses: "text-gray-500",
      showTrendIcon: false,
    },
    {
      label: "Positive Feedback",
      value: analytics !== null ? formatNumber(positive) : "—",
      icon: "fa-solid fa-face-smile",
      iconBoxClasses: "bg-green-100 text-green-600",
      trend:
        analytics !== null
          ? `${formatNumber(analyzed)} feedback analyzed`
          : "Analysis not loaded",
      trendClasses: "text-gray-500",
      showTrendIcon: false,
    },
    {
      label: "Negative Feedback",
      value: analytics !== null ? formatNumber(negative) : "—",
      icon: "fa-solid fa-face-frown",
      iconBoxClasses: "bg-red-100 text-red-600",
      trend:
        analytics !== null
          ? `${formatNumber(analyzed)} feedback analyzed`
          : "Analysis not loaded",
      trendClasses: "text-gray-500",
      showTrendIcon: false,
    },
    {
      label: "Pending Review",
      value: formatNumber(pending),
      icon: "fa-solid fa-clock",
      iconBoxClasses: "bg-yellow-100 text-yellow-600",
      trend: "Awaiting review",
      trendClasses: "text-gray-500",
      showTrendIcon: false,
    },
  ];

  return (
    <section className="mb-8">
      <div className="-mx-2 flex flex-wrap">
        {statCards.map((card) => (
          <div key={card.label} className="w-full px-2 sm:w-1/2 xl:w-1/4">
            <div className="mb-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-800">{card.value}</h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.iconBoxClasses}`}>
                  <i className={`${card.icon} text-xl`}></i>
                </div>
              </div>

              <p className={`mt-3 text-xs ${card.trendClasses}`}>
                {card.showTrendIcon && <i className="fa-solid fa-arrow-up"></i>}
                {card.showTrendIcon ? " " : ""}
                {card.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
