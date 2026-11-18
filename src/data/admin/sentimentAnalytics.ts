export type SentimentRange = "7" | "30" | "90" | "365";
export type SentimentLabel = "Positive" | "Neutral" | "Negative";
export type DistributionView = "monthly" | "weekly";

export interface SentimentCounts {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentRangeOption {
  value: SentimentRange;
  label: string;
}

export interface SentimentTrendPoint {
  label: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface RecentSentimentFeedbackItem {
  id: number;
  date: string;
  feedback: string;
  category: string;
  sentiment: SentimentLabel;
  confidence: string;
}

export interface SentimentDistributionSegment {
  label: SentimentLabel;
  value: number;
  color: string;
}

export const sentimentNumberFormatter = new Intl.NumberFormat("en-US");

export const sentimentRangeOptions: SentimentRangeOption[] = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
  { value: "365", label: "Last 12 Months" },
];

export const sentimentByRange: Record<SentimentRange, SentimentCounts> = {
  "7": { total: 2940, positive: 1852, neutral: 647, negative: 441 },
  "30": { total: 12480, positive: 7862, neutral: 2746, negative: 1872 },
  "90": { total: 35400, positive: 22302, neutral: 7788, negative: 5310 },
  "365": { total: 152500, positive: 96075, neutral: 33550, negative: 22875 },
};

export const sentimentPalette: Record<
  SentimentLabel,
  {
    color: string;
    badgeClasses: string;
    textClasses: string;
    barClasses: string;
    dotClasses: string;
  }
> = {
  Positive: {
    color: "#16A34A",
    badgeClasses: "bg-[#ECFDF3] text-[#15803D]",
    textClasses: "text-[#15803D]",
    barClasses: "bg-[#16A34A]",
    dotClasses: "bg-[#16A34A]",
  },
  Neutral: {
    color: "#94A3B8",
    badgeClasses: "bg-[#F1F5F9] text-[#64748B]",
    textClasses: "text-[#64748B]",
    barClasses: "bg-[#94A3B8]",
    dotClasses: "bg-[#94A3B8]",
  },
  Negative: {
    color: "#DC2626",
    badgeClasses: "bg-[#FEE2E2] text-[#DC2626]",
    textClasses: "text-[#DC2626]",
    barClasses: "bg-[#DC2626]",
    dotClasses: "bg-[#DC2626]",
  },
};

export const sentimentStatTrends = {
  total: {
    value: "+12.5%",
    classes: "bg-[#ECFDF3] text-[#16A34A]",
    icon: "fa-solid fa-arrow-trend-up",
  },
  positive: {
    value: "+8.2%",
    classes: "bg-[#ECFDF3] text-[#16A34A]",
    icon: "",
  },
  neutral: {
    value: "+2.1%",
    classes: "bg-[#ECFDF3] text-[#16A34A]",
    icon: "",
  },
  negative: {
    value: "-4.3%",
    classes: "bg-[#FEF2F2] text-[#DC2626]",
    icon: "",
  },
};

export const sentimentTrendSeries: Record<SentimentRange, SentimentTrendPoint[]> = {
  "7": [
    { label: "Mon", positive: 58, neutral: 24, negative: 18 },
    { label: "Tue", positive: 61, neutral: 23, negative: 16 },
    { label: "Wed", positive: 60, neutral: 25, negative: 15 },
    { label: "Thu", positive: 64, neutral: 22, negative: 14 },
    { label: "Fri", positive: 62, neutral: 24, negative: 14 },
    { label: "Sat", positive: 66, neutral: 21, negative: 13 },
    { label: "Sun", positive: 63, neutral: 22, negative: 15 },
  ],
  "30": [
    { label: "Oct 01", positive: 45, neutral: 34, negative: 20 },
    { label: "Oct 05", positive: 51, neutral: 30, negative: 18 },
    { label: "Oct 10", positive: 48, neutral: 33, negative: 18 },
    { label: "Oct 15", positive: 59, neutral: 28, negative: 12 },
    { label: "Oct 20", positive: 54, neutral: 31, negative: 13 },
    { label: "Oct 25", positive: 67, neutral: 25, negative: 7 },
    { label: "Oct 30", positive: 74, neutral: 20, negative: 5 },
  ],
  "90": [
    { label: "Aug 1", positive: 52, neutral: 27, negative: 21 },
    { label: "Aug 15", positive: 55, neutral: 26, negative: 19 },
    { label: "Sep 1", positive: 58, neutral: 25, negative: 17 },
    { label: "Sep 15", positive: 57, neutral: 24, negative: 19 },
    { label: "Oct 1", positive: 61, neutral: 23, negative: 16 },
    { label: "Oct 30", positive: 63, neutral: 22, negative: 15 },
  ],
  "365": [
    { label: "Jan", positive: 45, neutral: 30, negative: 25 },
    { label: "Feb", positive: 48, neutral: 29, negative: 23 },
    { label: "Mar", positive: 50, neutral: 28, negative: 22 },
    { label: "Apr", positive: 52, neutral: 27, negative: 21 },
    { label: "May", positive: 51, neutral: 29, negative: 20 },
    { label: "Jun", positive: 55, neutral: 26, negative: 19 },
    { label: "Jul", positive: 57, neutral: 25, negative: 18 },
    { label: "Aug", positive: 56, neutral: 26, negative: 18 },
    { label: "Sep", positive: 59, neutral: 24, negative: 17 },
    { label: "Oct", positive: 60, neutral: 24, negative: 16 },
    { label: "Nov", positive: 62, neutral: 23, negative: 15 },
    { label: "Dec", positive: 63, neutral: 22, negative: 15 },
  ],
};

export const recentSentimentFeedback: RecentSentimentFeedbackItem[] = [
  {
    id: 1,
    date: "Oct 28, 2024",
    feedback: "The new dashboard is excellent and very easy to use.",
    category: "Product",
    sentiment: "Positive",
    confidence: "98.5%",
  },
  {
    id: 2,
    date: "Oct 27, 2024",
    feedback: "The service was okay, but there is room for improvement.",
    category: "Service",
    sentiment: "Neutral",
    confidence: "91.2%",
  },
  {
    id: 3,
    date: "Oct 26, 2024",
    feedback: "I experienced multiple errors while trying to log in.",
    category: "Technical",
    sentiment: "Negative",
    confidence: "96.8%",
  },
  {
    id: 4,
    date: "Oct 25, 2024",
    feedback: "Customer support resolved my issue very quickly.",
    category: "Support",
    sentiment: "Positive",
    confidence: "97.4%",
  },
  {
    id: 5,
    date: "Oct 24, 2024",
    feedback: "The pricing seems reasonable for the features provided.",
    category: "Billing",
    sentiment: "Neutral",
    confidence: "89.6%",
  },
];

const distributionWeights: Record<DistributionView, Record<SentimentLabel, number>> = {
  monthly: { Positive: 1, Neutral: 1, Negative: 1 },
  weekly: { Positive: 1.04, Neutral: 0.94, Negative: 0.9 },
};

export function getSentimentPercentages(summary: SentimentCounts) {
  const divisor = summary.total || 1;

  return {
    positive: Math.round((summary.positive / divisor) * 100),
    neutral: Math.round((summary.neutral / divisor) * 100),
    negative: Math.round((summary.negative / divisor) * 100),
  };
}

export function getDistributionSegments(
  summary: SentimentCounts,
  view: DistributionView,
): SentimentDistributionSegment[] {
  const weights = distributionWeights[view];
  const weighted = {
    Positive: summary.positive * weights.Positive,
    Neutral: summary.neutral * weights.Neutral,
    Negative: summary.negative * weights.Negative,
  };
  const weightedTotal = weighted.Positive + weighted.Neutral + weighted.Negative;

  return (Object.keys(weighted) as SentimentLabel[]).map((label) => ({
    label,
    value: weightedTotal === 0 ? 0 : (weighted[label] / weightedTotal) * 100,
    color: sentimentPalette[label].color,
  }));
}

export function getRangeLabel(range: SentimentRange): string {
  return sentimentRangeOptions.find((option) => option.value === range)?.label ?? "Last 30 Days";
}
