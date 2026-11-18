"use client";

import { useRef } from "react";
import useChartDrawIn from "@/hooks/useChartDrawIn";

export default function FeedbackTrends() {
  const chartRef = useRef<HTMLDivElement>(null);
  useChartDrawIn(chartRef);

  return (
    <div ref={chartRef} className="w-full min-w-0 px-2 pb-4 xl:w-7/12">
      <article className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
        <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <h3 className="mb-3 text-lg font-semibold sm:mb-0">Feedback Trends</h3>

          <button className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs shadow-sm sm:w-auto">
            <i className="fa-solid fa-calendar-day mr-2"></i>
            Last 8 weeks
            <i className="fa-solid fa-chevron-down ml-2"></i>
          </button>
        </div>

        <div className="w-full min-w-0 overflow-x-auto">
          <svg viewBox="0 0 620 250" className="block h-auto w-full min-w-[500px] sm:min-w-0">
            <g stroke="#e8edf5">
              <line x1="45" y1="30" x2="600" y2="30" />
              <line x1="45" y1="75" x2="600" y2="75" />
              <line x1="45" y1="120" x2="600" y2="120" />
              <line x1="45" y1="165" x2="600" y2="165" />
              <line x1="45" y1="210" x2="600" y2="210" />
            </g>

            <g fill="#71829c" fontSize="11">
              <text x="12" y="34">800</text>
              <text x="12" y="79">600</text>
              <text x="12" y="124">400</text>
              <text x="12" y="169">200</text>
              <text x="22" y="214">0</text>
              <text x="43" y="229">Wk 1</text>
              <text x="116" y="229">Wk 2</text>
              <text x="189" y="229">Wk 3</text>
              <text x="262" y="229">Wk 4</text>
              <text x="335" y="229">Wk 5</text>
              <text x="408" y="229">Wk 6</text>
              <text x="481" y="229">Wk 7</text>
              <text x="554" y="229">Wk 8</text>
            </g>

            <g className="animate-pulse">
              <path
                d="M45 70 Q82 61 118 56 T191 49 T264 53 T337 40 T410 29 T483 23 T600 9 L600 210 L45 210 Z"
                fill="#16a34a"
                opacity=".06"
              />

              <path
                d="M45 70 Q82 61 118 56 T191 49 T264 53 T337 40 T410 29 T483 23 T600 9"
                fill="none"
                stroke="#16a34a"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M45 167 Q82 170 118 169 T191 164 T264 171 T337 167 T410 170 T483 172 T600 174"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M45 180 Q82 176 118 179 T191 182 T264 178 T337 185 T410 186 T483 188 T600 190"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        <div className="mt-6 flex flex-wrap text-xs text-slate-500 sm:mt-8">
          <span className="mb-2 mr-4">🟢 Positive</span>
          <span className="mb-2 mr-4">🟠 Neutral</span>
          <span className="mb-2">🔴 Negative</span>
        </div>
      </article>
    </div>
  );
}
