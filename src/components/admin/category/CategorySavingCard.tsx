import {
  savingCategoryValues,
  savingDescriptionCount,
} from "@/data/admin/categoryModal";
import CategoryColorPicker from "./CategoryColorPicker";
import CategoryIconPicker from "./CategoryIconPicker";
import CategoryStatusRow from "./CategoryStatusRow";

const disabledFieldClasses =
  "w-full rounded-xl border border-[#E2E5EC] bg-slate-100 px-3.5 text-sm text-slate-500 outline-none disabled:cursor-not-allowed";

export default function CategorySavingCard() {
  return (
    <div className="w-full rounded-xl bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#111827]">Edit Category</h3>

          <p className="text-xs text-[#64748B]">
            Update the details of the hardware category.
          </p>
        </div>

        <button
          type="button"
          disabled
          aria-label="Close saving preview"
          className="ml-3 text-slate-400 disabled:cursor-not-allowed">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="saving-category-name"
          className="mb-1.5 block text-xs font-semibold text-[#111827]">
          Category Name *
        </label>

        <input
          id="saving-category-name"
          type="text"
          value={savingCategoryValues.name}
          disabled
          readOnly
          className={`${disabledFieldClasses} py-3`}
        />
      </div>

      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="saving-category-description"
            className="text-xs font-semibold text-[#111827]">
            Description
          </label>

          <span className="text-xs text-[#94A3B8]">
            {savingDescriptionCount}/150
          </span>
        </div>

        <textarea
          id="saving-category-description"
          rows={3}
          value={savingCategoryValues.description}
          disabled
          readOnly
          className={`${disabledFieldClasses} py-2.5`}></textarea>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-semibold text-[#111827]">
          Category Icon
        </label>

        <CategoryIconPicker
          selected={savingCategoryValues.icon}
          disabled
          tone="muted"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold text-[#111827]">
          Category Color
        </label>

        <CategoryColorPicker
          selected={savingCategoryValues.color}
          disabled
        />
      </div>

      <CategoryStatusRow active={savingCategoryValues.active} disabled />

      <div className="flex items-center justify-end border-t border-slate-100 pt-4">
        <button
          type="button"
          disabled
          className="mr-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 disabled:cursor-not-allowed">
          Cancel
        </button>

        <button
          type="button"
          disabled
          className="flex cursor-wait items-center rounded-xl bg-[#4338CA] px-5 py-2.5 text-xs font-semibold text-white opacity-80">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
          Saving...
        </button>
      </div>
    </div>
  );
}
