"use client";

import { useEffect } from "react";
import type { FeedbackSignal } from "@/data/dashboard";

interface FeedbackDetailsModalProps {
  signal: FeedbackSignal | null;
  onClose: () => void;
}

export default function FeedbackDetailsModal({
  signal,
  onClose,
}: FeedbackDetailsModalProps) {
  useEffect(() => {
    if (!signal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [signal, onClose]);

  if (!signal) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-details-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3
            id="feedback-details-title"
            className="text-lg font-bold text-slate-900">
            Feedback Details
          </h3>

          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close details">
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div className="py-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Feedback Source
          </p>

          <p id="modalSource" className="mb-5 text-sm font-semibold text-slate-800">
            {signal.source}
          </p>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Message
          </p>

          <p
            id="modalMessage"
            className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            {signal.message}
          </p>

          <div className="mt-5 flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <div className="rounded-xl bg-indigo-50 p-4">
                <p className="text-xs text-slate-500">Sentiment</p>
                <p
                  id="modalSentiment"
                  className="mt-2 text-sm font-bold text-indigo-700">
                  {signal.sentiment}
                </p>
              </div>
            </div>

            <div className="w-1/2 px-2">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-slate-500">Confidence</p>
                <p
                  id="modalConfidence"
                  className="mt-2 text-sm font-bold text-emerald-700">
                  {signal.confidence}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Close
        </button>
      </div>
    </div>
  );
}
