import {
  getSentimentPercentages,
  sentimentNumberFormatter,
  type SentimentCounts,
} from "@/data/admin/sentimentAnalytics";

interface SentimentBreakdownCardProps {
  summary: SentimentCounts;
}

export default function SentimentBreakdownCard({ summary }: SentimentBreakdownCardProps) {
  const percentages = getSentimentPercentages(summary);

  const rows = [
    {
      label: "Positive",
      count: summary.positive,
      percentage: percentages.positive,
      dotClasses: "bg-[#16A34A]",
      textClasses: "text-[#16A34A]",
      barClasses: "bg-[#16A34A]",
    },
    {
      label: "Neutral",
      count: summary.neutral,
      percentage: percentages.neutral,
      dotClasses: "bg-[#94A3B8]",
      textClasses: "text-[#64748B]",
      barClasses: "bg-[#94A3B8]",
    },
    {
      label: "Negative",
      count: summary.negative,
      percentage: percentages.negative,
      dotClasses: "bg-[#DC2626]",
      textClasses: "text-[#DC2626]",
      barClasses: "bg-[#DC2626]",
    },
  ];

  return (
    <section className="mb-7 rounded-2xl border border-[#E2E5EC] bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827] sm:text-xl">Sentiment Breakdown</h3>
        <p className="mt-1 text-sm text-[#64748B]">
          Detailed analysis of customer feedback
        </p>
      </div>

      {rows.map((row, index) => (
        <div key={row.label} className={index < rows.length - 1 ? "mb-6" : ""}>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className={`mr-3 h-3 w-3 rounded-full ${row.dotClasses}`}></span>
              <span className="text-sm font-semibold text-[#111827]">{row.label}</span>
            </div>

            <span className={`text-sm font-bold ${row.textClasses}`}>{row.percentage}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-[#F1F5F9]">
            <div
              className={`h-full rounded-full transition-[width] duration-500 ${row.barClasses}`}
              style={{ width: `${row.percentage}%` }}
              role="progressbar"
              aria-label={`${row.label} sentiment`}
              aria-valuenow={row.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <p className="mt-2 text-xs text-[#64748B]">
            {sentimentNumberFormatter.format(row.count)} {row.label.toLowerCase()} feedback messages
          </p>
        </div>
      ))}
    </section>
  );
}
