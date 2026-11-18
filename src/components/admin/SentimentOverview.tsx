"use client";

import { useEffect, useRef } from "react";
import {
  formatNumber,
  getSentimentCounts,
  getSentimentPercentages,
} from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";

export default function SentimentOverview() {
  const donutRef = useRef<HTMLDivElement>(null);
  const analytics = useAppSeletor((state) => state.admin.analytics);
  const counts = getSentimentCounts(analytics);
  const percentages = getSentimentPercentages(counts);

  useEffect(() => {
    const donut = donutRef.current;
    if (!donut) return;

    donut.style.transition = "transform 1.2s ease, opacity 1.2s ease";

    const frame = requestAnimationFrame(() => {
      donut.style.transform = "scale(1)";
      donut.style.opacity = "1";
    });

    return () => cancelAnimationFrame(frame);
  }, [analytics]);

  const positiveEnd = percentages.positive;
  const neutralEnd = percentages.positive + percentages.neutral;

  const donutBackground =
    counts.total > 0
      ? `conic-gradient(#16a34a 0% ${positiveEnd}%, #f59e0b ${positiveEnd}% ${neutralEnd}%, #ef4444 ${neutralEnd}% 100%)`
      : "conic-gradient(#e2e8f0 0% 100%)";

  return (
    <div id="sentiment" className="w-full px-2 pb-4 xl:w-5/12">
      <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Sentiment Overview</h3>
          <button className="text-xl text-slate-400" aria-label="More options">
            •••
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div
            ref={donutRef}
            className="flex h-48 w-48 items-center justify-center rounded-full sm:h-52 sm:w-52"
            style={{ background: donutBackground, transform: "scale(0.5)", opacity: 0 }}>
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-center sm:h-36 sm:w-36">
              <span className="text-base font-semibold">
                {analytics ? formatNumber(counts.total) : "—"}
              </span>
              <span className="text-sm text-slate-500">Total Analyzed</span>
            </div>
          </div>

          <div className="mt-7 w-full">
            <div className="flex justify-between py-2 text-sm sm:text-base">
              <span className="text-slate-500">
                🟢 Positive{" "}
                <span className="text-xs text-slate-400">
                  ({formatNumber(counts.positive)})
                </span>
              </span>
              <b>{analytics ? `${percentages.positive}%` : "—"}</b>
            </div>

            <div className="flex justify-between py-2 text-sm sm:text-base">
              <span className="text-slate-500">
                🟠 Neutral{" "}
                <span className="text-xs text-slate-400">
                  ({formatNumber(counts.neutral)})
                </span>
              </span>
              <b>{analytics ? `${percentages.neutral}%` : "—"}</b>
            </div>

            <div className="flex justify-between py-2 text-sm sm:text-base">
              <span className="text-slate-500">
                🔴 Negative{" "}
                <span className="text-xs text-slate-400">
                  ({formatNumber(counts.negative)})
                </span>
              </span>
              <b>{analytics ? `${percentages.negative}%` : "—"}</b>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
