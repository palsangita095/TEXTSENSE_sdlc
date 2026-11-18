"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  extraClass?: string;
}

const mainNav: NavItem[] = [
  { label: "Overview", href: "/admin/dashboard", icon: "fa-solid fa-chart-pie" },
  { label: "Feedback Management", href: "/admin/feedback", icon: "fa-regular fa-comment-dots" },
  { label: "User Management", href: "/admin/users", icon: "fa-regular fa-user" },
  { label: "Sentiment Analytics", href: "/admin/analytics", icon: "fa-solid fa-face-smile" },
  { label: "Keywords & Topics", href: "/admin/keywords", icon: "fa-solid fa-hashtag" },
  { label: "Categories", href: "/admin/dashboard#categories", icon: "fa-solid fa-layer-group" },
  {
    label: "Content / Articles",
    href: "/admin/articles",
    icon: "fa-regular fa-file-lines",
    extraClass: "mb-5",
  },
];

const systemNav: NavItem[] = [
  { label: "Reports", href: "#reports", icon: "fa-solid fa-chart-bar" },
  { label: "Notifications", href: "#notifications", icon: "fa-regular fa-bell" },
  { label: "System Settings", href: "#settings", icon: "fa-solid fa-gear" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({ open, onClose, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!dropdownWrapRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href;
    const classes = `mb-1 flex items-center rounded-xl px-4 py-3 ${
      isActive ? "bg-[#4338CA] font-semibold text-white" : "text-slate-300 hover:bg-white/10"
    } ${item.extraClass ?? ""}`;

    const content = (
      <>
        <i className={`${item.icon} mr-3 w-5 text-center`}></i>
        {item.label}
      </>
    );

    if (item.href.startsWith("#")) {
      return (
        <a key={item.label} href={item.href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <Link key={item.label} href={item.href} className={classes} onClick={onClose}>
        {content}
      </Link>
    );
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${open ? "" : "hidden"}`}></div>

      <aside
        className={`admin-scroll fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] max-w-[85vw] flex-col overflow-y-auto bg-[#10152F] px-4 pb-4 pt-4 text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:max-w-none lg:shrink-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex min-w-0 items-center">
            <Image
              src="/assets/images/home_page/small-logo.png"
              alt="TEXTSENSE Logo"
              width={48}
              height={48}
              className="mr-1 mt-2 h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold tracking-wide">TEXTSENSE</span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-300 lg:hidden"
            aria-label="Close sidebar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[.2em] text-slate-500">
          Main
        </p>

        <nav className="text-sm sm:text-[15px]">
          <div>
            {mainNav.map(renderNavItem)}

            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[.2em] text-slate-500">
              System
            </p>

            {systemNav.map(renderNavItem)}
          </div>
        </nav>

        <div ref={dropdownWrapRef} className="relative mt-auto border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => setDropdownOpen((value) => !value)}
            className="flex w-full items-center px-2 text-left">
            <Image
              src="/assets/images/modal_page/modal-logo.jpg"
              alt="Admin avatar"
              width={40}
              height={40}
              className="mr-3 h-10 w-10 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>

            <i
              className={`fa-solid fa-chevron-down ml-auto text-slate-400 transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}></i>
          </button>

          <div
            className={`absolute bottom-full left-0 z-50 mb-2 w-full rounded-lg bg-[#1E293B] p-2 shadow-lg ${
              dropdownOpen ? "" : "hidden"
            }`}>
            <Link
              href="/admin/profile"
              onClick={onClose}
              className="block rounded-md px-4 py-2 text-sm text-white hover:bg-white/10">
              <i className="fa-solid fa-user mr-2"></i> My Profile
            </Link>

            <Link
              href="/admin/settings"
              onClick={onClose}
              className="block rounded-md px-4 py-2 text-sm text-white hover:bg-white/10">
              <i className="fa-solid fa-gear mr-2"></i> Settings
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10">
              <i className="fa-solid fa-right-from-bracket mr-2"></i> Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
