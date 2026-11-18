import { profileStats } from "@/data/admin/profile";

export default function ProfileStatsCards() {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {profileStats.map((stat) => (
        <article
          key={stat.id}
          className="flex h-full flex-col rounded-2xl border border-[#E2E5EC] bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg ${stat.iconWrapClasses}`}>
              <i className={stat.icon}></i>
            </span>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${stat.trendClasses}`}>
              <i className={`${stat.trendIcon} mr-1`}></i>
              {stat.trend}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-1.5">
            <p className="text-4xl font-bold leading-none text-[#0F172A]">
              {stat.value}
            </p>

            {stat.extra && (
              <span className={`pb-0.5 text-base font-semibold ${stat.extraClasses}`}>
                {stat.extra}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-5 text-[#64748B] sm:text-base">
            {stat.label}
          </p>

          <div className="mt-auto pt-4">
            <svg
              className="h-9 w-full"
              viewBox="0 0 96 40"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true">
              <path d={stat.areaPath} fill={stat.fill} />
              <path
                d={stat.linePath}
                stroke={stat.stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </article>
      ))}
    </div>
  );
}
