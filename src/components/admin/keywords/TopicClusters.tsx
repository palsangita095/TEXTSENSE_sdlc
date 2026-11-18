import {
  keywordNumberFormatter,
  keywordSentimentBadgeClasses,
  keywordSentimentDots,
  topicClusters,
} from "@/data/admin/keywords";

export default function TopicClusters() {
  return (
    <section id="topicClusters" className="px-3 pb-8 pt-2 sm:px-6 sm:pt-3 lg:px-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-[#111827]">Topic Clusters</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
          Related keywords grouped into themes · click a cluster to open its topic detail
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-6 shadow-sm sm:px-5 sm:py-7 lg:px-7">
        <div className="relative z-20 mx-auto flex w-fit items-center justify-center rounded-xl bg-[#4338CA] px-4 py-3 text-sm font-bold text-white shadow-[0_5px_12px_rgba(67,56,202,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-indigo-700 sm:px-5 sm:text-base">
          <i className="fa-solid fa-comments mr-2"></i>
          <span>Customer Feedback</span>
        </div>

        <div className="relative mx-auto mb-5 mt-6 hidden h-6 w-3/4 xl:block">
          <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-[#C5D3E6]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C5D3E6]"></div>
        </div>

        <div className="-mx-2 flex flex-wrap items-stretch">
          {topicClusters.map((cluster) => (
            <div
              key={cluster.id}
              id={`cluster-${cluster.id}`}
              className="mb-5 w-full px-2 sm:w-1/2 xl:mb-0 xl:w-1/4">
              <div className="relative flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_12px_25px_rgba(67,56,202,0.10)]">
                <div className="absolute -top-6 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-[#C5D3E6] xl:block"></div>

                <div className="mb-3 flex min-w-0 items-center">
                  <div className="mr-2.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEECFF] text-[#4338CA]">
                    <i className={`${cluster.icon} text-lg`}></i>
                  </div>

                  <div className="min-w-0">
                    <h3 className="whitespace-nowrap text-[13px] font-bold leading-tight text-[#111827] sm:text-sm">
                      {cluster.title}
                    </h3>
                    <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
                      {keywordNumberFormatter.format(cluster.mentions)} total mentions
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                      keywordSentimentBadgeClasses[cluster.sentiment]
                    }`}>
                    <span
                      className={`mr-1.5 h-2 w-2 rounded-full ${
                        keywordSentimentDots[cluster.sentiment]
                      }`}></span>
                    {cluster.sentiment}
                  </span>
                </div>

                <div className="mb-3">
                  {cluster.keywords.map((keyword, index) => (
                    <div
                      key={keyword.label}
                      className={`flex min-w-0 items-center justify-between rounded-lg border border-slate-200 bg-[#F7F8FC] px-3 py-2 text-[13px] transition hover:border-indigo-200 hover:bg-indigo-50/50 sm:text-sm ${
                        index === cluster.keywords.length - 1 ? "" : "mb-2"
                      }`}>
                      <span className="min-w-0 truncate text-[#111827]">{keyword.label}</span>
                      <span className="ml-2 shrink-0 font-bold text-[#111827]">
                        {keywordNumberFormatter.format(keyword.count)}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={`#${cluster.anchor}`}
                  className="mt-auto inline-flex items-center text-sm font-semibold text-[#4338CA] transition hover:text-indigo-700">
                  Open topic
                  <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-1 hidden h-7 max-w-[50%] xl:block">
          <div className="absolute bottom-0 left-0 right-0 border-t-2 border-dashed border-[#C5D3E6]"></div>
          <div className="absolute left-0 top-0 h-7 border-l-2 border-dashed border-[#C5D3E6]"></div>
          <div className="absolute right-0 top-0 h-7 border-r-2 border-dashed border-[#C5D3E6]"></div>

          <div className="absolute bottom-[-12px] left-1/2 z-10 flex -translate-x-1/2 items-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
            <i className="fa-solid fa-link mr-1.5 text-[10px]"></i>
            Often co-occur
          </div>
        </div>
      </div>
    </section>
  );
}
