"use client";

import Link from "next/link";
import useHasMounted from "@/hooks/useHasMounted";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import { fetchAdminAnalytics } from "@/store/slices/admin.slice";

export default function WelcomeSection() {
  const dispatch = useAppDispatch();
  const hasMounted = useHasMounted();
  const user = useAppSeletor((state) => state.auth.user);
  const isLoading = useAppSeletor((state) => state.admin.isLoading);
  const lastFetchedAt = useAppSeletor((state) => state.admin.lastFetchedAt);

  const adminName = (hasMounted && user?.name?.trim()) || "Admin";
  const updatedLabel = lastFetchedAt
    ? `Last updated ${new Date(lastFetchedAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`
    : "Loading live analytics...";

  return (
    <section className="mb-8 flex flex-col items-start justify-between xl:flex-row xl:items-center">
      <div className="mb-5 xl:mb-0">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
          Welcome back, {adminName}
        </h2>

        <p className="mt-3 max-w-[560px] text-sm leading-6 text-slate-500 sm:text-base">
          Monitor customer feedback, discover sentiment patterns and manage platform activity
          from one place.
        </p>

        <p className="mt-2 text-xs text-slate-400">{updatedLabel}</p>
      </div>

      <div className="flex w-full flex-wrap items-center xl:w-auto">
        <span className="mb-2 mr-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm">
          <i className="fa-solid fa-calendar-day mr-2 text-slate-500"></i>
          All time
        </span>

        <button
          type="button"
          onClick={() => dispatch(fetchAdminAnalytics())}
          disabled={isLoading}
          className="mb-2 mr-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-60">
          <i className={`fa-solid fa-rotate-right mr-2 ${isLoading ? "fa-spin" : ""}`}></i>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>

        <Link
          href="/admin/feedback"
          className="mb-2 inline-flex items-center rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-900 sm:px-5">
          View All Feedback
          <i className="fa-solid fa-arrow-right ml-3"></i>
        </Link>
      </div>
    </section>
  );
}
