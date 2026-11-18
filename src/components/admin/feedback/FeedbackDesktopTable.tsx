"use client";

import Image from "next/image";
import {
  sentimentBadgeClasses,
  statusBadgeClasses,
  type FeedbackItem,
} from "@/data/admin/feedbackManagement";
import { feedbackStatusLabels } from "@/services/helpers/admin.helper";

interface FeedbackDesktopTableProps {
  rows: FeedbackItem[];
  selectedIds: number[];
  allSelected: boolean;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
  onView: (row: FeedbackItem) => void;
}

const checkboxClasses = "h-4 w-4 rounded border-gray-300 accent-blue-600";

export default function FeedbackDesktopTable({
  rows,
  selectedIds,
  allSelected,
  onToggleRow,
  onToggleAll,
  onView,
}: FeedbackDesktopTableProps) {
  return (
    <div className="hidden w-full overflow-x-auto lg:block">
      <table className="w-full min-w-[1050px] border-collapse text-left">
        <thead>
          <tr className="border-y border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <th className="px-4 py-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="Select all feedback"
                className={checkboxClasses}
              />
            </th>
            <th className="px-4 py-4">Customer</th>
            <th className="px-4 py-4">Feedback</th>
            <th className="px-4 py-4">Sentiment</th>
            <th className="px-4 py-4">Confidence</th>
            <th className="px-4 py-4">Date</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => onToggleRow(row.id)}
                  aria-label={`Select feedback from ${row.customer}`}
                  className={checkboxClasses}
                />
              </td>

              <td className="px-4 py-4">
                <div className="flex items-center">
                  <Image
                    src={row.avatar}
                    alt={row.customer}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="ml-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {row.customer}
                  </span>
                </div>
              </td>

              <td className="max-w-xs px-4 py-4 text-sm text-gray-600">
                <p className="truncate font-medium text-gray-800">{row.title}</p>
                <p className="mt-1 truncate text-xs text-gray-500">{row.message}</p>
                <p className="mt-1 truncate text-xs text-gray-400">
                  {row.categoryName} · {row.source}
                </p>
              </td>

              <td className="px-4 py-4">
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${sentimentBadgeClasses[row.sentiment]}`}>
                  {row.sentiment === "Unknown" ? "Not analyzed" : row.sentiment}
                </span>
              </td>

              <td className="px-4 py-4 text-sm text-gray-600">{row.confidence}</td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">{row.date}</td>

              <td className="px-4 py-4">
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${statusBadgeClasses[row.status]}`}>
                  {feedbackStatusLabels[row.status]}
                </span>
              </td>

              <td className="px-4 py-4 text-center">
                <button
                  type="button"
                  onClick={() => onView(row)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="View feedback">
                  <i className="fa-solid fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-12 text-center">
                <i className="fa-regular fa-folder-open mb-3 block text-3xl text-gray-400"></i>
                <p className="text-sm font-bold text-gray-700">No feedback found</p>
                <p className="mt-1 text-xs text-gray-400">
                  Try adjusting your search or filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
