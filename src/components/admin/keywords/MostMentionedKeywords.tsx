"use client";

import {
  keywordGrowthToneClasses,
  keywordNumberFormatter,
  type KeywordBarRow,
  type KeywordChartMode,
} from "@/data/admin/keywords";

interface MostMentionedKeywordsProps {
  rows: KeywordBarRow[];
  mode: KeywordChartMode;
  onModeChange: (mode: KeywordChartMode) => void;
  rangeLabel: string;
}

export default function MostMentionedKeywords({
  rows,
  mode,
  onModeChange,
  rangeLabel,
}: MostMentionedKeywordsProps) {
  const isFrequency = mode === "frequency";
  const maxMentions = rows.reduce((max, row) => Math.max(max, row.mentions), 0);
  const frequencyAxisMax = Math.max(400, Math.ceil(maxMentions / 400) * 400);
  const growthAxisMax = 20;
  const axisMax = isFrequency ? frequencyAxisMax : growthAxisMax;

  const ticks = isFrequency
    ? [0, 0.25, 0.5, 0.75, 1].map((fraction) =>
        keywordNumberFormatter.format(Math.round(fraction * frequencyAxisMax)),
      )
    : ["0%", "5%", "10%", "15%", "20%"];

  return (
    <div id="allTopics" className="mb-5 w-full scroll-mt-32 px-2 xl:mb-0 xl:w-1/2">
      <div className="h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="max-w-[250px] text-xl font-bold leading-[1.3] text-[#111827] sm:text-[22px]">
              Most Mentioned Keywords
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Top {rows.length} keyword{rows.length === 1 ? "" : "s"} · {rangeLabel}
            </p>
          </div>

          <div className="flex w-full shrink-0 items-center rounded-xl border border-slate-200 bg-[#F7F8FC] p-1 sm:w-[300px] sm:max-w-[55%]">
            <button
              type="button"
              aria-pressed={isFrequency}
              onClick={() => onModeChange("frequency")}
              className={`flex-1 rounded-lg px-2 py-1.5 text-left text-xs font-semibold leading-tight transition sm:text-sm ${
                isFrequency
                  ? "bg-[#4338CA] text-white"
                  : "text-slate-500 hover:bg-white hover:text-[#4338CA]"
              }`}>
              Keyword Frequency
            </button>

            <button
              type="button"
              aria-pressed={!isFrequency}
              onClick={() => onModeChange("growth")}
              className={`flex-1 rounded-lg px-2 py-1.5 text-left text-xs font-semibold leading-tight transition sm:text-sm ${
                !isFrequency
                  ? "bg-[#4338CA] text-white"
                  : "text-slate-500 hover:bg-white hover:text-[#4338CA]"
              }`}>
              Keyword Growth
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-xl bg-slate-50 px-4 text-center">
            <p className="text-sm text-slate-500">
              No keywords match the current search or sentiment filter.
            </p>
          </div>
        ) : (
          <div className="relative w-full">
            <div className="pointer-events-none absolute bottom-[34px] left-[105px] right-0 top-0 grid grid-cols-4 border-l border-slate-100 sm:left-[145px]">
              <div className="border-r border-slate-100"></div>
              <div className="border-r border-slate-100"></div>
              <div className="border-r border-slate-100"></div>
              <div className="border-r border-slate-100"></div>
            </div>

            {rows.map((row, index) => {
              const value = isFrequency ? row.mentions : Math.abs(row.growth);
              const width = axisMax === 0 ? 0 : Math.min(100, (value / axisMax) * 100);
              const isLast = index === rows.length - 1;
              const valueLabel = isFrequency
                ? keywordNumberFormatter.format(row.mentions)
                : `${row.growth > 0 ? "+" : ""}${row.growth}%`;

              return (
                <div
                  key={row.keyword}
                  id={row.anchor}
                  className={`relative flex scroll-mt-32 items-center ${
                    row.tooltip ? "z-20" : "z-10"
                  } ${isLast ? "mb-4" : "mb-[26px]"}`}>
                  <div className="w-[105px] shrink-0 pr-2 text-right sm:w-[145px]">
                    <span className="whitespace-nowrap text-xs font-medium text-[#111827] sm:text-sm">
                      {row.keyword}
                    </span>
                  </div>

                  <div className="relative flex min-w-0 flex-1 items-center">
                    <div
                      className="h-5 shrink-0 rounded-r-md transition-all duration-300 hover:brightness-110"
                      style={{
                        width: `${width}%`,
                        backgroundColor: row.color,
                        opacity: isFrequency ? 1 : 0.85,
                      }}
                      title={`${keywordNumberFormatter.format(row.mentions)} mentions`}
                    ></div>

                    <span
                      className={`ml-2 shrink-0 text-xs font-bold sm:text-sm ${
                        isFrequency ? "text-[#111827]" : keywordGrowthToneClasses[row.growthTone]
                      }`}>
                      {valueLabel}
                    </span>

                    {row.tooltip && (
                      <div
                        className="absolute top-[-21px] z-50 hidden w-[116px] rounded-xl bg-[#10182B] p-2.5 text-white shadow-[0_5px_15px_rgba(15,23,42,0.25)] sm:block"
                        style={{ left: `calc(${width}% + 40px)` }}>
                        <p className="text-[13px] font-semibold leading-4">{row.keyword}</p>
                        <p className="mt-0.5 text-[13px] leading-4">
                          {keywordNumberFormatter.format(row.mentions)} mentions
                        </p>
                        <p
                          className={`mt-1 flex items-center text-xs font-bold ${
                            row.growthTone === "neutral"
                              ? "text-slate-300"
                              : row.growthTone === "negative"
                                ? "text-red-500"
                                : "text-green-500"
                          }`}>
                          <i
                            className={`fa-solid ${
                              row.growth >= 0 ? "fa-arrow-trend-up" : "fa-arrow-trend-down"
                            } mr-1`}></i>
                          {row.growth > 0 ? "+" : ""}
                          {row.growth}%
                        </p>
                        <p className="mt-0.5 text-[11px] leading-3 text-slate-400">
                          vs previous period
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="ml-[105px] border-t border-slate-200 pt-2 sm:ml-[145px]">
              <div className="flex justify-between text-[10px] font-medium text-slate-400 sm:text-xs">
                {ticks.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-400">Illustrative sample data</p>
          <p className="text-xs text-slate-500">
            {isFrequency ? "Mentions per keyword" : "Growth vs previous period"}
          </p>
        </div>
      </div>
    </div>
  );
}
