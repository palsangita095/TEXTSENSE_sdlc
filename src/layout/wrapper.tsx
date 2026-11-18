"use client";

import React from "react";
import Navbar from "./User/Navbar"
import Footer from "./User/Footer";
import { Props } from "@/type/interface/auth/auth.interface";
import { usePathname } from "next/navigation";

export default function ProviderLayout({ children }: Props) {
  // Checking which page the user is on
  const pathname = usePathname();

  // The login page reproduces the standalone login.html design (it ships its
  // own header), so the site Navbar/Footer are hidden there. Admin pages and
  // the user dashboard use their own layouts. The modal states showcases also
  // reproduce their source page headers and need no marketing chrome.
  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/modal" ||
    pathname === "/category-modal";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}