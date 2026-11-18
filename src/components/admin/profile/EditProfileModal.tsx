"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  PROFILE_ROLES,
  type ProfileData,
  type ProfileRole,
} from "@/data/admin/profile";

interface EditProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (next: ProfileData) => void;
}

const fieldClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500";

export default function EditProfileModal({
  profile,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [form, setForm] = useState<ProfileData>(profile);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) {
      setError("Please enter the user's full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onSave({ ...form, name, email });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-3 py-5 sm:px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold">Edit User</h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
            aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className={fieldClasses}
            />
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className={fieldClasses}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="profile-role"
                className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                Role
              </label>
              <select
                id="profile-role"
                value={form.role}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value as ProfileRole })
                }
                className={fieldClasses}>
                {PROFILE_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="profile-company"
                className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                Company
              </label>
              <input
                id="profile-company"
                type="text"
                value={form.company}
                onChange={(event) => setForm({ ...form, company: event.target.value })}
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="profile-location"
                className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                value={form.location}
                onChange={(event) => setForm({ ...form, location: event.target.value })}
                className={fieldClasses}
              />
            </div>

            <div>
              <label
                htmlFor="profile-plan"
                className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                Plan
              </label>
              <input
                id="profile-plan"
                type="text"
                value={form.plan}
                onChange={(event) => setForm({ ...form, plan: event.target.value })}
                className={fieldClasses}
              />
            </div>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#4338CA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3730A3]">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
