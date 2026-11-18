"use client";

import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import {
  applyUsersFilters,
  emptyUsersFilters,
  resetUsersFilters,
  type UsersFilters,
} from "@/store/slices/users.slice";

const inputClasses =
  "w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const selectClasses =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500";

export default function UserFiltersCard() {
  const dispatch = useAppDispatch();
  const filters = useAppSeletor((state) => state.users.filters);
  const [draft, setDraft] = useState<UsersFilters>(filters);

  const handleApply = () => {
    dispatch(
      applyUsersFilters({
        search: draft.search,
        role: draft.role,
        status: draft.status,
        registrationDate: draft.registrationDate,
      }),
    );
  };

  const handleReset = () => {
    setDraft({ ...emptyUsersFilters });
    dispatch(resetUsersFilters());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleApply();
  };

  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center">
        <i className="fa-solid fa-filter mr-2 text-blue-600"></i>

        <h3 className="text-lg font-bold text-slate-800">Search &amp; Filters</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label
              htmlFor="userSearch"
              className="mb-2 block text-sm font-medium text-slate-600">
              Search Users
            </label>

            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

              <input
                id="userSearch"
                type="text"
                value={draft.search}
                onChange={(event) => setDraft({ ...draft, search: event.target.value })}
                placeholder="Search name or email..."
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="roleFilter" className="mb-2 block text-sm font-medium text-slate-600">
              User Role
            </label>

            <select
              id="roleFilter"
              value={draft.role}
              onChange={(event) => setDraft({ ...draft, role: event.target.value })}
              className={selectClasses}>
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Analyst">Analyst</option>
              <option value="User">User</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="statusFilter"
              className="mb-2 block text-sm font-medium text-slate-600">
              Account Status
            </label>

            <select
              id="statusFilter"
              value={draft.status}
              onChange={(event) => setDraft({ ...draft, status: event.target.value })}
              className={selectClasses}>
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="registrationDate"
              className="mb-2 block text-sm font-medium text-slate-600">
              Registration Date
            </label>

            <input
              id="registrationDate"
              type="date"
              value={draft.registrationDate}
              onChange={(event) => setDraft({ ...draft, registrationDate: event.target.value })}
              className={selectClasses}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center">
          <button
            type="submit"
            className="mr-3 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
            <i className="fa-solid fa-filter mr-2"></i>
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="mt-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 lg:mt-0">
            <i className="fa-solid fa-rotate-left mr-2"></i>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}