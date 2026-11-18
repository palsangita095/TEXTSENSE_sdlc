"use client";

import { formatNumber } from "@/services/helpers/admin.helper";
import { useAppSeletor } from "@/services/helpers/redux";

interface ArticleStat {
  label: string;
  value: string;
  icon: string;
  iconBoxClasses: string;
  detail: string;
}

export default function ArticleStatsCards() {
  const articles = useAppSeletor((state) => state.content.articles);
  const isLoading = useAppSeletor((state) => state.content.isLoading);

  const total = articles.length;
  const published = articles.filter((article) => article.status === "PUBLISHED").length;
  const drafts = articles.filter((article) => article.status === "DRAFT").length;
  const seoReady = articles.filter(
    (article) => article.meta_title.trim() && article.meta_description.trim(),
  ).length;
  const publishedPercent = total === 0 ? 0 : Math.round((published / total) * 100);
  const seoPercent = total === 0 ? 0 : Math.round((seoReady / total) * 100);

  const statCards: ArticleStat[] = [
    {
      label: "Total Articles",
      value: isLoading && total === 0 ? "—" : formatNumber(total),
      icon: "fa-regular fa-file-lines",
      iconBoxClasses: "bg-blue-100 text-blue-600",
      detail: "All content in the workspace",
    },
    {
      label: "Published",
      value: isLoading && total === 0 ? "—" : formatNumber(published),
      icon: "fa-solid fa-circle-check",
      iconBoxClasses: "bg-emerald-100 text-emerald-600",
      detail: `${publishedPercent}% of your library is live`,
    },
    {
      label: "Drafts",
      value: isLoading && total === 0 ? "—" : formatNumber(drafts),
      icon: "fa-solid fa-pen-ruler",
      iconBoxClasses: "bg-amber-100 text-amber-600",
      detail: drafts === 0 ? "No drafts waiting" : "Waiting to be published",
    },
    {
      label: "SEO Ready",
      value: isLoading && total === 0 ? "—" : formatNumber(seoReady),
      icon: "fa-solid fa-magnifying-glass",
      iconBoxClasses: "bg-indigo-100 text-indigo-600",
      detail: `${seoPercent}% of articles have complete metadata`,
    },
  ];

  return (
    <section className="mb-6">
      <div className="-mx-2 flex flex-wrap">
        {statCards.map((card) => (
          <div key={card.label} className="w-full px-2 sm:w-1/2 xl:w-1/4">
            <div className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">{card.value}</h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBoxClasses}`}>
                  <i className={`${card.icon} text-xl`}></i>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">{card.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
