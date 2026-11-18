"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  showcaseRoles,
  showcaseStatuses,
  type ShowcaseRole,
  type ShowcaseStatus,
  type ShowcaseUser,
} from "@/data/admin/modalShowcase";

interface UserModalFormProps {
  onSaved: (user: ShowcaseUser) => void;
}

interface FormState {
  fullName: string;
  email: string;
  role: ShowcaseRole | "";
  status: ShowcaseStatus;
}

type ErrorField = "fullName" | "email" | "role";
type FormErrors = Partial<Record<ErrorField, string>>;

const emptyForm: FormState = {
  fullName: "",
  email: "",
  role: "",
  status: "Pending",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const fullName = form.fullName.trim();
  const email = form.email.trim();

  if (!fullName) {
    errors.fullName = "Full name is required.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.role) {
    errors.role = "Select a role for this user.";
  }

  return errors;
}

function fieldClasses(hasError: boolean): string {
  const base =
    "h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500";

  return hasError
    ? `${base} border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100`
    : `${base} border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100`;
}

export default function UserModalForm({ onSaved }: UserModalFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [saving, setSaving] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setShowSummary(false);
  };

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((previous) => ({ ...previous, [key]: value }));

    if (key !== "fullName" && key !== "email" && key !== "role") return;

    const field = key as ErrorField;

    if (!errors[field]) return;

    const nextErrors = { ...errors };
    delete nextErrors[field];
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setShowSummary(false);
    }
  };

  const focusFirstError = (nextErrors: FormErrors) => {
    if (nextErrors.fullName) {
      fullNameRef.current?.focus();
    } else if (nextErrors.email) {
      emailRef.current?.focus();
    } else if (nextErrors.role) {
      roleRef.current?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setShowSummary(Object.keys(nextErrors).length > 0);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    const savedUser: ShowcaseUser = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      role: form.role as ShowcaseRole,
      status: form.status,
    };

    setSaving(true);

    timeoutRef.current = window.setTimeout(() => {
      setSaving(false);
      resetForm();
      onSaved(savedUser);
      toast.success("User saved successfully");
    }, 1400);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-lg sm:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Add New User</h3>

          <p className="mt-1 text-xs text-slate-500">
            Create an account and assign a role.
          </p>
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={resetForm}
          disabled={saving}
          className="ml-2 text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed disabled:text-slate-300">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {saving && (
        <div
          className="mb-5 h-1 w-full overflow-hidden rounded-full bg-blue-100"
          role="progressbar"
          aria-label="Saving user">
          <div className="h-full w-2/3 rounded-full bg-blue-700"></div>
        </div>
      )}

      <div
        id="validationSummary"
        className={`mb-5 rounded-xl border border-red-200 bg-red-50 px-3 py-3 ${
          showSummary ? "" : "hidden"
        }`}
        role="alert"
        aria-live="polite">
        <p className="text-sm font-semibold text-red-700">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          Please fix the errors before saving.
        </p>
      </div>

      <form id="userForm" noValidate onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="mb-2 block text-sm font-bold text-slate-800">
            Full Name
          </label>

          <input
            ref={fullNameRef}
            type="text"
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Enter full name"
            aria-describedby="fullNameError"
            aria-invalid={Boolean(errors.fullName)}
            disabled={saving}
            className={fieldClasses(Boolean(errors.fullName))}
          />

          <p
            id="fullNameError"
            className={`mt-2 text-xs text-red-600 ${errors.fullName ? "" : "hidden"}`}
            aria-live="polite">
            {errors.fullName}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="userEmail" className="mb-2 block text-sm font-bold text-slate-800">
            Email Address
          </label>

          <input
            ref={emailRef}
            type="text"
            id="userEmail"
            name="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Enter email address"
            aria-describedby="userEmailError"
            aria-invalid={Boolean(errors.email)}
            disabled={saving}
            className={fieldClasses(Boolean(errors.email))}
          />

          <p
            id="userEmailError"
            className={`mt-2 text-xs text-red-600 ${errors.email ? "" : "hidden"}`}
            aria-live="polite">
            {errors.email}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="userRole" className="mb-2 block text-sm font-bold text-slate-800">
            Role
          </label>

          <select
            ref={roleRef}
            id="userRole"
            name="role"
            value={form.role}
            onChange={(event) => updateField("role", event.target.value as ShowcaseRole | "")}
            aria-describedby="userRoleError"
            aria-invalid={Boolean(errors.role)}
            disabled={saving}
            className={fieldClasses(Boolean(errors.role))}>
            <option value="">Select a role</option>
            {showcaseRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <p
            id="userRoleError"
            className={`mt-2 text-xs text-red-600 ${errors.role ? "" : "hidden"}`}
            aria-live="polite">
            {errors.role}
          </p>

          <p className="mt-2 text-xs text-slate-500">Admins can manage users and content.</p>
        </div>

        <div className="mb-7">
          <label
            htmlFor="accountStatus"
            className="mb-2 block text-sm font-bold text-slate-800">
            Account Status
          </label>

          <select
            id="accountStatus"
            name="status"
            value={form.status}
            onChange={(event) => updateField("status", event.target.value as ShowcaseStatus)}
            disabled={saving}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500">
            {showcaseStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={resetForm}
            disabled={saving}
            className="mr-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400">
            Cancel
          </button>

          <button
            type="submit"
            id="saveUserBtn"
            disabled={saving}
            className="flex items-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-90">
            {saving ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              "Save User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
