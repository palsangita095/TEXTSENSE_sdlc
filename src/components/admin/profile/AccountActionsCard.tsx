import type { MouseEvent } from "react";
import type { ProfileStatus } from "@/data/admin/profile";

interface AccountActionsCardProps {
  status: ProfileStatus;
  onEdit: () => void;
  onChangeRole: (event: MouseEvent<HTMLButtonElement>) => void;
  onSuspend: () => void;
  onActivate: () => void;
  onDelete: () => void;
}

export default function AccountActionsCard({
  status,
  onEdit,
  onChangeRole,
  onSuspend,
  onActivate,
  onDelete,
}: AccountActionsCardProps) {
  const suspended = status === "Suspended";

  const secondaryButtonClasses =
    "flex w-full items-center justify-center rounded-xl border bg-white px-4 py-3.5 text-sm font-semibold transition sm:text-[15px]";
  const disabledButtonClasses =
    "cursor-not-allowed border-[#E2E5EC] bg-[#F8FAFC] text-[#94A3B8]";

  return (
    <section className="mb-6 rounded-2xl border border-[#E2E5EC] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] sm:p-8">
      <h2 className="mb-5 text-xl font-bold text-[#0F172A] sm:text-2xl">
        Account actions
      </h2>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onEdit}
          className="flex w-full items-center justify-center rounded-xl bg-[#4338CA] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3730A3] sm:text-[15px]">
          <i className="fa-regular fa-pen-to-square mr-2"></i>
          Edit User
        </button>

        <button
          type="button"
          onClick={onChangeRole}
          className={`${secondaryButtonClasses} border-[#E2E5EC] text-[#0F172A] hover:bg-[#F8FAFC]`}>
          <i className="fa-solid fa-user-group mr-2 text-[#4338CA]"></i>
          Change Role
        </button>

        <button
          type="button"
          onClick={onSuspend}
          disabled={suspended}
          className={`${secondaryButtonClasses} ${
            suspended
              ? disabledButtonClasses
              : "border-[#E2E5EC] text-[#B45309] hover:bg-[#FEF3C7]"
          }`}>
          <i className="fa-solid fa-ban mr-2"></i>
          Suspend Account
        </button>

        <button
          type="button"
          onClick={onActivate}
          disabled={!suspended}
          className={`${secondaryButtonClasses} ${
            suspended
              ? "border-[#E2E5EC] text-[#15803D] hover:bg-[#ECFDF3]"
              : disabledButtonClasses
          }`}>
          <i className="fa-regular fa-circle-check mr-2"></i>
          Activate Account
        </button>

        <p className="text-center text-xs text-[#94A3B8]">
          {suspended ? "Account is currently suspended" : "Already active"}
        </p>

        <button
          type="button"
          onClick={onDelete}
          className={`${secondaryButtonClasses} border-[#E2E5EC] text-[#DC2626] hover:bg-[#FEF2F2]`}>
          <i className="fa-regular fa-trash-can mr-2"></i>
          Delete User
        </button>
      </div>

      <p className="mt-4 flex items-start border-t border-[#EEF1F6] pt-4 text-xs leading-5 text-[#94A3B8]">
        <i className="fa-solid fa-circle-info mr-2 mt-0.5"></i>
        Deleting a user permanently removes their account and data.
      </p>
    </section>
  );
}
