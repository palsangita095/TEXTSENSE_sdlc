"use client";

import { useEffect } from "react";
import type { FeedbackRow } from "@/data/admin/feedbackRows";

interface FeedbackDetailsModalProps {
  open: boolean;
  row: FeedbackRow | null;
  onClose: () => void;
}

export default function FeedbackDetailsModal({ open, row, onClose }: FeedbackDetailsModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] items-center justify-center bg-black/50 px-3 py-5 sm:px-4 ${open ? "flex" : "hidden"}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold">Feedback Details</h3>

          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
            aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Feedback</p>
            <p className="break-words text-sm leading-6 text-slate-700">{row?.preview ?? ""}</p>
          </div>

          <div className="flex flex-wrap justify-between gap-4 border-t border-slate-100 pt-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Sentiment</p>
              <p className="text-sm font-semibold">{row?.sentiment ?? ""}</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Confidence</p>
              <p className="text-sm font-semibold">{row?.confidence ?? ""}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Category</p>
            <p className="text-sm font-semibold">{row?.category ?? ""}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
