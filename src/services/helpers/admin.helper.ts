import {
  AdminAnalytics,
  CategorySegment,
  FeedbackStatus,
  KeywordSegment,
  SentimentCounts,
  SentimentLabel,
  SentimentPercentages,
} from "@/type/type/admin.type";

export const sentimentLabels: SentimentLabel[] = ["Positive", "Neutral", "Negative"];

export const feedbackStatusLabels: Record<FeedbackStatus, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  NEEDS_ATTENTION: "Needs Attention",
};

const categoryPalette = [
  { colorClass: "bg-blue-600", labelClasses: "text-blue-700" },
  { colorClass: "bg-purple-600", labelClasses: "text-purple-700" },
  { colorClass: "bg-orange-500", labelClasses: "text-orange-700" },
  { colorClass: "bg-emerald-600", labelClasses: "text-emerald-700" },
  { colorClass: "bg-pink-600", labelClasses: "text-pink-700" },
  { colorClass: "bg-indigo-600", labelClasses: "text-indigo-700" },
  { colorClass: "bg-cyan-600", labelClasses: "text-cyan-700" },
];

export const numberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return numberFormatter.format(value);
}

export function formatKeyword(term: string): string {
  if (!term) return "—";
  return term.charAt(0).toUpperCase() + term.slice(1);
}

export function getSentimentCounts(analytics: AdminAnalytics | null): SentimentCounts {
  const counts: SentimentCounts = {
    total: analytics?.total_analyzed ?? 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  analytics?.sentiment_distribution.forEach((item) => {
    const key = item.sentiment?.toLowerCase();

    if (key === "positive") counts.positive = item.count;
    else if (key === "neutral") counts.neutral = item.count;
    else if (key === "negative") counts.negative = item.count;
  });

  return counts;
}

export function getSentimentPercentages(counts: SentimentCounts): SentimentPercentages {
  const divisor = counts.total || 0;

  const toPercentage = (value: number) =>
    divisor === 0 ? 0 : Math.round((value / divisor) * 100);

  return {
    positive: toPercentage(counts.positive),
    neutral: toPercentage(counts.neutral),
    negative: toPercentage(counts.negative),
  };
}

export function getStatusCounts(analytics: AdminAnalytics | null): Record<string, number> {
  return (analytics?.status_distribution ?? []).reduce<Record<string, number>>(
    (accumulator, item) => {
      accumulator[item.status] = item.count;
      return accumulator;
    },
    {},
  );
}

export function getAnalysisCoverage(analytics: AdminAnalytics | null): number {
  if (!analytics || analytics.total_feedback === 0) return 0;

  return Math.round((analytics.total_analyzed / analytics.total_feedback) * 100);
}

export function getCategorySegments(
  analytics: AdminAnalytics | null,
  limit = 5,
): CategorySegment[] {
  const items = analytics?.category_distribution ?? [];
  const total = items.reduce((sum, item) => sum + item.count, 0);

  return items.slice(0, limit).map((item, index) => {
    const percentage = total === 0 ? 0 : Math.round((item.count / total) * 100);
    const palette = categoryPalette[index % categoryPalette.length];

    return {
      name: item.category__name || "Uncategorized",
      count: item.count,
      percentage,
      width: item.count === 0 ? 0 : Math.max(4, percentage),
      colorClass: palette.colorClass,
      labelClasses: palette.labelClasses,
    };
  });
}

export function getKeywordSegments(
  analytics: AdminAnalytics | null,
  limit = 5,
): KeywordSegment[] {
  const keywords = (analytics?.top_keywords ?? []).slice(0, limit);
  const maxFrequency = keywords.reduce((max, item) => Math.max(max, item.frequency), 0);

  return keywords.map((item) => ({
    label: formatKeyword(item.term),
    description: `Relevance ${Math.round((item.relevance || 0) * 100)}%`,
    count: formatNumber(item.frequency),
    width: maxFrequency === 0 ? 0 : Math.max(4, Math.round((item.frequency / maxFrequency) * 100)),
  }));
}
