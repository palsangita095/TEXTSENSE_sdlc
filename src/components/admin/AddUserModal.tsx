"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/services/helpers/redux";
import { addUser } from "@/store/slices/users.slice";
import type { UserRole, UserStatus } from "@/data/admin/users";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  role: "User",
  status: "Active",
  registrationDate: "",
};

const fieldClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500";

export default function AddUserModal({ open, onClose }: AddUserModalProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>(() => ({
    ...emptyForm,
    registrationDate: new Date().toISOString().slice(0, 10),
  }));
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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

    if (!form.registrationDate) {
      setError("Please choose a registration date.");
      return;
    }

    dispatch(
      addUser({
        name,
        email,
        role: form.role,
        status: form.status,
        registrationDate: form.registrationDate,
      }),
    );
    toast.success(`${name} has been added`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[60] items-center justify-center bg-black/50 px-3 py-5 sm:px-4 ${open ? "flex" : "hidden"}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold">Add New User</h3>

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
              htmlFor="add-user-name"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Full Name
            </label>
            <input
              id="add-user-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="e.g. Sarah Mitchell"
              className={fieldClasses}
            />
          </div>

          <div>
            <label
              htmlFor="add-user-email"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Email
            </label>
            <input
              id="add-user-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="e.g. sarah.mitchell@example.com"
              className={fieldClasses}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="add-user-role"
                className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                Role
              </label>
              <select
                id="add-user-role"
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value as UserRole })}
                className={fieldClasses}>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Analyst">Analyst</option>
                <option value="User">User</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="add-user-status"
                className="mb-1 block text-xs font-semibold uppercase text-slate-400">
                Status
              </label>
              <select
                id="add-user-status"
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value as UserStatus })
                }
                className={fieldClasses}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="add-user-date"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Registration Date
            </label>
            <input
              id="add-user-date"
              type="date"
              value={form.registrationDate}
              onChange={(event) => setForm({ ...form, registrationDate: event.target.value })}
              className={fieldClasses}
            />
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
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
