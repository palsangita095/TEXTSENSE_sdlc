interface CategoryStatusRowProps {
  active: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}

export default function CategoryStatusRow({
  active,
  onToggle,
  disabled = false,
}: CategoryStatusRowProps) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-xl bg-[#F7F8FC] p-3.5">
      <div className="pr-3">
        <p className="text-xs font-semibold text-[#111827]">
          Status: {active ? "Active" : "Inactive"}
        </p>

        <p className="text-[11px] text-[#64748B]">
          {active
            ? "Active categories can receive new feedback items."
            : "Inactive categories do not receive new feedback items."}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label="Toggle category status"
        disabled={disabled}
        onClick={onToggle}
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
          active ? "justify-end bg-[#4338CA]" : "justify-start bg-slate-300"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <span className="h-4 w-4 rounded-full bg-white shadow-md"></span>
      </button>
    </div>
  );
}
