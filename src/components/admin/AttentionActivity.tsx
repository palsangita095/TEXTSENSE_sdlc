"use client";

import {
  formatKeyword,
  formatNumber,
  getAnalysisCoverage,
  getStatusCounts,
} from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";

interface ActivityItem {
  icon: string;
  iconClasses: string;
  message: string;
  messageClasses: string;
  meta: string;
  metaClasses: string;
  bordered: boolean;
}

export default function AttentionActivity() {
  const analytics = useAppSeletor((state) => state.admin.analytics);
  const statusCounts = getStatusCounts(analytics);
  const pendingAnalysis = analytics?.pending_analysis ?? 0;
  const needsAttention = statusCounts.NEEDS_ATTENTION ?? 0;
  const coverage = getAnalysisCoverage(analytics);
  const topKeyword = analytics?.top_keywords?.[0];

  const activities: ActivityItem[] = analytics
    ? [
        {
          icon: "fa-solid fa-triangle-exclamation",
          iconClasses: "bg-amber-50 text-amber-500",
          message:
            pendingAnalysis > 0
              ? `${formatNumber(pendingAnalysis)} feedback items awaiting analysis`
              : "All feedback has been analyzed",
          messageClasses: pendingAnalysis > 0 ? "font-semibold" : "",
          meta: pendingAnalysis > 0 ? "Needs attention" : "Up to date",
          metaClasses:
            pendingAnalysis > 0
              ? "text-amber-600 sm:shrink-0"
              : "text-emerald-600 sm:shrink-0",
          bordered: true,
        },
        {
          icon: "fa-regular fa-flag",
          iconClasses: "bg-rose-50 text-rose-600",
          message: `${formatNumber(needsAttention)} feedback items marked needs attention`,
          messageClasses: needsAttention > 0 ? "font-semibold" : "",
          meta: "Review queue",
          metaClasses: "text-slate-500",
          bordered: true,
        },
        {
          icon: "fa-regular fa-comment-dots",
          iconClasses: "bg-violet-50 text-indigo-600",
          message: `${formatNumber(analytics.total_analyzed)} feedback records analyzed`,
          messageClasses: "",
          meta: `${coverage}% coverage`,
          metaClasses: "text-slate-500",
          bordered: true,
        },
        {
          icon: "fa-solid fa-hashtag",
          iconClasses: "bg-blue-50 text-blue-600",
          message: topKeyword
            ? `Top keyword: ${formatKeyword(topKeyword.term)}`
            : "No keyword insights available yet",
          messageClasses: "",
          meta: topKeyword
            ? `${formatNumber(topKeyword.frequency)} mentions`
            : "Awaiting analysis",
          metaClasses: "text-slate-500",
          bordered: false,
        },
      ]
    : [];

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between sm:mb-6">
        <div>
          <h3 className="text-lg font-bold">Attention &amp; Activity</h3>
          <p className="mt-1 text-sm text-slate-500">Recent updates and activities</p>
        </div>

        <span className="mt-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 sm:mt-0">
          <i className="fa-solid fa-bell mr-1"></i>Activity
        </span>
      </div>

      <div>
        {activities.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            Loading activity...
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.message}
              className={`flex min-w-0 flex-wrap items-center py-4 sm:flex-nowrap ${
                activity.bordered ? "border-b border-slate-200" : ""
              }`}>
              <span
                className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.iconClasses}`}>
                <i className={activity.icon}></i>
              </span>

              <p
                className={`min-w-0 flex-1 break-words text-sm sm:text-base ${activity.messageClasses}`}>
                {activity.message}
              </p>

              <span
                className={`ml-[52px] mt-2 w-full text-xs sm:ml-2 sm:mt-0 sm:w-auto ${activity.metaClasses}`}>
                {activity.meta}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
