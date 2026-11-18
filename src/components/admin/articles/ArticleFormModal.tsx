"use client";

import {
  useRef,
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";
import type {
  ArticleRecord,
  ArticleStatus,
} from "@/type/type/content.type";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import {
  clearContentError,
  createArticle,
  updateArticle,
} from "@/store/slices/content.slice";
import ArticleModalShell from "./ArticleModalShell";

interface ArticleFormModalProps {
  open: boolean;
  article: ArticleRecord | null;
  onClose: () => void;
}

interface ArticleFormState {
  title: string;
  content: string;
  meta_title: string;
  meta_description: string;
  status: ArticleStatus;
}

type ArticleFormErrors = Partial<Record<keyof ArticleFormState, string>>;

const emptyForm: ArticleFormState = {
  title: "",
  content: "",
  meta_title: "",
  meta_description: "",
  status: "DRAFT",
};

const fieldBaseClasses =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 280);
}

function toFormState(article: ArticleRecord | null): ArticleFormState {
  if (!article) return emptyForm;

  return {
    title: article.title,
    content: article.content,
    meta_title: article.meta_title ?? "",
    meta_description: article.meta_description ?? "",
    status: article.status,
  };
}

function validate(form: ArticleFormState): ArticleFormErrors {
  const errors: ArticleFormErrors = {};

  if (!form.title.trim()) {
    errors.title = "Article title is required.";
  } else if (form.title.trim().length > 255) {
    errors.title = "Title must be 255 characters or fewer.";
  }

  if (!form.content.trim()) {
    errors.content = "Article content is required.";
  }

  if (form.meta_title.trim().length > 255) {
    errors.meta_title = "Meta title must be 255 characters or fewer.";
  }

  return errors;
}

export default function ArticleFormModal({
  open,
  article,
  onClose,
}: ArticleFormModalProps) {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSeletor((state) => state.content.isSubmitting);
  const serverError = useAppSeletor((state) => state.content.error);

  const [form, setForm] = useState<ArticleFormState>(() => toFormState(article));
  const [errors, setErrors] = useState<ArticleFormErrors>({});
  const [submitError, setSubmitError] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const metaTitleRef = useRef<HTMLInputElement>(null);

  const updateField = <Key extends keyof ArticleFormState>(
    key: Key,
    value: ArticleFormState[Key],
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));

    if (errors[key]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[key];
        return next;
      });
    }

    if (submitError || serverError) {
      setSubmitError("");
      dispatch(clearContentError());
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    dispatch(clearContentError());
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError("");

    if (nextErrors.title) {
      titleRef.current?.focus();
      return;
    }

    if (nextErrors.content) {
      contentRef.current?.focus();
      return;
    }

    if (nextErrors.meta_title) {
      metaTitleRef.current?.focus();
      return;
    }

    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      meta_title: form.meta_title.trim(),
      meta_description: form.meta_description.trim(),
      status: form.status,
    };

    try {
      if (article) {
        await dispatch(
          updateArticle({ slug: article.slug, payload }),
        ).unwrap();
        toast.success("Article updated successfully");
      } else {
        await dispatch(createArticle(payload)).unwrap();
        toast.success("Article created successfully");
      }

      onClose();
    } catch (error) {
      setSubmitError(
        typeof error === "string"
          ? error
          : "Unable to save the article. Please try again.",
      );
    }
  };

  const displayError = submitError || serverError;
  const slugPreview = article ? article.slug : slugify(form.title) || "your-article-slug";
  const wordCount = form.content.trim()
    ? form.content.trim().split(/\s+/).length
    : 0;
  const metaDescriptionCount = form.meta_description.length;

  return (
    <ArticleModalShell
      open={open}
      onClose={handleClose}
      labelledBy="article-form-title"
      closeDisabled={isSubmitting}
      maxWidthClass="max-w-2xl">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <i className="fa-regular fa-file-lines"></i>
          </div>

          <div>
            <h2
              id="article-form-title"
              className="text-lg font-bold text-slate-900">
              {article ? "Edit Article" : "New Article"}
            </h2>

            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
              {article
                ? `Editing "${article.title}"`
                : "Write, optimize, and publish a new article."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close article form"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          {displayError && (
            <div
              role="alert"
              className="flex items-start rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <i className="fa-solid fa-circle-exclamation mr-2 mt-0.5"></i>
              <p>{displayError}</p>
            </div>
          )}

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="article-title"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Article Title *
              </label>

              <span
                className={`text-[11px] ${
                  form.title.length > 255 ? "text-red-500" : "text-slate-400"
                }`}>
                {form.title.length}/255
              </span>
            </div>

            <input
              ref={titleRef}
              id="article-title"
              type="text"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="e.g. Introduction to Natural Language Processing"
              disabled={isSubmitting}
              autoFocus
              aria-invalid={Boolean(errors.title)}
              aria-describedby="article-title-error"
              className={`${fieldBaseClasses} ${
                errors.title
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}
            />

            <p
              id="article-title-error"
              aria-live="polite"
              className={`mt-1.5 text-xs text-red-500 ${
                errors.title ? "" : "hidden"
              }`}>
              {errors.title}
            </p>

            <p className="mt-1.5 flex items-center gap-1.5 break-all text-[11px] text-slate-400">
              <i className="fa-solid fa-link text-[9px]"></i>
              {slugPreview}
            </p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="article-content"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Content *
              </label>

              <span className="text-[11px] text-slate-400">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
            </div>

            <textarea
              ref={contentRef}
              id="article-content"
              rows={8}
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              placeholder="Write the article body here..."
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.content)}
              aria-describedby="article-content-error"
              className={`${fieldBaseClasses} resize-y leading-6 ${
                errors.content
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              }`}></textarea>

            <p
              id="article-content-error"
              aria-live="polite"
              className={`mt-1.5 text-xs text-red-500 ${
                errors.content ? "" : "hidden"
              }`}>
              {errors.content}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Publishing Status
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    value: "DRAFT",
                    label: "Draft",
                    description: "Work in progress, only visible to admins.",
                    icon: "fa-regular fa-file-lines",
                    activeClasses:
                      "border-amber-300 bg-amber-50 ring-2 ring-amber-100",
                    iconClasses: "bg-amber-100 text-amber-600",
                    checkClasses: "text-amber-600",
                  },
                  {
                    value: "PUBLISHED",
                    label: "Published",
                    description: "Visible publicly and live on the site.",
                    icon: "fa-solid fa-globe",
                    activeClasses:
                      "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-100",
                    iconClasses: "bg-emerald-100 text-emerald-600",
                    checkClasses: "text-emerald-600",
                  },
                ] as const
              ).map((option) => {
                const isSelected = form.status === option.value;

                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 transition ${
                      isSelected
                        ? option.activeClasses
                        : "border-slate-200 bg-white hover:border-slate-300"
                    } ${
                      isSubmitting
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer"
                    }`}>
                    <input
                      type="radio"
                      name="article-status"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => updateField("status", option.value)}
                      disabled={isSubmitting}
                      className="sr-only"
                    />

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${option.iconClasses}`}>
                      <i className={`${option.icon} text-xs`}></i>
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs font-bold text-slate-800">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                        {option.description}
                      </span>
                    </span>

                    {isSelected && (
                      <i
                        className={`fa-solid fa-circle-check ml-auto mt-1 text-xs ${option.checkClasses}`}></i>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                <i className="fa-solid fa-magnifying-glass mr-2 text-slate-400"></i>
                SEO Metadata
              </p>

              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Optional
              </span>
            </div>

            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="article-meta-title"
                  className="text-[11px] font-semibold text-slate-600">
                  Meta Title
                </label>

                <span
                  className={`text-[10px] ${
                    form.meta_title.length > 255
                      ? "text-red-500"
                      : "text-slate-400"
                  }`}>
                  {form.meta_title.length}/255
                </span>
              </div>

              <input
                ref={metaTitleRef}
                id="article-meta-title"
                type="text"
                value={form.meta_title}
                onChange={(event) => updateField("meta_title", event.target.value)}
                placeholder="SEO title shown in search results"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.meta_title)}
                aria-describedby="article-meta-title-error"
                className={`${fieldBaseClasses} !bg-white ${
                  errors.meta_title
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                }`}
              />

              <p
                id="article-meta-title-error"
                aria-live="polite"
                className={`mt-1.5 text-xs text-red-500 ${
                  errors.meta_title ? "" : "hidden"
                }`}>
                {errors.meta_title}
              </p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="article-meta-description"
                  className="text-[11px] font-semibold text-slate-600">
                  Meta Description
                </label>

                <span
                  className={`text-[10px] ${
                    metaDescriptionCount > 160
                      ? "font-semibold text-amber-600"
                      : "text-slate-400"
                  }`}>
                  {metaDescriptionCount}/160
                </span>
              </div>

              <textarea
                id="article-meta-description"
                rows={2}
                value={form.meta_description}
                onChange={(event) =>
                  updateField("meta_description", event.target.value)
                }
                placeholder="Short summary for search engines"
                disabled={isSubmitting}
                className={`${fieldBaseClasses} resize-none !bg-white border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}></textarea>

              {metaDescriptionCount > 160 && (
                <p className="mt-1 text-[10px] text-amber-600">
                  Aim for 160 characters or fewer for best search visibility.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80">
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i
                  className={`mr-2 ${
                    article ? "fa-solid fa-floppy-disk" : "fa-solid fa-plus"
                  }`}></i>
                {article ? "Save Changes" : "Create Article"}
              </>
            )}
          </button>
        </div>
      </form>
    </ArticleModalShell>
  );
}
