"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onSubmitFeedback: () => void;
}

const linkBase =
  "flex w-full items-center rounded-xl px-4 py-3 text-sm transition";
const activeLink =
  "bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-950/30";
const inactiveLink =
  "font-medium text-slate-300 hover:bg-white/10 hover:text-white";

export default function DashboardSidebar({
  open,
  onClose,
  onOpenNotifications,
  onOpenProfile,
  onSubmitFeedback,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const dashboardActive = pathname === "/dashboard";

  return (
    <aside
      id="sidebar"
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 -translate-x-full flex-col bg-[#10152F] text-white shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
        open ? "translate-x-0" : ""
      }`}>
      <div className="flex h-[76px] shrink-0 items-center border-b border-white/10 px-5">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex min-w-0 items-center">
          <Image
            src="/assets/images/home_page/small-logo.png"
            alt="TEXTSENSE Logo"
            width={56}
            height={56}
            priority
            className="mr-1 mt-2 h-14 w-14 shrink-0 rounded-xl object-contain"
          />

          <span className="text-lg font-extrabold tracking-wider text-white">TEXTSENSE</span>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Close sidebar">
          <i className="fa-solid fa-xmark text-lg" aria-hidden="true"></i>
        </button>
      </div>

      <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          <Link
            href="/dashboard#dashboard"
            onClick={onClose}
            aria-current={dashboardActive ? "page" : undefined}
            className={`sidebar-link ${linkBase} ${
              dashboardActive ? activeLink : inactiveLink
            }`}>
            <i
              className={`fa-solid fa-house mr-2 w-6 text-base ${
                dashboardActive ? "" : "text-slate-400"
              }`}
              aria-hidden="true"></i>
            <span>Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSubmitFeedback();
            }}
            className={`sidebar-link ${linkBase} ${inactiveLink}`}>
            <i
              className="fa-solid fa-plus mr-2 w-6 text-base text-slate-400"
              aria-hidden="true"></i>
            <span>Submit Feedback</span>
          </button>

          <a
            href="#feedback-history"
            onClick={onClose}
            className={`sidebar-link ${linkBase} ${inactiveLink}`}>
            <i
              className="fa-regular fa-clock mr-2 w-6 text-base text-slate-400"
              aria-hidden="true"></i>
            <span>Feedback History</span>
          </a>

          <a
            href="#analytics"
            onClick={onClose}
            className={`sidebar-link ${linkBase} ${inactiveLink}`}>
            <i
              className="fa-solid fa-chart-line mr-2 w-6 text-base text-slate-400"
              aria-hidden="true"></i>
            <span>Analytics</span>
          </a>
        </nav>

        <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Account
        </p>

        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenProfile();
            }}
            className={`sidebar-link ${linkBase} ${inactiveLink}`}>
            <i
              className="fa-regular fa-user mr-2 w-6 text-base text-slate-400"
              aria-hidden="true"></i>
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenNotifications();
            }}
            className={`sidebar-link ${linkBase} ${inactiveLink} justify-between`}>
            <span className="flex items-center">
              <i
                className="fa-regular fa-bell mr-2 w-6 text-base text-slate-400"
                aria-hidden="true"></i>
              Notifications
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        </nav>
      </div>

      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Free Plan</span>
            <i className="fa-solid fa-crown text-amber-400" aria-hidden="true"></i>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-300">
            Upgrade to unlock more powerful insights.
          </p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-3/5 rounded-full bg-emerald-400"></div>
          </div>

          <p className="mt-2 text-[10px] text-slate-400">150 of 250 analyses used</p>

          <Link
            href="/#pricing"
            onClick={onClose}
            className="mt-4 flex items-center justify-center rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-50">
            Upgrade Plan
            <i
              className="fa-solid fa-arrow-up-right-from-square ml-2"
              aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </aside>
  );
}
