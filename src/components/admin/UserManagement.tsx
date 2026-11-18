"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  type AdminUser,
  type UserRole,
} from "@/data/admin/users";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import {
  changeRole,
  deleteUsers,
  setPage,
  suspendUsers,
} from "@/store/slices/users.slice";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import Pagination from "./Pagination";
import UserDetailsModal from "./UserDetailsModal";
import UserFiltersCard from "./UserFiltersCard";
import UserMobileCards from "./UserMobileCards";
import UserStatsCards from "./UserStatsCards";
import UserTable from "./UserTable";

interface RowMenuState {
  id: number;
  top: number;
  left: number;
}

const menuActionClasses =
  "block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100";

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const { list, filters, page, pageSize } = useAppSeletor((state) => state.users);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [rowMenu, setRowMenu] = useState<RowMenuState | null>(null);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return list.filter((user) => {
      const rowText = [
        user.name,
        user.email,
        user.role,
        user.status,
        user.registrationDate,
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch = !query || rowText.includes(query);
      const roleMatch = filters.role === "all" || user.role === filters.role;
      const statusMatch = filters.status === "all" || user.status === filters.status;
      const dateMatch =
        !filters.registrationDate || user.registrationDate === filters.registrationDate;

      return searchMatch && roleMatch && statusMatch && dateMatch;
    });
  }, [list, filters]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageRows = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const allPageSelected =
    pageRows.length > 0 && pageRows.every((user) => selectedIds.includes(user.id));

  const toggleUser = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectPage = () => {
    const pageIds = pageRows.map((user) => user.id);

    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const clearSelection = () => setSelectedIds([]);

  const requireSelection = (): boolean => {
    if (selectedIds.length === 0) {
      toast.error("Select at least one user first");
      return false;
    }

    return true;
  };

  const openRowMenu = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 144;
    const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
    setRowMenu({ id, top: rect.bottom + 6, left });
  };

  const handleBulkSuspend = () => {
    if (!requireSelection()) return;

    const count = selectedIds.length;
    dispatch(suspendUsers(selectedIds));
    toast.success(`${count} ${count === 1 ? "user" : "users"} suspended`);
    clearSelection();
  };

  const handleBulkDelete = () => {
    if (!requireSelection()) return;

    const count = selectedIds.length;
    if (!window.confirm(`Delete ${count} selected ${count === 1 ? "user" : "users"}?`)) return;
    dispatch(deleteUsers(selectedIds));
    toast.success(`${count} ${count === 1 ? "user" : "users"} deleted`);
    clearSelection();
  };

  const handleBulkRole = (role: UserRole) => {
    const count = selectedIds.length;
    dispatch(changeRole({ ids: selectedIds, role }));
    toast.success(`${count} ${count === 1 ? "user" : "users"} changed to ${role}`);
    setRoleMenuOpen(false);
    clearSelection();
  };

  const toggleRoleMenu = () => {
    if (!requireSelection()) return;
    setRoleMenuOpen((prev) => !prev);
  };

  const handleExport = () => {
    const rows =
      selectedIds.length > 0
        ? filteredUsers.filter((user) => selectedIds.includes(user.id))
        : filteredUsers;
    const header = ["Name", "Email", "Role", "Status", "Registration Date", "Last Activity"];
    const csv = [header, ...rows.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.registrationDate,
      user.lastActivity,
    ])]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "users.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} ${rows.length === 1 ? "user" : "users"}`);
  };

  const menuUser = rowMenu ? list.find((user) => user.id === rowMenu.id) ?? null : null;

  const bulkButtonClasses =
    "flex items-center justify-center rounded-lg border bg-white px-3 py-2.5 text-xs font-semibold transition";

  return (
    <>
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-2xl font-bold text-slate-800 sm:text-3xl">User Management</h3>

            <p className="mt-2 text-sm text-slate-500">
              Manage users, roles, and account permissions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            <i className="fa-solid fa-plus mr-2"></i>
            Add New User
          </button>
        </div>
      </section>

      <UserStatsCards />

      <UserFiltersCard />

      <section className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-800 sm:text-lg">All Users</h3>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              View and manage all registered users.
            </p>
          </div>

          <div className="mt-3 sm:mt-0">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 sm:text-sm">
              {totalItems.toLocaleString()} Users
            </span>
          </div>
        </div>

        <div className="border-y border-slate-200 bg-slate-50 p-3 sm:p-4">
          <div className="relative flex flex-wrap items-center">
            <span className="mr-3 mb-2 text-xs font-medium text-slate-600 sm:text-sm">
              {selectedIds.length} selected
            </span>

            <button
              type="button"
              onClick={handleBulkSuspend}
              className={`${bulkButtonClasses} mr-2 mb-2 border-amber-300 text-amber-600 hover:bg-amber-50`}>
              <i className="fa-solid fa-ban mr-1.5"></i>
              Suspend
            </button>

            <div className="relative mr-2 mb-2">
              <button
                type="button"
                onClick={toggleRoleMenu}
                className={`${bulkButtonClasses} border-blue-300 text-blue-600 hover:bg-blue-50`}>
                <i className="fa-solid fa-user-gear mr-1.5"></i>
                Change Role
              </button>

              {roleMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setRoleMenuOpen(false)}
                    aria-hidden="true"></div>
                  <div className="absolute left-0 top-full z-40 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                    {(["Admin", "Manager", "Analyst", "User"] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleBulkRole(role)}
                        className={menuActionClasses}>
                        {role}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleBulkDelete}
              className={`${bulkButtonClasses} mr-2 mb-2 border-red-300 text-red-600 hover:bg-red-50`}>
              <i className="fa-solid fa-trash mr-1.5"></i>
              Delete
            </button>

            <button
              type="button"
              onClick={handleExport}
              className={`${bulkButtonClasses} mb-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50`}>
              <i className="fa-solid fa-download mr-1.5"></i>
              Export
            </button>
          </div>
        </div>

        <div className="w-full min-w-0">
          <UserTable
            rows={pageRows}
            selectedIds={selectedIds}
            allSelected={allPageSelected}
            onToggleRow={toggleUser}
            onToggleAll={toggleSelectPage}
            onOpenMenu={openRowMenu}
          />

          <UserMobileCards
            rows={pageRows}
            selectedIds={selectedIds}
            onToggleRow={toggleUser}
            onOpenMenu={openRowMenu}
          />
        </div>

        {totalItems > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={(nextPage) => dispatch(setPage(nextPage))}
          />
        )}
      </section>

      {rowMenu && menuUser && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setRowMenu(null)}
            aria-hidden="true"></div>
          <div
            style={{ top: rowMenu.top, left: rowMenu.left }}
            className="fixed z-50 w-36 rounded-lg border border-slate-200 bg-white py-2 text-left shadow-lg">
            <button
              type="button"
              onClick={() => {
                setSelectedUser(menuUser);
                setRowMenu(null);
              }}
              className={menuActionClasses}>
              <i className="fa-regular fa-eye mr-2"></i>
              View
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingUser(menuUser);
                setRowMenu(null);
              }}
              className={menuActionClasses}>
              <i className="fa-regular fa-pen-to-square mr-2"></i>
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                if (!window.confirm(`Delete ${menuUser.name}?`)) return;
                dispatch(deleteUsers([menuUser.id]));
                setSelectedIds((prev) => prev.filter((id) => id !== menuUser.id));
                toast.success(`${menuUser.name} deleted`);
                setRowMenu(null);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
              <i className="fa-regular fa-trash-can mr-2"></i>
              Delete
            </button>
          </div>
        </>
      )}

      <UserDetailsModal
        open={selectedUser !== null}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      {editingUser && (
        <EditUserModal
          key={editingUser.id}
          open
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {addOpen && <AddUserModal open onClose={() => setAddOpen(false)} />}
    </>
  );
}