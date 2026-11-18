import { monthlyFeedback, profileStats } from "@/data/admin/profile";

const legend = [
  {
    id: "positive",
    label: "Positive",
    dotClasses: "bg-[#16A34A]",
    barClasses: "bg-[#16A34A]",
  },
  {
    id: "neutral",
    label: "Neutral",
    dotClasses: "bg-[#94A3B8]",
    barClasses: "bg-[#94A3B8]",
  },
  {
    id: "negative",
    label: "Negative",
    dotClasses: "bg-[#DC2626]",
    barClasses: "bg-[#DC2626]",
  },
].map((item) => {
  const stat = profileStats.find((entry) => entry.id === item.id);

  return {
    ...item,
    count: stat?.value ?? "0",
    percentage: stat?.extra?.replace(/[()]/g, "") ?? "0%",
  };
});

export default function SentimentBreakdown() {
  return (
    <section className="mb-6 rounded-2xl border border-[#E2E5EC] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
          Sentiment breakdown
        </h2>

        <button
          type="button"
          className="inline-flex items-center rounded-xl border border-[#E2E5EC] bg-white px-4 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]">
          Last 6 months
          <i className="fa-solid fa-chevron-down ml-3 text-xs"></i>
        </button>
      </div>

      <div className="mb-5 flex h-4 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
        {legend.map((item) => (
          <div
            key={item.id}
            style={{ width: item.percentage }}
            className={`h-full ${item.barClasses}`}></div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-[#EEF1F6] pb-6">
        {legend.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center text-sm text-[#475569] sm:text-base">
            <span className={`mr-2 h-2.5 w-2.5 rounded-full ${item.dotClasses}`}></span>
            {item.label}
            <span className="ml-2 font-semibold text-[#334155]">
              {item.count} · {item.percentage}
            </span>
          </span>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h3 className="text-lg font-bold text-[#0F172A] sm:text-xl">
          Monthly feedback
        </h3>
        <p className="text-sm text-[#64748B]">May – Oct 2024</p>
      </div>

      <div className="mt-6 flex justify-between gap-3 sm:gap-6">
        {monthlyFeedback.map((month) => (
          <div key={month.month} className="flex flex-1 flex-col items-center">
            <span className="mb-2 text-sm font-semibold text-[#334155]">
              {month.count}
            </span>

            <div className="flex h-44 w-full items-end justify-center sm:h-52">
              <div
                style={{ height: `${month.height}%` }}
                className={`w-full max-w-16 rounded-t-lg transition duration-300 hover:opacity-80 ${
                  month.highlighted ? "bg-[#4338CA]" : "bg-[#C7D2FE]"
                }`}></div>
            </div>

            <span
              className={`mt-3 text-sm ${
                month.highlighted
                  ? "font-semibold text-[#334155]"
                  : "text-[#64748B]"
              }`}>
              {month.month}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
