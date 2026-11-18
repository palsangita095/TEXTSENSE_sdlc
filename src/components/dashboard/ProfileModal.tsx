"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  useEffect(() => {
    if (!open) return;

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
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-profile-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3
            id="dashboard-profile-title"
            className="text-lg font-bold text-slate-900">
            Profile
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close profile">
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div className="flex items-center border-b border-slate-100 py-5">
          <Image
            src="/assets/images/auth/profile-1.jpg"
            alt="Alex Rivers profile"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border-2 border-indigo-100 object-cover"
          />

          <div className="ml-4 min-w-0">
            <p className="truncate text-base font-bold text-slate-900">Alex Rivers</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              User
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">
              alex.rivers@textsense.io
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-5">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Plan
            </p>
            <p className="mt-2 text-sm font-bold text-slate-800">Free Plan</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Status
            </p>
            <p className="mt-2 text-sm font-bold text-emerald-600">Active</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Member Since
            </p>
            <p className="mt-2 text-sm font-bold text-slate-800">Jan 2025</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Analyses
            </p>
            <p className="mt-2 text-sm font-bold text-slate-800">150 / 250</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-3/5 rounded-full bg-indigo-500"></div>
          </div>
          <p className="mt-2 text-[10px] text-slate-400">150 of 250 analyses used</p>
        </div>

        <Link
          href="/#pricing"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Upgrade Plan
          <i
            className="fa-solid fa-arrow-up-right-from-square ml-2"
            aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}
