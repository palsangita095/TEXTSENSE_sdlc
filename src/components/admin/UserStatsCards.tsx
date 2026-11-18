interface StatCard {
  label: string;
  value: string;
  icon: string;
  iconClasses: string;
  trend: string;
  trendClasses: string;
  trendIcon: string;
}

const statCards: StatCard[] = [
  {
    label: "Total Users",
    value: "2,480",
    icon: "fa-solid fa-users",
    iconClasses: "bg-blue-100 text-blue-600",
    trend: "12.5% from last month",
    trendClasses: "text-emerald-600",
    trendIcon: "fa-solid fa-arrow-up",
  },
  {
    label: "Active Users",
    value: "2,156",
    icon: "fa-solid fa-user-check",
    iconClasses: "bg-emerald-100 text-emerald-600",
    trend: "8.2% from last month",
    trendClasses: "text-emerald-600",
    trendIcon: "fa-solid fa-arrow-up",
  },
  {
    label: "New Users This Month",
    value: "184",
    icon: "fa-solid fa-user-plus",
    iconClasses: "bg-purple-100 text-purple-600",
    trend: "15.3% from last month",
    trendClasses: "text-emerald-600",
    trendIcon: "fa-solid fa-arrow-up",
  },
  {
    label: "Suspended Users",
    value: "24",
    icon: "fa-solid fa-user-slash",
    iconClasses: "bg-red-100 text-red-600",
    trend: "3.1% from last month",
    trendClasses: "text-red-600",
    trendIcon: "fa-solid fa-arrow-down",
  },
];

export default function UserStatsCards() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>

                <h3 className="mt-3 text-2xl font-bold text-slate-800">{card.value}</h3>

                <p className={`mt-2 text-xs font-semibold ${card.trendClasses}`}>
                  <i className={`${card.trendIcon} mr-1`}></i>
                  {card.trend}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconClasses}`}>
                <i className={`${card.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}