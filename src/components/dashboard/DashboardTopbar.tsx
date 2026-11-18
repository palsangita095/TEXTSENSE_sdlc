"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { dashboardNotifications } from "@/data/dashboard";
import { useDashboard } from "./dashboard-context";

interface DashboardTopbarProps {
  onOpenSidebar: () => void;
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
  onCloseNotifications: () => void;
}

export default function DashboardTopbar({
  onOpenSidebar,
  notificationsOpen,
  onToggleNotifications,
  onCloseNotifications,
}: DashboardTopbarProps) {
  const { query, setQuery } = useDashboard();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notificationsOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) {
        onCloseNotifications();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [notificationsOpen, onCloseNotifications]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex min-h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden"
            aria-label="Open sidebar">
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>

          <div className="relative w-full max-w-md">
            <label htmlFor="dashboardSearch" className="sr-only">
              Search feedback, insights or topics
            </label>

            <i
              className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"
              aria-hidden="true"></i>

            <input
              type="search"
              id="dashboardSearch"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search feedback, insights or topics..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs outline-none transition focus:border-indigo-400 focus:bg-white sm:text-sm"
            />
          </div>
        </div>

        <div className="ml-3 flex shrink-0 items-center">
          <div className="mr-3 hidden items-center rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:flex">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></span>
            System Active
          </div>

          <div ref={notificationRef} className="relative mr-3">
            <button
              type="button"
              id="notificationBtn"
              onClick={onToggleNotifications}
              aria-label="Notifications"
              aria-haspopup="true"
              aria-expanded={notificationsOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
              <i className="fa-regular fa-bell text-lg" aria-hidden="true"></i>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {notificationsOpen && (
              <div
                className="fixed left-4 right-4 top-[84px] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-80"
                aria-label="Notifications">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-bold text-slate-900">Notifications</p>
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                    3 new
                  </span>
                </div>

                <ul className="divide-y divide-slate-100">
                  {dashboardNotifications.map((notification) => (
                    <li key={notification.id} className="flex gap-3 px-4 py-3.5">
                      <span
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notification.iconClasses}`}>
                        <i
                          className={`${notification.icon} text-sm`}
                          aria-hidden="true"></i>
                      </span>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {notification.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onCloseNotifications}
                  className="w-full border-t border-slate-100 px-4 py-3 text-xs font-semibold text-indigo-600 transition hover:bg-slate-50">
                  Close notifications
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="mr-2 hidden text-right sm:block">
              <p className="text-xs font-bold text-slate-800">Alex Rivers</p>
              <p className="pt-1 text-center text-[10px] text-slate-500">User</p>
            </div>

            <Image
              src="/assets/images/auth/profile-1.jpg"
              alt="Alex Rivers profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-indigo-100 object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
