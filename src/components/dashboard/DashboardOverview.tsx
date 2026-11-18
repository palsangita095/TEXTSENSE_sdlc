"use client";

import RecentSignals from "./RecentSignals";
import SentimentTrendChart from "./SentimentTrendChart";
import StatsCards from "./StatsCards";
import TopicDiscovery from "./TopicDiscovery";
import { useDashboard } from "./dashboard-context";

export default function DashboardOverview() {
  const { openSubmitFeedback } = useDashboard();

  return (
    <main>
      <div id="dashboard" className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        <div className="container mx-auto w-full max-w-7xl">
          <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Overview
              </p>

              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Feedback Overview
              </h3>

              <p className="pt-2 text-sm leading-6 text-slate-500">
                Welcome back! Here&apos;s what&apos;s happening with your customer
                signals today.
              </p>
            </div>

            <button
              type="button"
              onClick={openSubmitFeedback}
              className="mt-5 inline-flex items-center justify-center self-start rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 sm:mt-0 sm:self-auto">
              <i className="fa-solid fa-plus mr-2" aria-hidden="true"></i>
              Submit New Feedback
            </button>
          </div>

          <StatsCards />

          <section id="analytics" className="mb-8 flex flex-wrap -mx-2">
            <SentimentTrendChart />
            <TopicDiscovery />
          </section>

          <RecentSignals />
        </div>
      </div>
    </main>
  );
}
