import type {
  CategoryRecord,
  FeedbackRecord,
  FeedbackSentiment,
  FeedbackStatus,
} from "@/type/type/admin.type";
import type { User } from "@/type/type/auth.type";

export interface FeedbackItem {
  id: number;
  customer: string;
  avatar: string;
  title: string;
  message: string;
  categoryName: string;
  source: string;
  sentiment: FeedbackSentiment;
  confidence: string;
  date: string;
  status: FeedbackStatus;
  createdAt: string;
}

export const sentimentBadgeClasses: Record<FeedbackSentiment, string> = {
  Positive: "bg-green-100 text-green-700",
  Neutral: "bg-yellow-100 text-yellow-700",
  Negative: "bg-red-100 text-red-700",
  Unknown: "bg-slate-100 text-slate-600",
};

export const statusBadgeClasses: Record<FeedbackStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  REVIEWED: "bg-green-100 text-green-700",
  NEEDS_ATTENTION: "bg-red-100 text-red-700",
};

export const FEEDBACK_PAGE_SIZE = 8;

function formatDisplayDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function mapFeedbackRecord(
  record: FeedbackRecord,
  categories: Map<number, CategoryRecord>,
  currentUser?: User | null,
): FeedbackItem {
  const isCurrentUser =
    currentUser !== null &&
    currentUser !== undefined &&
    String(record.user) === String(currentUser.id);

  const customer =
    isCurrentUser && currentUser.name ? currentUser.name : `User #${record.user}`;

  return {
    id: record.id,
    customer,
    avatar: `/assets/images/auth/profile-${(record.user % 3) + 1}.jpg`,
    title: record.title,
    message: record.text,
    categoryName: categories.get(record.category)?.name ?? `Category #${record.category}`,
    source: record.source || "website",
    sentiment: "Unknown",
    confidence: "—",
    date: formatDisplayDate(record.created_at),
    status: record.status,
    createdAt: record.created_at,
  };
}
