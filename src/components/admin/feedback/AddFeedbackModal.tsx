"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import {
  createCategory,
  createFeedback,
  fetchAdminAnalytics,
  fetchCategories,
} from "@/store/slices/admin.slice";

interface AddFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  title: string;
  message: string;
  categoryId: string;
  source: string;
}

const emptyForm: FormState = {
  title: "",
  message: "",
  categoryId: "",
  source: "website",
};

const fieldClasses =
  "w-full rounded-lg border border-gray-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60";

export default function AddFeedbackModal({ open, onClose }: AddFeedbackModalProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSeletor((state) => state.admin.categories);
  const categoriesError = useAppSeletor((state) => state.admin.categoriesError);
  const isCategoriesLoading = useAppSeletor((state) => state.admin.isCategoriesLoading);
  const isCategorySubmitting = useAppSeletor(
    (state) => state.admin.isCategorySubmitting,
  );
  const isFeedbackSubmitting = useAppSeletor(
    (state) => state.admin.isFeedbackSubmitting,
  );

  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string>("");
  const [showCategoryCreator, setShowCategoryCreator] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const handleClose = useCallback(() => {
    setError("");
    setShowCategoryCreator(false);
    setNewCategoryName("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [open, categories.length, dispatch]);

  const selectedCategoryId =
    form.categoryId || (categories[0] ? String(categories[0].id) : "");

  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();

    if (!name) {
      setError("Please enter a category name.");
      return;
    }

    try {
      const category = await dispatch(createCategory({ name })).unwrap();

      setForm((prev) => ({ ...prev, categoryId: String(category.id) }));
      setNewCategoryName("");
      setShowCategoryCreator(false);
      setError("");
      toast.success(`Category "${category.name}" created`);
    } catch (createError) {
      setError(
        typeof createError === "string"
          ? createError
          : "Unable to create the category. Please try again.",
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    const message = form.message.trim();
    const category = Number(selectedCategoryId);

    if (!title) {
      setError("Please enter a feedback title.");
      return;
    }

    if (!message) {
      setError("Please enter the feedback message.");
      return;
    }

    if (!Number.isInteger(category) || category <= 0) {
      setError("Please select a category.");
      return;
    }

    try {
      await dispatch(
        createFeedback({
          title,
          text: message,
          category,
          source: form.source.trim() || undefined,
        }),
      ).unwrap();

      toast.success("Feedback submitted successfully");
      dispatch(fetchAdminAnalytics());
      setForm(emptyForm);
      handleClose();
    } catch (submitError) {
      setError(
        typeof submitError === "string"
          ? submitError
          : "Unable to submit feedback. Please try again.",
      );
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-3 py-5 sm:px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold">Add Feedback</h3>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100"
            aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="add-feedback-title"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Title
            </label>
            <input
              id="add-feedback-title"
              type="text"
              maxLength={200}
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="e.g. Delivery experience"
              className={fieldClasses}
            />
          </div>

          <div>
            <label
              htmlFor="add-feedback-message"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Feedback
            </label>
            <textarea
              id="add-feedback-message"
              rows={4}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Enter the customer feedback..."
              className={`${fieldClasses} resize-none`}></textarea>
          </div>

          <div>
            <label
              htmlFor="add-feedback-category"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Category
            </label>
            <select
              id="add-feedback-category"
              value={selectedCategoryId}
              onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
              disabled={isCategoriesLoading || categories.length === 0}
              className={fieldClasses}>
              {categories.length === 0 && (
                <option value="">
                  {isCategoriesLoading ? "Loading categories..." : "No categories available"}
                </option>
              )}

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-400">
                {isCategoriesLoading
                  ? "Loading categories..."
                  : categories.length === 0
                    ? "Create a category before submitting feedback."
                    : `${categories.length} active ${
                        categories.length === 1 ? "category" : "categories"
                      } available.`}
              </p>

              <button
                type="button"
                onClick={() => setShowCategoryCreator((prev) => !prev)}
                className="whitespace-nowrap text-xs font-semibold text-blue-600 hover:text-blue-700">
                {showCategoryCreator ? "Cancel" : "New category"}
              </button>
            </div>

            {showCategoryCreator && (
              <div className="mt-2 flex flex-col gap-2 rounded-lg border border-gray-200 bg-slate-50 p-3 sm:flex-row">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(event) => setNewCategoryName(event.target.value)}
                  placeholder="Category name"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={isCategorySubmitting}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {isCategorySubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            )}

            {categoriesError && (
              <p className="mt-2 text-xs font-medium text-red-600">{categoriesError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="add-feedback-source"
              className="mb-1 block text-xs font-semibold uppercase text-slate-400">
              Source
            </label>
            <input
              id="add-feedback-source"
              type="text"
              value={form.source}
              onChange={(event) => setForm({ ...form, source: event.target.value })}
              placeholder="website"
              className={fieldClasses}
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isFeedbackSubmitting || categories.length === 0}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isFeedbackSubmitting ? "Submitting..." : "Add Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
