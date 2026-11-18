import Link from "next/link";
import {
  sentimentNumberFormatter,
  sentimentPalette,
  type RecentSentimentFeedbackItem,
} from "@/data/admin/sentimentAnalytics";

interface RecentSentimentFeedbackProps {
  rows: RecentSentimentFeedbackItem[];
  total: number;
  onExport: () => void;
}

export default function RecentSentimentFeedback({
  rows,
  total,
  onExport,
}: RecentSentimentFeedbackProps) {
  return (
    <section className="mb-7 overflow-hidden rounded-2xl border border-[#E2E5EC] bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-col justify-between lg:flex-row lg:items-center">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-lg font-bold text-[#111827] sm:text-xl">
            Recent Sentiment Feedback
          </h3>
          <p className="text-sm text-[#64748B]">Latest analyzed customer feedback</p>
        </div>

        <button
          type="button"
          onClick={onExport}
          className="rounded-xl border border-[#E2E5EC] px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:border-[#4338CA] hover:bg-[#F5F3FF]">
          <i className="fa-solid fa-download mr-2 text-[#64748B]"></i>
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="bg-[#F6F7FB] text-sm text-[#64748B]">
              <th className="rounded-l-xl px-3 py-4 font-semibold">Date</th>
              <th className="px-3 py-4 font-semibold">Feedback</th>
              <th className="px-3 py-4 font-semibold">Category</th>
              <th className="px-3 py-4 font-semibold">Sentiment</th>
              <th className="rounded-r-xl px-3 py-4 font-semibold">Confidence</th>
            </tr>
          </thead>

          <tbody className="text-sm text-[#111827]">
            {rows.map((row, index) => {
              const styles = sentimentPalette[row.sentiment];

              return (
                <tr
                  key={row.id}
                  className={`transition hover:bg-[#F8FAFC] ${
                    index < rows.length - 1 ? "border-b border-[#E2E5EC]" : ""
                  }`}>
                  <td className="whitespace-nowrap px-3 py-5 text-[#64748B]">{row.date}</td>
                  <td className="max-w-[250px] px-3 py-5 leading-5">{row.feedback}</td>
                  <td className="px-3 py-5">{row.category}</td>
                  <td className="px-3 py-5">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${styles.badgeClasses}`}>
                      {row.sentiment}
                    </span>
                  </td>
                  <td className={`px-3 py-5 font-semibold ${styles.textClasses}`}>
                    {row.confidence}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col justify-between sm:flex-row sm:items-center">
        <p className="mb-3 text-sm text-[#64748B] sm:mb-0">
          Showing {rows.length} of {sentimentNumberFormatter.format(total)} feedback items
        </p>

        <Link
          href="/admin/feedback"
          className="text-sm font-semibold text-[#4338CA] transition hover:text-[#3125A8]">
          View all feedback
          <i className="fa-solid fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </section>
  );
}
