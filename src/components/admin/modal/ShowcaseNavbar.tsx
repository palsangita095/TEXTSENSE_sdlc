"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinkClasses =
  "mb-3 rounded-lg px-3 py-2 text-sm font-semibold transition sm:mb-0 sm:mr-3";

export default function ShowcaseNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = (href: string, extraClasses = "") =>
    `${navLinkClasses} ${extraClasses} ${
      pathname === href
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/images/home_page/logo.png"
                alt="TEXTSENSE Logo"
                width={143}
                height={54}
                priority
                className="block h-auto w-auto"
              />
            </Link>
          </div>

          <div
            id="navMenu"
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-[72px] z-50 flex-col border-b border-slate-200 bg-white p-4 shadow-md sm:static sm:flex sm:flex-row sm:items-center sm:border-0 sm:p-0 sm:shadow-none`}>
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={linkClasses("/dashboard")}>
              Dashboard
            </Link>

            <Link
              href="/modal"
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === "/modal" ? "page" : undefined}
              className={linkClasses("/modal")}>
              Add/Edit User
            </Link>

            <Link
              href="/category-modal"
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === "/category-modal" ? "page" : undefined}
              className={linkClasses("/category-modal", "sm:mr-0")}>
              Add/Edit Category
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 sm:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="navMenu"
            aria-expanded={menuOpen}>
            <i id="menuIcon" className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
