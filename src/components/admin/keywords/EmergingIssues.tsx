import Link from "next/link";
import {
  emergingIssues,
  keywordSentimentBadgeClasses,
  keywordSentimentDots,
} from "@/data/admin/keywords";
import Sparkline from "./Sparkline";

export default function EmergingIssues() {
  return (
    <section id="emergingIssues" className="px-3 pb-8 pt-2 sm:px-7 sm:pt-3 lg:px-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
          Emerging Issues &amp; Opportunities
        </h2>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Illustrative examples based on sample data
        </p>
      </div>

      <div className="-mx-2 flex flex-wrap items-stretch">
        {emergingIssues.map((issue) => (
          <div key={issue.id} className="mb-5 w-full px-2 sm:w-1/2 lg:mb-0 lg:w-1/3">
            <div
              className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 border-t-4 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5 ${issue.accentClasses}`}>
              <div className="mb-4 flex min-w-0 items-center">
                <div
                  className={`mr-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${issue.iconClasses}`}>
                  <i className={`${issue.icon} text-xl`}></i>
                </div>

                <h3 className="min-w-0 text-base font-bold text-[#111827] sm:text-lg">
                  {issue.title}
                </h3>
              </div>

              <div className="mb-5 flex flex-wrap items-center">
                <span
                  className={`mb-1 mr-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    keywordSentimentBadgeClasses[issue.sentiment]
                  }`}>
                  <span
                    className={`mr-1.5 h-2 w-2 rounded-full ${
                      keywordSentimentDots[issue.sentiment]
                    }`}></span>
                  {issue.sentiment}
                </span>

                <span
                  className={`mb-1 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${issue.priorityClasses}`}>
                  {issue.priority}
                </span>
              </div>

              <div className="mb-4 flex min-w-0 items-center justify-between">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center text-2xl font-bold text-[#111827] sm:text-3xl">
                    <i
                      className={`${issue.statIcon} mr-2 text-base ${issue.statIconClasses}`}></i>
                    {issue.stat}
                  </div>

                  <p className="text-xs text-slate-500 sm:text-sm">{issue.statLabel}</p>
                </div>

                {issue.chartPoints && issue.chartColor && (
                  <div className="ml-2 w-24 shrink-0 sm:w-28">
                    <Sparkline
                      points={issue.chartPoints}
                      viewWidth={120}
                      viewHeight={48}
                      stroke={issue.chartColor}
                      strokeWidth={2}
                      endDot
                      className="h-12 w-full"
                    />
                  </div>
                )}
              </div>

              <p className="mb-5 text-sm leading-6 text-slate-500 sm:text-base">
                {issue.description}
              </p>

              <Link
                href={issue.ctaHref}
                className="mt-auto flex w-full items-center justify-center rounded-xl border border-[#4338CA] px-3 py-3 text-center text-sm font-semibold text-[#4338CA] transition duration-300 hover:bg-[#4338CA] hover:text-white">
                View Related Feedback
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
