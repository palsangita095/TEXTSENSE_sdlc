"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import {
  formatDate,
  getUserAvatar,
  roleBadgeClasses,
  statusTextClasses,
  type AdminUser,
} from "@/data/admin/users";

interface UserMobileCardsProps {
  rows: AdminUser[];
  selectedIds: number[];
  onToggleRow: (id: number) => void;
  onOpenMenu: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
}

export default function UserMobileCards({
  rows,
  selectedIds,
  onToggleRow,
  onOpenMenu,
}: UserMobileCardsProps) {
  return (
    <div className="block p-3 sm:p-4 lg:hidden">
      {rows.map((user) => (
        <div
          key={user.id}
          className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={selectedIds.includes(user.id)}
              onChange={() => onToggleRow(user.id)}
              aria-label={`Select ${user.name}`}
              className="mr-3 h-4 w-4 accent-blue-600"
            />

            <Image
              src={getUserAvatar(user.id)}
              alt={user.name}
              width={44}
              height={44}
              className="mr-3 h-11 w-11 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="font-semibold text-slate-800">{user.name}</p>
              <p className="break-all text-xs text-slate-500">{user.email}</p>
            </div>

            <button
              type="button"
              onClick={(event) => onOpenMenu(event, user.id)}
              aria-label={`Actions for ${user.name}`}
              className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3 text-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-slate-500">Role</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${roleBadgeClasses[user.role]}`}>
                {user.role}
              </span>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-slate-500">Status</span>
              <span className={`font-semibold ${statusTextClasses[user.status]}`}>
                {user.status}
              </span>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-slate-500">Registration Date</span>
              <span className="text-slate-700">{formatDate(user.registrationDate)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Last Activity</span>
              <span className="text-slate-700">{user.lastActivity}</span>
            </div>
          </div>
        </div>
      ))}

      {rows.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center">
          <i className="fa-regular fa-folder-open mb-3 block text-3xl text-slate-400"></i>
          <p className="text-sm font-bold">No users found</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}