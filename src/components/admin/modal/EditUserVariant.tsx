"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function EditUserVariant() {
  const [saving, setSaving] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSave = () => {
    if (saving) return;

    setSaving(true);

    timeoutRef.current = window.setTimeout(() => {
      setSaving(false);
      toast.success("Priya Nair's account was updated.");
    }, 1200);
  };

  const handleCancel = () => {
    if (saving) return;
    toast("Changes discarded");
  };

  const handleDelete = () => {
    if (saving) return;

    if (
      !window.confirm(
        "Delete Priya Nair's account? This permanently removes the account and its data.",
      )
    ) {
      return;
    }

    toast.success("Priya Nair's account deleted");
  };

  return (
    <section
      id="editUserSection"
      className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-lg md:p-6">
      <div className="flex flex-col items-start lg:flex-row lg:items-center">
        <div className="mb-5 flex w-full items-start lg:mb-0 lg:w-1/3">
          <div className="mr-4 mt-1 text-indigo-600">
            <i className="fa-solid fa-pen text-xl"></i>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-800">
              &quot;Edit User&quot; variant
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Same modal shell and the same three states — only the content below changes
              when editing an existing account.
            </p>
          </div>
        </div>

        <div className="mb-5 w-full lg:mb-0 lg:w-2/5 lg:px-5">
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start">
              <span className="mr-3 text-indigo-500">•</span>
              <p>
                <span className="font-semibold text-slate-700">Header:</span> &quot;Edit
                User&quot; with subtitle &quot;Update account details and role.&quot;
              </p>
            </li>

            <li className="flex items-start">
              <span className="mr-3 text-indigo-500">•</span>
              <p>
                <span className="font-semibold text-slate-700">Fields:</span> All
                prefilled; email is read-only with a lock icon.
              </p>
            </li>

            <li className="flex items-start">
              <span className="mr-3 text-indigo-500">•</span>
              <p>
                <span className="font-semibold text-slate-700">Success copy:</span>{" "}
                &quot;Priya Nair&apos;s account was updated.&quot; No invitation email is
                sent.
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full border-slate-200 lg:w-1/4 lg:border-l lg:pl-5">
          <p className="mb-4 text-xs font-bold tracking-widest text-slate-500">
            FOOTER ACTIONS
          </p>

          <div className="flex flex-wrap items-center">
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="mr-2 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60">
              <i className="fa-solid fa-circle-minus mr-1"></i>
              Delete User
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="mr-2 mb-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="mb-2 flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80">
              {saving && <i className="fa-solid fa-spinner fa-spin mr-2"></i>}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
