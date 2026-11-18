"use client";

import { formatNumber, getCategorySegments } from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";
import ProgressBar from "./ProgressBar";

export default function FeedbackCategories() {
  const analytics = useAppSeletor((state) => state.admin.analytics);
  const categories = getCategorySegments(analytics);
  const topCategory = categories[0];
  const topPercentage = topCategory?.percentage ?? 0;
  const otherPercentage = Math.max(100 - topPercentage, 0);

  const categoryStats = [
    {
      label: "Active Categories",
      value: analytics ? String(analytics.category_distribution.length).padStart(2, "0") : "—",
      wrapperClasses: "w-1/2 px-1 pb-2 sm:w-1/3",
      cardClasses: "bg-blue-50",
      valueClasses: "text-blue-700",
    },
    {
      label: "Top Category",
      value: analytics ? `${topPercentage}%` : "—",
      wrapperClasses: "w-1/2 px-1 pb-2 sm:w-1/3",
      cardClasses: "bg-emerald-50",
      valueClasses: "text-emerald-700",
    },
    {
      label: "Other Categories",
      value: analytics ? `${otherPercentage}%` : "—",
      wrapperClasses: "w-full px-1 pb-2 sm:w-1/3",
      cardClasses: "bg-purple-50",
      valueClasses: "text-purple-700",
    },
  ];

  return (
    <div id="categories" className="w-full min-w-0 px-2 pb-4 lg:w-1/2">
      <article className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">Feedback Categories</h3>
            <p className="mt-1 text-sm text-slate-500">Distribution of customer feedback</p>
          </div>

          <span className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <i className="fa-solid fa-layer-group"></i>
          </span>
        </div>

        <div className="-mx-1 mb-6 flex flex-wrap">
          {categoryStats.map((stat) => (
            <div key={stat.label} className={stat.wrapperClasses}>
              <div className={`rounded-xl p-3 ${stat.cardClasses}`}>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <h4 className={`mt-1 text-xl font-bold ${stat.valueClasses}`}>{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            {analytics ? "No category data available yet." : "Loading categories..."}
          </p>
        ) : (
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex justify-between">
                  <b className="text-sm">{category.name}</b>
                  <b className={`text-xs ${category.labelClasses}`}>
                    {category.percentage}%
                    <span className="ml-2 font-normal text-slate-400">
                      {formatNumber(category.count)}
                    </span>
                  </b>
                </div>
                <ProgressBar width={category.width} colorClass={category.colorClass} />
              </div>
            ))}
          </div>
        )}

        <p className="mt-7 border-t border-slate-100 pt-4 text-xs text-slate-400">
          <i className="fa-solid fa-circle-info mr-1"></i>
          Category percentages represent total feedback distribution
        </p>
      </article>
    </div>
  );
}
