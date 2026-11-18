"use client";

import { useMemo } from "react";
import { dashboardTopics } from "@/data/dashboard";
import { useDashboard } from "./dashboard-context";

export default function TopicDiscovery() {
  const { query } = useDashboard();

  const topics = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return dashboardTopics;

    return dashboardTopics.filter((topic) =>
      [topic.title, topic.description, topic.status, topic.trend]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [query]);

  return (
    <div className="mb-4 w-full px-2 xl:w-5/12">
      <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900">Topic Discovery</h3>
          <p className="pt-1 text-xs text-slate-500">
            Popular topics from customer feedback
          </p>
        </div>

        {topics.length === 0 ? (
          <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
            <p className="text-xs font-medium text-slate-500">
              No topics match your search.
            </p>
          </div>
        ) : (
          topics.map((topic, index) => (
            <div
              key={topic.id}
              className={
                index < topics.length - 1
                  ? "border-b border-slate-100 py-4 first:pt-0"
                  : "py-4"
              }>
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${topic.statusClasses}`}>
                  {topic.status}
                </span>

                <span className={`text-xs font-semibold ${topic.statusClasses}`}>
                  {topic.trendIcon && (
                    <i className={`${topic.trendIcon} mr-1`} aria-hidden="true"></i>
                  )}
                  {topic.trend}
                </span>
              </div>

              <h4 className="pt-2 text-sm font-bold text-slate-800">{topic.title}</h4>

              <p className="pt-1 text-xs leading-5 text-slate-500">
                {topic.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
