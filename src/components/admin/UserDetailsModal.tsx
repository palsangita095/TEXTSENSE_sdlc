"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  formatDate,
  getUserAvatar,
  roleBadgeClasses,
  statusTextClasses,
  type AdminUser,
} from "@/data/admin/users";

interface UserDetailsModalProps {
  open: boolean;
  user: AdminUser | null;
  onClose: () => void;
}

export default function UserDetailsModal({ open, user, onClose }: UserDetailsModalProps) {
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
          <h3 className="text-lg font-bold">User Details</h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
            aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="mb-5 flex items-center">
          <Image
            src={getUserAvatar(user?.id ?? 1)}
            alt={user?.name ?? "User avatar"}
            width={48}
            height={48}
            className="mr-3 h-12 w-12 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">{user?.name ?? ""}</p>
            <p className="truncate text-xs text-slate-500">{user?.email ?? ""}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Role</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  user ? roleBadgeClasses[user.role] : ""
                }`}>
                {user?.role ?? ""}
              </span>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Status</p>
              <span
                className={`text-sm font-semibold ${
                  user ? statusTextClasses[user.status] : ""
                }`}>
                {user?.status ?? ""}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">
              Registration Date
            </p>
            <p className="text-sm font-semibold">
              {user ? formatDate(user.registrationDate) : ""}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-1 text-xs font-semibold uppercase text-slate-400">
              Last Activity
            </p>
            <p className="text-sm font-semibold">{user?.lastActivity ?? ""}</p>
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
