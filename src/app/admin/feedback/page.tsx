import type { Metadata } from "next";
import FeedbackManagement from "@/components/admin/feedback/FeedbackManagement";

export const metadata: Metadata = {
  title: "Feedback Management | TEXTSENSE",
};

export default function FeedbackPage() {
  return (
    <main className="relative min-w-0 flex-1 overflow-x-hidden px-4 pb-8 sm:px-6 lg:px-8">
      <div className="relative z-10">
        <FeedbackManagement />
      </div>
    </main>
  );
}
