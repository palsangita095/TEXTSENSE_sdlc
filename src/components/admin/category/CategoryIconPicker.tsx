import {
  categoryIconOptions,
  type CategoryIconId,
} from "@/data/admin/categoryModal";

interface CategoryIconPickerProps {
  selected: CategoryIconId;
  onChange?: (icon: CategoryIconId) => void;
  disabled?: boolean;
  tone?: "default" | "muted";
}

const baseClasses =
  "mb-2 mr-2 flex h-10 w-10 items-center justify-center rounded-xl last:mr-0";

const selectedClasses = "border-2 border-[#4338CA] bg-[#EFEDFF] text-[#4338CA]";

const idleClasses =
  "border border-slate-200 bg-[#F7F8FC] text-slate-600 transition hover:border-[#4338CA] hover:bg-[#EFEDFF] hover:text-[#4338CA]";

const mutedIdleClasses =
  "border border-slate-200 bg-slate-100 text-slate-400";

export default function CategoryIconPicker({
  selected,
  onChange,
  disabled = false,
  tone = "default",
}: CategoryIconPickerProps) {
  return (
    <div className="flex flex-wrap items-center">
      {categoryIconOptions.map((option) => {
        const isSelected = option.id === selected;
        const idle = tone === "muted" ? mutedIdleClasses : idleClasses;

        return (
          <button
            key={option.id}
            type="button"
            aria-label={`${option.label} icon`}
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => onChange?.(option.id)}
            className={`${baseClasses} ${isSelected ? selectedClasses : idle} ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}>
            <i className={option.iconClass}></i>
          </button>
        );
      })}
    </div>
  );
}
