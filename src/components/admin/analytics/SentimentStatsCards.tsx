import {
  getSentimentPercentages,
  sentimentNumberFormatter,
  sentimentStatTrends,
  type SentimentCounts,
} from "@/data/admin/sentimentAnalytics";

interface SentimentStatsCardsProps {
  summary: SentimentCounts;
}

export default function SentimentStatsCards({ summary }: SentimentStatsCardsProps) {
  const percentages = getSentimentPercentages(summary);

  const cards = [
    {
      label: "Total Feedback Analyzed",
      value: sentimentNumberFormatter.format(summary.total),
      suffix: null,
      suffixClasses: "",
      icon: "fa-solid fa-comments",
      iconClasses: "bg-[#EAF0FF] text-[#2563EB]",
      trend: sentimentStatTrends.total,
      caption: "Compared to previous period",
    },
    {
      label: "Positive Sentiment",
      value: sentimentNumberFormatter.format(summary.positive),
      suffix: `(${percentages.positive}%)`,
      suffixClasses: "text-[#16A34A]",
      icon: "fa-regular fa-face-smile",
      iconClasses: "bg-[#ECFDF3] text-[#16A34A]",
      trend: sentimentStatTrends.positive,
      caption: "Customer satisfaction",
    },
    {
      label: "Neutral Sentiment",
      value: sentimentNumberFormatter.format(summary.neutral),
      suffix: `(${percentages.neutral}%)`,
      suffixClasses: "text-[#64748B]",
      icon: "fa-solid fa-face-meh",
      iconClasses: "bg-[#EFEDFF] text-[#4338CA]",
      trend: sentimentStatTrends.neutral,
      caption: "Neutral customer opinions",
    },
    {
      label: "Negative Sentiment",
      value: sentimentNumberFormatter.format(summary.negative),
      suffix: `(${percentages.negative}%)`,
      suffixClasses: "text-[#DC2626]",
      icon: "fa-regular fa-face-frown",
      iconClasses: "bg-[#FEF2F2] text-[#DC2626]",
      trend: sentimentStatTrends.negative,
      caption: "Needs attention",
    },
  ];

  return (
    <section className="mb-7">
      <div className="-mx-2 flex flex-wrap">
        {cards.map((card) => (
          <div key={card.label} className="mb-4 w-full px-2 sm:w-1/2 xl:w-1/4">
            <article className="h-full rounded-2xl border border-[#E2E5EC] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${card.iconClasses}`}>
                  <i className={card.icon}></i>
                </div>

                <span
                  className={`rounded-full px-3 py-2 text-xs font-bold ${card.trend.classes}`}>
                  {card.trend.icon && <i className={`${card.trend.icon} mr-1`}></i>}
                  {card.trend.value}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-[#111827]">
                {card.value}
                {card.suffix && (
                  <span className={`ml-1 text-base ${card.suffixClasses}`}>{card.suffix}</span>
                )}
              </h3>

              <p className="mt-1 text-sm text-[#64748B]">{card.label}</p>
              <p className="mt-4 text-xs text-[#94A3B8]">{card.caption}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
