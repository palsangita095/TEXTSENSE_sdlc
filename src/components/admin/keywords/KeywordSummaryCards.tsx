import { keywordSummaryCards } from "@/data/admin/keywords";

export default function KeywordSummaryCards() {
  return (
    <div className="-mx-3 flex flex-wrap">
      {keywordSummaryCards.map((card) => (
        <div key={card.id} className="mb-6 w-full px-3 sm:w-1/2 xl:w-1/4">
          <div className="h-[252px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_12px_30px_rgba(67,56,202,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClasses}`}>
                <i className={`${card.icon} text-xl`}></i>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${card.badgeClasses}`}>
                {card.badgeIcon && <i className={`${card.badgeIcon} mr-1`}></i>}
                {card.badge}
              </span>
            </div>

            <h2 className={`mb-1 font-bold leading-tight text-[#111827] ${card.valueClasses}`}>
              {card.valueLines
                ? card.valueLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < card.valueLines!.length - 1 && <br />}
                    </span>
                  ))
                : card.value}
            </h2>

            <p className="text-base font-semibold text-slate-900">{card.label}</p>
            <p className="mt-1 text-base text-slate-500">{card.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
