"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  categoryDescriptionLimit,
  emptyCategoryValues,
  isDescriptionOverLimit,
  type CategoryFormValues,
  type SavedCategory,
} from "@/data/admin/categoryModal";
import CategoryColorPicker from "./CategoryColorPicker";
import CategoryIconPicker from "./CategoryIconPicker";
import CategoryStatusRow from "./CategoryStatusRow";

type CategoryErrorField = "name" | "description";
type CategoryErrors = Partial<Record<CategoryErrorField, string>>;

interface CategoryAddFormProps {
  onSaved: (category: SavedCategory) => void;
}

function validate(values: CategoryFormValues): CategoryErrors {
  const errors: CategoryErrors = {};

  if (!values.name.trim()) {
    errors.name = "Category name is required.";
  }

  if (isDescriptionOverLimit(values.description)) {
    errors.description = `Description must be ${categoryDescriptionLimit} characters or fewer.`;
  }

  return errors;
}

const fieldBaseClasses =
  "w-full rounded-xl border bg-[#F7F8FC] px-3.5 text-sm text-slate-700 outline-none transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500";

export default function CategoryAddForm({ onSaved }: CategoryAddFormProps) {
  const [values, setValues] = useState<CategoryFormValues>(emptyCategoryValues);
  const [errors, setErrors] = useState<CategoryErrors>({});
  const [saving, setSaving] = useState(false);

  const fieldId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const nameId = `${fieldId}-category-name`;
  const descriptionId = `${fieldId}-category-description`;
  const nameErrorId = `${fieldId}-category-name-error`;
  const descriptionErrorId = `${fieldId}-category-description-error`;
  const descriptionCountId = `${fieldId}-category-description-count`;

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetForm = () => {
    if (saving) return;

    setValues(emptyCategoryValues);
    setErrors({});
  };

  const updateField = <Key extends keyof CategoryFormValues>(
    key: Key,
    value: CategoryFormValues[Key],
  ) => {
    setValues((previous) => ({ ...previous, [key]: value }));

    if (key !== "name" && key !== "description") return;

    const field = key as CategoryErrorField;

    setErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (nextErrors.description) {
      descriptionRef.current?.focus();
      return;
    }

    const savedCategory: SavedCategory = {
      name: values.name.trim(),
      color: values.color,
      active: values.active,
    };

    setSaving(true);

    timeoutRef.current = window.setTimeout(() => {
      setSaving(false);
      setValues(emptyCategoryValues);
      setErrors({});
      onSaved(savedCategory);
      toast.success("Category saved successfully");
    }, 1400);
  };

  const descriptionCount = values.description.length;
  const descriptionOverLimit = isDescriptionOverLimit(values.description);

  const nameClasses = `${fieldBaseClasses} py-3 ${
    errors.name
      ? "border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
      : "border-[#E2E5EC] focus:border-[#4338CA]"
  }`;

  const descriptionClasses = `${fieldBaseClasses} py-2.5 ${
    errors.description
      ? "border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
      : "border-[#E2E5EC] focus:border-[#4338CA]"
  }`;

  return (
    <div className="w-full rounded-xl bg-white p-5 sm:p-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Add Category</h3>

            <p className="text-xs text-[#64748B]">
              Create a new category to organize customer feedback.
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            disabled={saving}
            aria-label="Reset category form"
            className="ml-3 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed disabled:text-slate-300">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor={nameId}
            className="mb-1.5 block text-xs font-semibold text-[#111827]">
            Category Name *
          </label>

          <input
            ref={nameRef}
            id={nameId}
            type="text"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="e.g. Customer Support"
            disabled={saving}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={nameErrorId}
            className={nameClasses}
          />

          <p
            id={nameErrorId}
            aria-live="polite"
            className={`mt-1.5 text-xs text-red-500 ${errors.name ? "" : "hidden"}`}>
            {errors.name}
          </p>
        </div>

        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor={descriptionId}
              className="text-xs font-semibold text-[#111827]">
              Description
            </label>

            <span
              id={descriptionCountId}
              className={
                descriptionOverLimit
                  ? "text-xs font-semibold text-red-500"
                  : "text-xs text-[#94A3B8]"
              }>
              {descriptionCount}/{categoryDescriptionLimit}
            </span>
          </div>

          <textarea
            ref={descriptionRef}
            id={descriptionId}
            rows={3}
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Add a description for this category..."
            disabled={saving}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={`${descriptionCountId} ${descriptionErrorId}`}
            className={descriptionClasses}></textarea>

          <p
            id={descriptionErrorId}
            aria-live="polite"
            className={`mt-1.5 text-xs text-red-500 ${
              errors.description ? "" : "hidden"
            }`}>
            {errors.description}
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-[#111827]">
            Category Icon
          </label>

          <CategoryIconPicker
            selected={values.icon}
            onChange={(icon) => updateField("icon", icon)}
            disabled={saving}
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold text-[#111827]">
            Category Color
          </label>

          <CategoryColorPicker
            selected={values.color}
            onChange={(color) => updateField("color", color)}
            disabled={saving}
          />
        </div>

        <CategoryStatusRow
          active={values.active}
          onToggle={() => updateField("active", !values.active)}
          disabled={saving}
        />

        <div className="flex items-center justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={resetForm}
            disabled={saving}
            className="mr-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#64748B] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400">
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center rounded-xl bg-[#4338CA] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3730A3] active:scale-95 disabled:cursor-wait disabled:opacity-80">
            {saving ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              "Save Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
