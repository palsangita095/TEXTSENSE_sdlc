"use client";

import { getKeywordSegments } from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";
import ProgressBar from "./ProgressBar";

export default function TopKeywords() {
  const analytics = useAppSeletor((state) => state.admin.analytics);
  const keywords = getKeywordSegments(analytics);

  return (
    <div id="keywords" className="w-full min-w-0 px-2 pb-4 lg:w-1/2">
      <article className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">Top Keywords</h3>
            <p className="mt-1 text-sm text-slate-500">
              Most frequently mentioned words in feedback
            </p>
          </div>

          <span className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
            <i className="fa-solid fa-chart-simple"></i>
          </span>
        </div>

        {keywords.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            {analytics ? "No keywords have been extracted yet." : "Loading keywords..."}
          </p>
        ) : (
          <div className="space-y-6">
            {keywords.map((keyword) => (
              <div key={keyword.label}>
                <div className="mb-2 flex justify-between">
                  <div>
                    <b className="text-sm">{keyword.label}</b>
                    <p className="text-xs text-slate-400">{keyword.description}</p>
                  </div>
                  <b className="text-sm">{keyword.count}</b>
                </div>
                <ProgressBar width={keyword.width} colorClass="bg-indigo-600" />
              </div>
            ))}
          </div>
        )}

        <p className="mt-7 border-t border-slate-100 pt-4 text-xs text-slate-400">
          <i className="fa-solid fa-circle-info mr-1"></i>
          Based on analysed customer feedback
        </p>
      </article>
    </div>
  );
}
