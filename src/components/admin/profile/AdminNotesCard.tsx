"use client";

import { useState } from "react";
import { toast } from "sonner";
import { initialAdminNotes, type AdminNote } from "@/data/admin/profile";

export default function AdminNotesCard() {
  const [notes, setNotes] = useState<AdminNote[]>(initialAdminNotes);
  const [noteText, setNoteText] = useState<string>("");

  const saveNote = () => {
    const text = noteText.trim();

    if (!text) {
      toast.error("Write a note before saving");
      return;
    }

    const note: AdminNote = {
      id: Date.now(),
      text,
      author: "Admin User",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes((prev) => [note, ...prev]);
    setNoteText("");
    toast.success("Note saved");
  };

  return (
    <section className="mb-6 rounded-2xl border border-[#E2E5EC] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">Admin notes</h2>
        <span className="text-sm text-[#64748B]">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>

      <textarea
        value={noteText}
        onChange={(event) => setNoteText(event.target.value)}
        rows={4}
        placeholder="Add a private note about this user..."
        className="mt-5 w-full resize-none rounded-xl border border-[#E2E5EC] bg-[#F8FAFC] px-4 py-3.5 text-sm text-[#334155] outline-none transition placeholder:text-[#94A3B8] focus:border-[#4338CA] focus:bg-white"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={saveNote}
          className="rounded-xl bg-[#4338CA] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3730A3] sm:text-[15px]">
          Save note
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-xl bg-[#F8FAFC] p-4 sm:p-5">
            <p className="text-sm font-medium leading-6 text-[#334155] sm:text-[15px]">
              {note.text}
            </p>
            <p className="mt-3 text-sm text-[#94A3B8]">
              {note.author} · {note.date}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-center border-t border-[#EEF1F6] pt-4 text-sm text-[#64748B]">
        <i className="fa-solid fa-lock mr-2 text-xs"></i>
        Visible to admins only
      </p>
    </section>
  );
}
