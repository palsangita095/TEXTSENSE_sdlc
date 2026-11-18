"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
import { useAppSeletor } from "@/services/helpers/redux";

const pageMeta: Record<
  string,
  { breadcrumb: string; title: string; subtitle?: string }
> = {
  "/admin/dashboard": { breadcrumb: "Dashboard / Overview", title: "Dashboard Overview" },
  "/admin/users": { breadcrumb: "Users / Management", title: "User Management" },
  "/admin/profile": {
    breadcrumb: "Admin / User Management / Daniel Okafor",
    title: "User Profile",
    subtitle: "View account details, feedback activity and admin controls.",
  },
  "/admin/settings": { breadcrumb: "System / Settings", title: "System Settings" },
  "/admin/analytics": {
    breadcrumb: "Admin / Analytics / Sentiment Analytics",
    title: "Sentiment Analytics",
    subtitle: "Monitor customer opinions and understand feedback sentiment.",
  },
  "/admin/keywords": {
    breadcrumb: "Admin / Keywords & Topics",
    title: "Keywords & Topics",
  },
  "/admin/feedback": { breadcrumb: "Dashboard / Feedback", title: "Feedback Management" },
};

interface HeaderProps {
  onOpenSidebar: () => void;
  onLogout: () => void;
}

export default function Header({ onOpenSidebar, onLogout }: HeaderProps) {
  const pathname = usePathname();
  const hasMounted = useHasMounted();
  const user = useAppSeletor((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownWrapRef = useRef<HTMLDivElement>(null);

  const meta = pageMeta[pathname] ?? pageMeta["/admin/dashboard"];
  const currentUser = hasMounted ? user : null;
  const displayName = currentUser?.name?.trim() || "Admin User";
  const roleLabel =
    currentUser?.role === "SUPER_USER"
      ? "Super Admin"
      : currentUser?.role === "REACT_ADMIN"
        ? "Admin"
        : currentUser?.role === "REACT_USER"
          ? "User"
          : "Super Admin";

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!dropdownWrapRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-[76px] w-full flex-wrap items-center justify-between px-3 py-3 sm:px-6 xl:px-8">
        <div className="flex min-w-0 items-center">
          <button
            onClick={onOpenSidebar}
            className="mr-3 rounded-lg px-3 py-2 text-lg text-slate-700 lg:hidden"
            aria-label="Open sidebar">
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="min-w-0">
            <p className="text-xs text-slate-500 sm:text-sm">{meta.breadcrumb}</p>
            <h2 className="truncate text-lg font-bold sm:text-2xl">{meta.title}</h2>
            {meta.subtitle && (
              <p className="mt-0.5 hidden truncate text-xs text-slate-500 sm:block">
                {meta.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3 flex w-full flex-wrap items-center sm:mt-0 sm:w-auto">
          <label className="relative mb-2 mr-2 min-w-0 flex-1 sm:mb-0 sm:w-56 sm:flex-none lg:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input
              type="search"
              placeholder={
                pathname === "/admin/analytics"
                  ? "Search analytics..."
                  : "Search feedback, users..."
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-indigo-500"
            />
          </label>

          <button
            className="relative mb-2 mr-2 rounded-xl border border-slate-200 px-4 py-3 text-slate-500 sm:mb-0"
            aria-label="Notifications">
            <i className="fa-regular fa-bell"></i>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div ref={dropdownWrapRef} className="relative hidden items-center border-l border-slate-200 pl-4 md:flex">
            <button
              type="button"
              onClick={() => setDropdownOpen((value) => !value)}
              className="flex items-center">
              <Image
                src="/assets/images/modal_page/modal-logo.jpg"
                alt="Admin avatar"
                width={40}
                height={40}
                className="mr-3 h-10 w-10 rounded-full object-cover"
              />

              <div className="text-left">
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-slate-500">{roleLabel}</p>
              </div>

              <i
                className={`fa-solid fa-chevron-down ml-4 text-slate-500 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}></i>
            </button>

            <div
              className={`absolute right-0 top-full z-50 mt-3 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow-lg ${
                dropdownOpen ? "" : "hidden"
              }`}>
              <Link
                href="/admin/profile"
                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i className="fa-solid fa-user mr-2"></i> My Profile
              </Link>

              <Link
                href="/admin/settings"
                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i className="fa-solid fa-gear mr-2"></i> Settings
              </Link>

              <button
                type="button"
                onClick={onLogout}
                className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100">
                <i className="fa-solid fa-right-from-bracket mr-2"></i> Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
