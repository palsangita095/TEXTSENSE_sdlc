import { dashboardStats } from "@/data/dashboard";

export default function StatsCards() {
  return (
    <div className="mb-8 flex flex-wrap -mx-2">
      {dashboardStats.map((card) => (
        <div
          key={card.id}
          className="mb-4 w-full px-2 sm:w-1/2 xl:w-1/4">
          <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconClasses}`}>
                <i className={card.icon} aria-hidden="true"></i>
              </span>

              <span className={card.trendClasses}>
                {card.trendIcon && (
                  <i className={`${card.trendIcon} mr-1`} aria-hidden="true"></i>
                )}
                {card.trend}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-500">{card.label}</p>

            <h3 className="pt-2 text-2xl font-extrabold text-slate-900">
              {card.value}
              {card.valueSuffix && (
                <>
                  {" "}
                  <span className="text-sm font-medium text-slate-400">
                    {card.valueSuffix}
                  </span>
                </>
              )}
            </h3>

            <p className="pt-2 text-[11px] text-slate-400">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
