export type KeywordSentiment = "Positive" | "Neutral" | "Negative";
export type SentimentFilter = "all" | "positive" | "neutral" | "negative";
export type TopicRange = "7" | "30" | "90" | "365";
export type KeywordRange = TopicRange | "all";
export type TopicSort = "Most Mentioned" | "Least Mentioned" | "Most Recent" | "Trending";
export type KeywordChartMode = "frequency" | "growth";
export type TrendDirection = "up" | "down" | "flat";
export type KeywordTone = "positive" | "negative" | "neutral";

export interface KeywordSummaryCard {
  id: string;
  label: string;
  value: string;
  valueLines?: string[];
  valueClasses: string;
  caption: string;
  badge: string;
  badgeClasses: string;
  badgeIcon?: string;
  icon: string;
  iconClasses: string;
}

export interface TrendingTopic {
  id: string;
  rank: number;
  name: string;
  icon: string;
  sentiment: KeywordSentiment;
  mentions: number;
  change: number;
  changeLabel: string;
  trend: TrendDirection;
  changeTone: KeywordTone;
  relatedFeedback: number;
  category: string;
  recency: number;
  sparkline: number[];
  anchor: string;
}

export interface KeywordBarRow {
  keyword: string;
  mentions: number;
  growth: number;
  growthTone: KeywordTone;
  dominant: KeywordSentiment;
  color: string;
  anchor: string;
  tooltip?: boolean;
}

export interface KeywordSentimentRow {
  keyword: string;
  stacked?: boolean;
  mentions: number;
  positive: number;
  neutral: number;
  negative: number;
  dominant: KeywordSentiment;
  anchor: string;
}

export interface TopicCluster {
  id: string;
  title: string;
  icon: string;
  mentions: number;
  sentiment: KeywordSentiment;
  keywords: { label: string; count: number }[];
  anchor: string;
}

export interface EmergingIssue {
  id: string;
  title: string;
  icon: string;
  iconClasses: string;
  accentClasses: string;
  sentiment: KeywordSentiment;
  priority: string;
  priorityClasses: string;
  stat: string;
  statIcon: string;
  statIconClasses: string;
  statLabel: string;
  description: string;
  chartPoints?: number[];
  chartColor?: string;
  ctaHref: string;
}

export const keywordNumberFormatter = new Intl.NumberFormat("en-US");

export const topicRangeOptions: { value: TopicRange; label: string }[] = [
  { value: "30", label: "Last 30 Days" },
  { value: "7", label: "Last 7 Days" },
  { value: "90", label: "Last 90 Days" },
  { value: "365", label: "Last Year" },
];

export const keywordRangeOptions: { value: KeywordRange; label: string }[] = [
  ...topicRangeOptions,
  { value: "all", label: "All Time" },
];

export const keywordCategoryOptions = [
  "All Categories",
  "Customer Support",
  "Product Quality",
  "Delivery",
  "Pricing",
];

export const keywordSortOptions: TopicSort[] = [
  "Most Mentioned",
  "Least Mentioned",
  "Most Recent",
  "Trending",
];

export const keywordSentimentOptions: {
  value: SentimentFilter;
  label: string;
  hoverClasses: string;
}[] = [
  { value: "all", label: "All", hoverClasses: "hover:text-[#4338CA]" },
  { value: "positive", label: "Positive", hoverClasses: "hover:text-green-600" },
  { value: "neutral", label: "Neutral", hoverClasses: "hover:text-slate-700" },
  { value: "negative", label: "Negative", hoverClasses: "hover:text-red-500" },
];

export const keywordRangeMultipliers: Record<KeywordRange, number> = {
  "7": 0.28,
  "30": 1,
  "90": 2.6,
  "365": 8.6,
  all: 14.6,
};

export const keywordDefaultTrend = 9.4;

export const keywordSentimentBadgeClasses: Record<KeywordSentiment, string> = {
  Positive: "bg-green-50 text-green-600",
  Neutral: "bg-amber-100 text-amber-600",
  Negative: "bg-red-50 text-red-500",
};

export const keywordTableSentimentClasses: Record<KeywordSentiment, string> = {
  Positive: "bg-green-50 text-green-600",
  Neutral: "bg-amber-50 text-amber-600",
  Negative: "bg-red-50 text-red-600",
};

export const keywordSentimentIcons: Record<KeywordSentiment, string> = {
  Positive: "fa-regular fa-face-smile",
  Neutral: "fa-regular fa-face-meh",
  Negative: "fa-regular fa-face-frown",
};

export const keywordSentimentDots: Record<KeywordSentiment, string> = {
  Positive: "bg-green-600",
  Neutral: "bg-amber-500",
  Negative: "bg-red-600",
};

export const keywordChangeToneClasses: Record<KeywordTone, string> = {
  positive: "bg-green-50 text-green-600",
  negative: "bg-red-50 text-red-500",
  neutral: "bg-slate-100 text-slate-500",
};

export const keywordGrowthToneClasses: Record<KeywordTone, string> = {
  positive: "text-green-600",
  negative: "text-red-500",
  neutral: "text-slate-500",
};

export const keywordChangeIcons: Record<TrendDirection, string | null> = {
  up: "fa-solid fa-arrow-trend-up",
  down: "fa-solid fa-arrow-trend-down",
  flat: null,
};

export function getKeywordRangeLabel(range: KeywordRange): string {
  switch (range) {
    case "7":
      return "last 7 days";
    case "90":
      return "last 90 days";
    case "365":
      return "last year";
    case "all":
      return "all time";
    default:
      return "last 30 days";
  }
}

export function getKeywordRangeTitle(range: KeywordRange): string {
  return keywordRangeOptions.find((option) => option.value === range)?.label ?? "Last 30 Days";
}

export function getSentimentFilterLabel(filter: SentimentFilter): string {
  if (filter === "all") return "All Sentiments";
  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

export function getKeywordAnchor(keyword: string): string {
  return `keyword-${keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export const keywordSummaryCards: KeywordSummaryCard[] = [
  {
    id: "total-keywords",
    label: "Total Keywords",
    value: "1,248",
    valueClasses: "text-4xl",
    caption: "+4.2% vs previous period",
    badge: "+4.2%",
    badgeClasses: "bg-green-50 text-green-600",
    badgeIcon: "fa-solid fa-arrow-trend-up",
    icon: "fa-solid fa-hashtag",
    iconClasses: "bg-[#EEECFF] text-[#4338CA]",
  },
  {
    id: "trending-topics",
    label: "Trending Topics",
    value: "18",
    valueClasses: "text-4xl",
    caption: "6 new this period",
    badge: "6 new",
    badgeClasses: "bg-blue-50 text-blue-600",
    icon: "fa-solid fa-arrow-trend-up",
    iconClasses: "bg-green-50 text-green-600",
  },
  {
    id: "emerging-issues",
    label: "Emerging Issues",
    value: "7",
    valueClasses: "text-4xl",
    caption: "Flagged for team attention",
    badge: "Needs review",
    badgeClasses: "bg-amber-100 text-amber-700",
    icon: "fa-solid fa-triangle-exclamation",
    iconClasses: "bg-amber-100 text-amber-500",
  },
  {
    id: "top-keyword",
    label: "Most Mentioned Keyword",
    value: "Customer Support",
    valueLines: ["Customer", "Support"],
    valueClasses: "text-3xl leading-9",
    caption: "1,284 mentions",
    badge: "Top keyword",
    badgeClasses: "border border-slate-200 bg-slate-50 text-slate-500",
    icon: "fa-solid fa-star",
    iconClasses: "bg-blue-50 text-blue-600",
  },
];

export const trendingTopics: TrendingTopic[] = [
  {
    id: "customer-support",
    rank: 1,
    name: "Customer Support",
    icon: "fa-regular fa-user",
    sentiment: "Positive",
    mentions: 1284,
    change: 12,
    changeLabel: "+12%",
    trend: "up",
    changeTone: "positive",
    relatedFeedback: 412,
    category: "Customer Support",
    recency: 1,
    sparkline: [27, 23, 25, 19, 21, 16, 18, 12, 15, 10],
    anchor: "keyword-helpful-support",
  },
  {
    id: "delivery-delays",
    rank: 2,
    name: "Delivery Delays",
    icon: "fa-solid fa-truck-fast",
    sentiment: "Negative",
    mentions: 962,
    change: 18,
    changeLabel: "+18%",
    trend: "up",
    changeTone: "negative",
    relatedFeedback: 318,
    category: "Delivery",
    recency: 3,
    sparkline: [27, 24, 26, 20, 22, 17, 19, 13, 16, 11],
    anchor: "keyword-delivery-delay",
  },
  {
    id: "product-quality",
    rank: 3,
    name: "Product Quality",
    icon: "fa-solid fa-box-open",
    sentiment: "Positive",
    mentions: 845,
    change: 0,
    changeLabel: "− 0%",
    trend: "flat",
    changeTone: "neutral",
    relatedFeedback: 276,
    category: "Product Quality",
    recency: 2,
    sparkline: [27, 24, 25, 21, 19, 20, 15, 17, 12, 13],
    anchor: "keyword-product-quality",
  },
  {
    id: "refund-requests",
    rank: 4,
    name: "Refund Requests",
    icon: "fa-solid fa-rotate-left",
    sentiment: "Negative",
    mentions: 604,
    change: -7,
    changeLabel: "-7%",
    trend: "down",
    changeTone: "positive",
    relatedFeedback: 203,
    category: "Pricing",
    recency: 5,
    sparkline: [27, 24, 25, 19, 22, 17, 19, 13, 16, 11],
    anchor: "keyword-refund-issue",
  },
  {
    id: "website-usability",
    rank: 5,
    name: "Website Usability",
    icon: "fa-solid fa-laptop",
    sentiment: "Neutral",
    mentions: 512,
    change: 4,
    changeLabel: "+4%",
    trend: "up",
    changeTone: "positive",
    relatedFeedback: 167,
    category: "Product Quality",
    recency: 6,
    sparkline: [27, 23, 25, 20, 22, 17, 19, 14, 16, 11],
    anchor: "keyword-easy-to-use",
  },
  {
    id: "pricing-concerns",
    rank: 6,
    name: "Pricing Concerns",
    icon: "fa-solid fa-tag",
    sentiment: "Negative",
    mentions: 438,
    change: 9,
    changeLabel: "+9%",
    trend: "up",
    changeTone: "negative",
    relatedFeedback: 142,
    category: "Pricing",
    recency: 4,
    sparkline: [27, 24, 26, 19, 21, 17, 19, 13, 16, 11],
    anchor: "keyword-payment-problem",
  },
];

export const keywordBarRows: KeywordBarRow[] = [
  {
    keyword: "Helpful Support",
    mentions: 1284,
    growth: 12,
    growthTone: "positive",
    dominant: "Positive",
    color: "#4338CA",
    anchor: "keyword-helpful-support",
  },
  {
    keyword: "Delivery Delay",
    mentions: 962,
    growth: 18,
    growthTone: "negative",
    dominant: "Negative",
    color: "#4F46D5",
    anchor: "keyword-delivery-delay",
    tooltip: true,
  },
  {
    keyword: "Product Quality",
    mentions: 845,
    growth: 0,
    growthTone: "neutral",
    dominant: "Positive",
    color: "#6366DB",
    anchor: "keyword-product-quality",
  },
  {
    keyword: "Refund Issue",
    mentions: 731,
    growth: -7,
    growthTone: "positive",
    dominant: "Negative",
    color: "#7181E2",
    anchor: "keyword-refund-issue",
  },
  {
    keyword: "Long Waiting Time",
    mentions: 604,
    growth: 6,
    growthTone: "negative",
    dominant: "Negative",
    color: "#8295E8",
    anchor: "keyword-long-waiting-time",
  },
  {
    keyword: "Easy to Use",
    mentions: 548,
    growth: 4,
    growthTone: "positive",
    dominant: "Positive",
    color: "#93A5EB",
    anchor: "keyword-easy-to-use",
  },
  {
    keyword: "Payment Problem",
    mentions: 512,
    growth: 9,
    growthTone: "negative",
    dominant: "Negative",
    color: "#A8B9F0",
    anchor: "keyword-payment-problem",
  },
  {
    keyword: "Fast Response",
    mentions: 467,
    growth: 15,
    growthTone: "positive",
    dominant: "Positive",
    color: "#C0D0F5",
    anchor: "keyword-fast-response",
  },
];

export const keywordSentimentRows: KeywordSentimentRow[] = [
  {
    keyword: "Customer Support",
    stacked: true,
    mentions: 1284,
    positive: 82,
    neutral: 12,
    negative: 6,
    dominant: "Positive",
    anchor: "keyword-helpful-support",
  },
  {
    keyword: "Delivery Delay",
    mentions: 962,
    positive: 14,
    neutral: 18,
    negative: 68,
    dominant: "Negative",
    anchor: "keyword-delivery-delay",
  },
  {
    keyword: "Product Quality",
    mentions: 845,
    positive: 71,
    neutral: 19,
    negative: 10,
    dominant: "Positive",
    anchor: "keyword-product-quality",
  },
  {
    keyword: "Refund",
    mentions: 731,
    positive: 21,
    neutral: 27,
    negative: 52,
    dominant: "Negative",
    anchor: "keyword-refund-issue",
  },
  {
    keyword: "Website Usability",
    stacked: true,
    mentions: 512,
    positive: 38,
    neutral: 41,
    negative: 21,
    dominant: "Neutral",
    anchor: "keyword-easy-to-use",
  },
];

export const topicClusters: TopicCluster[] = [
  {
    id: "customer-experience",
    title: "Customer Experience",
    icon: "fa-solid fa-users",
    mentions: 2930,
    sentiment: "Positive",
    keywords: [
      { label: "Helpful Support", count: 1284 },
      { label: "Fast Response", count: 467 },
      { label: "Staff Behaviour", count: 319 },
    ],
    anchor: "keyword-helpful-support",
  },
  {
    id: "delivery-shipping",
    title: "Delivery & Shipping",
    icon: "fa-solid fa-truck-fast",
    mentions: 1846,
    sentiment: "Negative",
    keywords: [
      { label: "Delivery Delay", count: 962 },
      { label: "Tracking Issue", count: 502 },
      { label: "Late Arrival", count: 382 },
    ],
    anchor: "keyword-delivery-delay",
  },
  {
    id: "product-quality",
    title: "Product & Quality",
    icon: "fa-solid fa-box",
    mentions: 1540,
    sentiment: "Positive",
    keywords: [
      { label: "Product Quality", count: 845 },
      { label: "Damaged Product", count: 362 },
      { label: "Product Performance", count: 333 },
    ],
    anchor: "keyword-product-quality",
  },
  {
    id: "payments-refunds",
    title: "Payments & Refunds",
    icon: "fa-regular fa-credit-card",
    mentions: 1498,
    sentiment: "Negative",
    keywords: [
      { label: "Refund Issue", count: 731 },
      { label: "Payment Failure", count: 421 },
      { label: "Billing Problem", count: 346 },
    ],
    anchor: "keyword-refund-issue",
  },
];

export const emergingIssues: EmergingIssue[] = [
  {
    id: "delivery-delays",
    title: "Delivery Delays",
    icon: "fa-solid fa-truck-fast",
    iconClasses: "bg-red-50 text-red-600",
    accentClasses: "border-t-red-500",
    sentiment: "Negative",
    priority: "High priority",
    priorityClasses: "bg-red-100 text-red-600",
    stat: "+18%",
    statIcon: "fa-solid fa-arrow-trend-up",
    statIconClasses: "text-red-600",
    statLabel: "mentions vs previous period",
    description: "Negative mentions appear to be increasing in the sample data.",
    chartPoints: [39, 33, 36, 25, 28, 15, 10, 3],
    chartColor: "#DC2626",
    ctaHref: "/admin/feedback",
  },
  {
    id: "refund-requests",
    title: "Refund Requests",
    icon: "fa-solid fa-arrow-rotate-left",
    iconClasses: "bg-red-50 text-red-600",
    accentClasses: "border-t-red-500",
    sentiment: "Negative",
    priority: "Medium priority",
    priorityClasses: "bg-amber-100 text-amber-700",
    stat: "604",
    statIcon: "fa-regular fa-comment-dots",
    statIconClasses: "text-slate-500",
    statLabel: "mentions in the last 30 days",
    description: "Customers frequently mention refund processing.",
    ctaHref: "/admin/feedback",
  },
  {
    id: "helpful-support",
    title: "Helpful Support",
    icon: "fa-solid fa-headset",
    iconClasses: "bg-green-50 text-green-600",
    accentClasses: "border-t-green-600",
    sentiment: "Positive",
    priority: "Opportunity",
    priorityClasses: "bg-blue-50 text-blue-600",
    stat: "+12%",
    statIcon: "fa-solid fa-arrow-trend-up",
    statIconClasses: "text-green-600",
    statLabel: "mentions vs previous period",
    description: "Positive mentions indicate appreciation for customer service.",
    chartPoints: [36, 31, 34, 23, 26, 16, 13, 7],
    chartColor: "#16A34A",
    ctaHref: "/admin/feedback",
  },
];
