"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  statusBadgeClasses,
  sentimentBadgeClasses,
  type FeedbackItem,
} from "@/data/admin/feedbackManagement";
import { feedbackStatusLabels } from "@/services/helpers/admin.helper";

interface ViewFeedbackModalProps {
  open: boolean;
  row: FeedbackItem | null;
  onClose: () => void;
}

export default function ViewFeedbackModal({ open, row, onClose }: ViewFeedbackModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!row) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-3 py-5 sm:px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold">Feedback Details</h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
            aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="mb-4 flex items-center">
          <Image
            src={row.avatar}
            alt={row.customer}
            width={48}
            height={48}
            className="mr-3 h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-800">{row.customer}</p>
            <p className="text-xs text-gray-500">Customer</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-800">{row.title}</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">{row.message}</p>
          <p className="mt-3 text-xs text-gray-400">
            {row.categoryName} · {row.source}
          </p>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4 text-sm">
          <div className="mb-3 flex justify-between">
            <span className="text-gray-500">Sentiment</span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${sentimentBadgeClasses[row.sentiment]}`}>
              {row.sentiment === "Unknown" ? "Not analyzed" : row.sentiment}
            </span>
          </div>

          <div className="mb-3 flex justify-between">
            <span className="text-gray-500">Confidence</span>
            <span className="text-gray-700">{row.confidence}</span>
          </div>

          <div className="mb-3 flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="text-gray-700">{row.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className={`rounded-full px-3 py-1 text-xs ${statusBadgeClasses[row.status]}`}>
              {feedbackStatusLabels[row.status]}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
