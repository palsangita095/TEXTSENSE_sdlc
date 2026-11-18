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

interface UserTableProps {
  rows: AdminUser[];
  selectedIds: number[];
  allSelected: boolean;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
  onOpenMenu: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
}

export default function UserTable({
  rows,
  selectedIds,
  allSelected,
  onToggleRow,
  onToggleAll,
  onOpenMenu,
}: UserTableProps) {
  return (
    <div className="hidden w-full overflow-x-auto lg:block">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="Select all users on this page"
                className="h-4 w-4 accent-blue-600"
              />
            </th>
            <th className="px-4 py-4">User</th>
            <th className="px-4 py-4">Role</th>
            <th className="px-4 py-4">Status</th>
            <th className="whitespace-nowrap px-4 py-4">Registration Date</th>
            <th className="whitespace-nowrap px-4 py-4">Last Activity</th>
            <th className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((user) => (
            <tr key={user.id} className="transition hover:bg-slate-50">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => onToggleRow(user.id)}
                  aria-label={`Select ${user.name}`}
                  className="h-4 w-4 accent-blue-600"
                />
              </td>

              <td className="px-4 py-4">
                <div className="flex items-center">
                  <Image
                    src={getUserAvatar(user.id)}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="mr-3 h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${roleBadgeClasses[user.role]}`}>
                  {user.role}
                </span>
              </td>

              <td className={`px-4 py-4 font-semibold ${statusTextClasses[user.status]}`}>
                {user.status}
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                {formatDate(user.registrationDate)}
              </td>

              <td className="whitespace-nowrap px-4 py-4">{user.lastActivity}</td>

              <td className="relative px-4 py-4 text-center">
                <button
                  type="button"
                  onClick={(event) => onOpenMenu(event, user.id)}
                  aria-label={`Actions for ${user.name}`}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center">
                <i className="fa-regular fa-folder-open mb-3 block text-3xl text-slate-400"></i>
                <p className="text-sm font-bold">No users found</p>
                <p className="mt-1 text-xs text-slate-400">
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