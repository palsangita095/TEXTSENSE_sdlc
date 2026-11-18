"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  validationCategoryValues,
  validationDescriptionCount,
  type CategoryIconId,
} from "@/data/admin/categoryModal";
import CategoryColorPicker from "./CategoryColorPicker";
import CategoryIconPicker from "./CategoryIconPicker";
import CategoryStatusRow from "./CategoryStatusRow";

export default function CategoryValidationCard() {
  const [icon, setIcon] = useState<CategoryIconId>(validationCategoryValues.icon);
  const [color, setColor] = useState(validationCategoryValues.color);
  const [active, setActive] = useState(validationCategoryValues.active);

  return (
    <div className="w-full rounded-xl border-2 border-red-200 bg-white p-5 shadow-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#111827]">Add Category</h3>

          <p className="text-xs text-[#64748B]">
            Create a new category to organize customer feedback.
          </p>
        </div>

        <button
          type="button"
          aria-label="Reset validation preview"
          onClick={() => {
            setIcon(validationCategoryValues.icon);
            setColor(validationCategoryValues.color);
            setActive(validationCategoryValues.active);
          }}
          className="ml-3 text-slate-400 transition hover:text-slate-700">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="validation-category-name"
          className="mb-1.5 block text-xs font-semibold text-[#111827]">
          Category Name *
        </label>

        <input
          id="validation-category-name"
          type="text"
          defaultValue={validationCategoryValues.name}
          className="w-full rounded-xl border border-[#E2E5EC] bg-[#F7F8FC] px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="validation-category-description"
            className="text-xs font-semibold text-[#111827]">
            Description
          </label>

          <span className="text-xs font-semibold text-red-500">
            {validationDescriptionCount}/150
          </span>
        </div>

        <textarea
          id="validation-category-description"
          rows={3}
          defaultValue={validationCategoryValues.description}
          className="w-full resize-none rounded-xl border border-[#E2E5EC] bg-[#F7F8FC] px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"></textarea>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-semibold text-[#111827]">
          Category Icon
        </label>

        <CategoryIconPicker selected={icon} onChange={setIcon} />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold text-[#111827]">
          Category Color
        </label>

        <CategoryColorPicker selected={color} onChange={setColor} />
      </div>

      <CategoryStatusRow active={active} onToggle={() => setActive(!active)} />

      <div className="flex flex-wrap items-center justify-end border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => {
            setIcon(validationCategoryValues.icon);
            setColor(validationCategoryValues.color);
            setActive(validationCategoryValues.active);
          }}
          className="mr-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#64748B] transition hover:bg-slate-100">
          Cancel
        </button>

        <button
          type="button"
          onClick={() =>
            toast.error("Description must be 150 characters or fewer.")
          }
          className="cursor-pointer rounded-xl bg-[#4338CA] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3730A3] active:scale-95">
          Save Category
        </button>
      </div>
    </div>
  );
}
