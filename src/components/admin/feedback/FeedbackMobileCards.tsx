"use client";

import Image from "next/image";
import {
  sentimentBadgeClasses,
  statusBadgeClasses,
  type FeedbackItem,
} from "@/data/admin/feedbackManagement";
import { feedbackStatusLabels } from "@/services/helpers/admin.helper";

interface FeedbackMobileCardsProps {
  rows: FeedbackItem[];
  selectedIds: number[];
  onToggleRow: (id: number) => void;
  onView: (row: FeedbackItem) => void;
}

export default function FeedbackMobileCards({
  rows,
  selectedIds,
  onToggleRow,
  onView,
}: FeedbackMobileCardsProps) {
  return (
    <div className="block p-3 sm:p-4 lg:hidden">
      {rows.map((row) => (
        <div key={row.id} className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center">
            <input
              type="checkbox"
              checked={selectedIds.includes(row.id)}
              onChange={() => onToggleRow(row.id)}
              aria-label={`Select feedback from ${row.customer}`}
              className="mr-3 h-4 w-4 rounded border-gray-300 accent-blue-600"
            />

            <Image
              src={row.avatar}
              alt={row.customer}
              width={44}
              height={44}
              className="mr-3 h-11 w-11 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800">{row.customer}</p>
              <p className="text-xs text-gray-500">{row.categoryName}</p>
            </div>

            <button
              type="button"
              onClick={() => onView(row)}
              className="ml-auto text-blue-600"
              aria-label="View feedback">
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>

          <div className="mb-3 border-t border-gray-100 pt-3">
            <p className="text-sm font-medium text-gray-800">{row.title}</p>
            <p className="mt-1 text-sm text-gray-600">{row.message}</p>
          </div>

          <div className="border-t border-gray-100 pt-3 text-sm">
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
              <span className="text-gray-500">Source</span>
              <span className="text-gray-700">{row.source}</span>
            </div>

            <div className="mb-3 flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-700">{row.date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span
                className={`rounded-full px-3 py-1 text-xs ${statusBadgeClasses[row.status]}`}>
                {feedbackStatusLabels[row.status]}
              </span>
            </div>
          </div>
        </div>
      ))}

      {rows.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center">
          <i className="fa-regular fa-folder-open mb-3 block text-3xl text-gray-400"></i>
          <p className="text-sm font-bold text-gray-700">No feedback found</p>
          <p className="mt-1 text-xs text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
