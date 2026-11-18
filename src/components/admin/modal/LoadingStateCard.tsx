import { defaultShowcaseUser } from "@/data/admin/modalShowcase";

export default function LoadingStateCard() {
  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-lg sm:p-6">
      <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-blue-100">
        <div className="h-full w-2/3 rounded-full bg-blue-700"></div>
      </div>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Add New User</h3>

          <p className="mt-1 text-xs text-slate-500">
            Create an account and assign a role.
          </p>
        </div>

        <button
          type="button"
          aria-label="Close preview"
          disabled
          className="ml-2 text-slate-400 disabled:cursor-not-allowed">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-slate-800">Full Name</label>

        <input
          type="text"
          defaultValue={defaultShowcaseUser.fullName}
          disabled
          className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Email Address
        </label>

        <input
          type="email"
          defaultValue={defaultShowcaseUser.email}
          disabled
          className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-slate-800">Role</label>

        <select
          defaultValue={defaultShowcaseUser.role}
          disabled
          className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500">
          <option>{defaultShowcaseUser.role}</option>
        </select>

        <p className="mt-2 text-xs text-slate-500">
          Users can submit and view their own feedback.
        </p>
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-sm font-bold text-slate-800">
          Account Status
        </label>

        <select
          defaultValue={defaultShowcaseUser.status}
          disabled
          className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-500">
          <option>{defaultShowcaseUser.status}</option>
        </select>
      </div>

      <div className="flex items-center justify-end border-t border-slate-100 pt-5">
        <button
          type="button"
          disabled
          className="mr-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 disabled:cursor-not-allowed">
          Cancel
        </button>

        <button
          type="button"
          disabled
          className="flex items-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white opacity-90">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
          Saving...
        </button>
      </div>
    </div>
  );
}
