"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import { fetchAdminAnalytics } from "@/store/slices/admin.slice";
import AttentionActivity from "./AttentionActivity";
import FeedbackCategories from "./FeedbackCategories";
import FeedbackTable from "./FeedbackTable";
import FeedbackTrends from "./FeedbackTrends";
import SentimentOverview from "./SentimentOverview";
import SummaryCards from "./SummaryCards";
import TopKeywords from "./TopKeywords";
import UIStates from "./UIStates";
import WelcomeSection from "./WelcomeSection";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const error = useAppSeletor((state) => state.admin.error);
  const isLoading = useAppSeletor((state) => state.admin.isLoading);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchAdminAnalytics());
  };

  return (
    <main id="overview" className="min-w-0">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">
        <WelcomeSection />

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p>
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              disabled={isLoading}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? "Retrying..." : "Retry"}
            </button>
          </div>
        )}

        <SummaryCards />

        <section className="-mx-2 mb-8 flex flex-wrap">
          <SentimentOverview />
          <FeedbackTrends />
        </section>

        <FeedbackTable />

        <section className="-mx-2 mb-8 flex flex-wrap">
          <TopKeywords />
          <FeedbackCategories />
        </section>

        <AttentionActivity />

        <UIStates />
      </div>
    </main>
  );
}
