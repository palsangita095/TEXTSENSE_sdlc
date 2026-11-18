"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  dashboardSignals,
  signalSources,
  type FeedbackSignal,
} from "@/data/dashboard";
import DashboardFooter from "./DashboardFooter";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import ProfileModal from "./ProfileModal";
import SubmitFeedbackModal from "./SubmitFeedbackModal";
import {
  DashboardContext,
  type DashboardContextValue,
  type NewFeedbackSignal,
} from "./dashboard-context";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [signals, setSignals] = useState<FeedbackSignal[]>(dashboardSignals);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const closeNotifications = useCallback(() => setNotificationsOpen(false), []);
  const closeSubmitFeedback = useCallback(() => setSubmitOpen(false), []);
  const closeProfile = useCallback(() => setProfileOpen(false), []);
  const toggleNotifications = useCallback(
    () => setNotificationsOpen((current) => !current),
    [],
  );

  const openNotifications = useCallback(() => {
    setSidebarOpen(false);
    setNotificationsOpen(true);
  }, []);

  const openProfile = useCallback(() => {
    setSidebarOpen(false);
    setProfileOpen(true);
  }, []);

  const openSubmitFeedback = useCallback(() => {
    setSidebarOpen(false);
    setSubmitOpen(true);
  }, []);

  const addSignal = useCallback((input: NewFeedbackSignal) => {
    setSignals((current) => {
      const nextId =
        current.reduce((max, signal) => Math.max(max, signal.id), 0) + 1;
      const source =
        signalSources.find((item) => item.source === input.source) ??
        signalSources[0];
      const preview =
        input.message.length > 58
          ? `${input.message.slice(0, 55).trimEnd()}...`
          : input.message;

      const newSignal: FeedbackSignal = {
        id: nextId,
        source: source.source,
        icon: source.icon,
        iconClasses: source.iconClasses,
        time: "Just now",
        message: input.message,
        preview,
        sentiment: input.sentiment,
        confidence: `${input.confidenceValue}%`,
        confidenceValue: input.confidenceValue,
      };

      return [newSignal, ...current];
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setSidebarOpen(false);
      setNotificationsOpen(false);
      setProfileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const contextValue = useMemo<DashboardContextValue>(
    () => ({
      query,
      setQuery,
      signals,
      addSignal,
      openSubmitFeedback,
      openProfile,
      openNotifications,
    }),
    [
      query,
      signals,
      addSignal,
      openSubmitFeedback,
      openProfile,
      openNotifications,
    ],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      <section className="admin-font min-h-screen bg-[#f7f8fc] text-slate-800">
        <div className="container-full flex min-h-screen w-full">
          <div
            id="overlay"
            onClick={closeSidebar}
            className={`fixed inset-0 z-40 bg-slate-950/60 md:hidden ${
              sidebarOpen ? "" : "hidden"
            }`}
            aria-hidden="true"></div>

          <DashboardSidebar
            open={sidebarOpen}
            onClose={closeSidebar}
            onOpenNotifications={openNotifications}
            onOpenProfile={openProfile}
            onSubmitFeedback={openSubmitFeedback}
          />

          <div className="min-w-0 flex-1">
            <DashboardTopbar
              onOpenSidebar={() => setSidebarOpen(true)}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={toggleNotifications}
              onCloseNotifications={closeNotifications}
            />

            {children}

            <DashboardFooter />
          </div>
        </div>

        {submitOpen && (
          <SubmitFeedbackModal
            onClose={closeSubmitFeedback}
            onAdd={addSignal}
          />
        )}

        <ProfileModal open={profileOpen} onClose={closeProfile} />
      </section>
    </DashboardContext.Provider>
  );
}
