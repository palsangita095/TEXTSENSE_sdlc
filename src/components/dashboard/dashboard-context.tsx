"use client";

import { createContext, useContext } from "react";
import type { FeedbackSignal, SignalSentiment } from "@/data/dashboard";

export interface NewFeedbackSignal {
  source: string;
  message: string;
  sentiment: SignalSentiment;
  confidenceValue: number;
}

export interface DashboardContextValue {
  query: string;
  setQuery: (query: string) => void;
  signals: FeedbackSignal[];
  addSignal: (signal: NewFeedbackSignal) => void;
  openSubmitFeedback: () => void;
  openProfile: () => void;
  openNotifications: () => void;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardContext provider.");
  }

  return context;
}
