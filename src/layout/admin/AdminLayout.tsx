"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/services/helpers/redux";
import { logout } from "@/store/slices/auth.slice";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = useCallback(() => {
    const confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="container-full admin-font flex min-h-screen w-full overflow-x-clip bg-slate-50 text-slate-800">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} onLogout={handleLogout} />

      <div className="min-w-0 flex-1">
        <Header onOpenSidebar={openSidebar} onLogout={handleLogout} />
        {children}
      </div>
    </section>
  );
}
