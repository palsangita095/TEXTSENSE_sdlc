"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  signalSources,
  type SignalSentiment,
} from "@/data/dashboard";
import type { NewFeedbackSignal } from "./dashboard-context";

interface SubmitFeedbackModalProps {
  onClose: () => void;
  onAdd: (signal: NewFeedbackSignal) => void;
}

interface FormState {
  source: string;
  message: string;
  sentiment: SignalSentiment;
}

const emptyForm: FormState = {
  source: signalSources[0].source,
  message: "",
  sentiment: "Positive",
};

const fieldClasses =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white";

export default function SubmitFeedbackModal({
  onClose,
  onAdd,
}: SubmitFeedbackModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = form.message.trim();

    if (!message) {
      setError("Please enter the feedback message.");
      return;
    }

    onAdd({
      source: form.source,
      message,
      sentiment: form.sentiment,
      confidenceValue: Math.floor(80 + Math.random() * 20),
    });

    toast.success("Feedback submitted successfully.");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-feedback-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3
            id="submit-feedback-title"
            className="text-lg font-bold text-slate-900">
            Submit Feedback
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close feedback form">
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          <div>
            <label
              htmlFor="dashboard-feedback-source"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Feedback Source
            </label>

            <select
              id="dashboard-feedback-source"
              value={form.source}
              onChange={(event) =>
                setForm({ ...form, source: event.target.value })
              }
              className={fieldClasses}>
              {signalSources.map((source) => (
                <option key={source.source} value={source.source}>
                  {source.source}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="dashboard-feedback-message"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Customer Message
            </label>

            <textarea
              id="dashboard-feedback-message"
              rows={4}
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              placeholder="Paste or write the customer feedback here..."
              className={`${fieldClasses} resize-none`}
            />
          </div>

          <div>
            <label
              htmlFor="dashboard-feedback-sentiment"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sentiment
            </label>

            <select
              id="dashboard-feedback-sentiment"
              value={form.sentiment}
              onChange={(event) =>
                setForm({
                  ...form,
                  sentiment: event.target.value as SignalSentiment,
                })
              }
              className={fieldClasses}>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </div>

          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
