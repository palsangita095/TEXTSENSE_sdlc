export type SignalSentiment = "Positive" | "Neutral" | "Negative";
export type ChartPeriod = "week" | "month";

export interface FeedbackSignal {
  id: number;
  source: string;
  icon: string;
  iconClasses: string;
  time: string;
  message: string;
  preview: string;
  sentiment: SignalSentiment;
  confidence: string;
  confidenceValue: number;
}

export interface SignalSource {
  source: string;
  icon: string;
  iconClasses: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  valueSuffix?: string;
  description: string;
  icon: string;
  iconClasses: string;
  trend: string;
  trendClasses: string;
  trendIcon?: string;
}

export interface DashboardTopic {
  id: string;
  status: string;
  statusClasses: string;
  trend: string;
  trendIcon?: string;
  title: string;
  description: string;
}

export interface ChartPoint {
  x: number;
  y: number;
  label: string;
}

export interface SentimentSeries {
  points: ChartPoint[];
  linePath: string;
}

export interface DashboardNotification {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  iconClasses: string;
}

export const SIGNAL_TOTAL = 142;
export const SIGNALS_PER_PAGE = 3;

export const signalSources: SignalSource[] = [
  {
    source: "Instagram Chat",
    icon: "fa-solid fa-comments",
    iconClasses: "bg-indigo-50 text-indigo-600",
  },
  {
    source: "App Store Review",
    icon: "fa-regular fa-envelope",
    iconClasses: "bg-rose-50 text-rose-600",
  },
  {
    source: "Website Feedback",
    icon: "fa-solid fa-globe",
    iconClasses: "bg-blue-50 text-blue-600",
  },
  {
    source: "Support Chat",
    icon: "fa-regular fa-comment-dots",
    iconClasses: "bg-violet-50 text-violet-600",
  },
  {
    source: "Email Survey",
    icon: "fa-regular fa-envelope-open",
    iconClasses: "bg-amber-50 text-amber-600",
  },
  {
    source: "Product Review",
    icon: "fa-solid fa-star",
    iconClasses: "bg-cyan-50 text-cyan-600",
  },
];

export const sentimentStyles: Record<
  SignalSentiment,
  { badgeClasses: string; dotClasses: string; barClasses: string }
> = {
  Positive: {
    badgeClasses: "bg-emerald-50 text-emerald-700",
    dotClasses: "bg-emerald-500",
    barClasses: "bg-indigo-500",
  },
  Negative: {
    badgeClasses: "bg-rose-50 text-rose-700",
    dotClasses: "bg-rose-500",
    barClasses: "bg-rose-500",
  },
  Neutral: {
    badgeClasses: "bg-sky-50 text-sky-700",
    dotClasses: "bg-sky-500",
    barClasses: "bg-sky-500",
  },
};

export const dashboardStats: DashboardStat[] = [
  {
    id: "total-analysed",
    label: "Total Analysed",
    value: "24,892",
    description: "Compared with last month",
    icon: "fa-solid fa-chart-column",
    iconClasses: "bg-indigo-50 text-indigo-600",
    trend: "+12.8%",
    trendClasses:
      "rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600",
  },
  {
    id: "average-sentiment",
    label: "Avg. Sentiment",
    value: "84%",
    valueSuffix: "Score",
    description: "Overall customer satisfaction",
    icon: "fa-solid fa-face-smile",
    iconClasses: "bg-blue-50 text-blue-600",
    trend: "4.2%",
    trendClasses: "text-xs font-bold text-blue-600",
    trendIcon: "fa-solid fa-arrow-up",
  },
  {
    id: "top-keyword",
    label: "Top Keyword",
    value: '"UI Polish"',
    description: "Frequently mentioned topic",
    icon: "fa-solid fa-hashtag",
    iconClasses: "bg-violet-50 text-violet-600",
    trend: "Trending",
    trendClasses: "text-xs font-bold text-violet-600",
  },
  {
    id: "pending-reviews",
    label: "Pending Reviews",
    value: "142",
    description: "Require attention",
    icon: "fa-solid fa-flag",
    iconClasses: "bg-rose-50 text-rose-600",
    trend: "Urgent",
    trendClasses:
      "rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600",
  },
];

export const dashboardTopics: DashboardTopic[] = [
  {
    id: "mobile-logout",
    status: "Trending",
    statusClasses: "text-rose-500",
    trend: "14.8%",
    trendIcon: "fa-solid fa-arrow-up",
    title: "Mobile Logout",
    description: "Users reporting unexpected session breaks on mobile.",
  },
  {
    id: "onboarding-flow",
    status: "Top Insight",
    statusClasses: "text-emerald-600",
    trend: "8.2%",
    trendIcon: "fa-solid fa-arrow-up",
    title: "Onboarding Flow",
    description: "New users love the guided onboarding experience.",
  },
  {
    id: "search-accuracy",
    status: "Consistent",
    statusClasses: "text-blue-600",
    trend: "Stable",
    title: "Search Accuracy",
    description: "Customers appreciate the improved search results.",
  },
];

const monthPoints: ChartPoint[] = [
  { x: 45, y: 95, label: "W1" },
  { x: 135, y: 108, label: "W2" },
  { x: 225, y: 82, label: "W3" },
  { x: 315, y: 82, label: "W4" },
  { x: 405, y: 49, label: "W5" },
  { x: 495, y: 40, label: "W6" },
  { x: 580, y: 44, label: "W7" },
];

const weekPoints: ChartPoint[] = [
  { x: 45, y: 92, label: "Mon" },
  { x: 135, y: 75, label: "Tue" },
  { x: 225, y: 105, label: "Wed" },
  { x: 315, y: 68, label: "Thu" },
  { x: 405, y: 88, label: "Fri" },
  { x: 495, y: 52, label: "Sat" },
  { x: 580, y: 60, label: "Sun" },
];

const buildSmoothLine = (points: ChartPoint[]): string => {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x} ${points[0].y}`;

  let path = `M${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const current = points[index];
    const next = points[index + 1];
    const afterNext = points[index + 2] ?? next;

    const control1X = current.x + (next.x - previous.x) / 6;
    const control1Y = current.y + (next.y - previous.y) / 6;
    const control2X = next.x - (afterNext.x - current.x) / 6;
    const control2Y = next.y - (afterNext.y - current.y) / 6;

    path += ` C${control1X} ${control1Y} ${control2X} ${control2Y} ${next.x} ${next.y}`;
  }

  return path;
};

export const sentimentChartSeries: Record<ChartPeriod, SentimentSeries> = {
  month: {
    points: monthPoints,
    linePath:
      "M45 95 C75 102 100 112 135 108 S190 70 225 82 S285 100 315 82 S375 42 405 49 S465 62 495 40 S550 50 580 44",
  },
  week: {
    points: weekPoints,
    linePath: buildSmoothLine(weekPoints),
  },
};

export const dashboardNotifications: DashboardNotification[] = [
  {
    id: 1,
    title: "New feedback received",
    description: "A customer just left a review on Instagram Chat.",
    time: "2 mins ago",
    icon: "fa-solid fa-comments",
    iconClasses: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 2,
    title: "Negative sentiment spike",
    description: "Mobile logout mentions increased by 14.8% today.",
    time: "25 mins ago",
    icon: "fa-solid fa-triangle-exclamation",
    iconClasses: "bg-rose-50 text-rose-600",
  },
  {
    id: 3,
    title: "Weekly report is ready",
    description: "Your feedback summary for this week is available.",
    time: "1 hour ago",
    icon: "fa-solid fa-chart-line",
    iconClasses: "bg-emerald-50 text-emerald-600",
  },
];

export const dashboardSignals: FeedbackSignal[] = [
  {
    id: 1,
    source: "Instagram Chat",
    icon: "fa-solid fa-comments",
    iconClasses: "bg-indigo-50 text-indigo-600",
    time: "2 mins ago",
    message: "The new interface is incredibly intuitive and fast.",
    preview: "The new interface is incredibly intuitive and fast...",
    sentiment: "Positive",
    confidence: "92%",
    confidenceValue: 92,
  },
  {
    id: 2,
    source: "App Store Review",
    icon: "fa-regular fa-envelope",
    iconClasses: "bg-rose-50 text-rose-600",
    time: "15 mins ago",
    message: "The latest update keeps logging me out when I switch apps.",
    preview: "The latest update keeps logging me out when I switch apps...",
    sentiment: "Negative",
    confidence: "88%",
    confidenceValue: 88,
  },
  {
    id: 3,
    source: "Website Feedback",
    icon: "fa-solid fa-globe",
    iconClasses: "bg-blue-50 text-blue-600",
    time: "1 hour ago",
    message: "Could we get a bulk export feature for the analytics page?",
    preview: "Could we get a bulk export feature for the analytics page?",
    sentiment: "Neutral",
    confidence: "76%",
    confidenceValue: 76,
  },
  {
    id: 4,
    source: "Support Chat",
    icon: "fa-regular fa-comment-dots",
    iconClasses: "bg-violet-50 text-violet-600",
    time: "3 hours ago",
    message: "The onboarding checklist made setup so much quicker.",
    preview: "The onboarding checklist made setup so much quicker.",
    sentiment: "Positive",
    confidence: "95%",
    confidenceValue: 95,
  },
  {
    id: 5,
    source: "Email Survey",
    icon: "fa-regular fa-envelope-open",
    iconClasses: "bg-amber-50 text-amber-600",
    time: "5 hours ago",
    message: "Search results still miss products with common typos.",
    preview: "Search results still miss products with common typos...",
    sentiment: "Negative",
    confidence: "81%",
    confidenceValue: 81,
  },
  {
    id: 6,
    source: "Website Feedback",
    icon: "fa-solid fa-globe",
    iconClasses: "bg-blue-50 text-blue-600",
    time: "Yesterday",
    message: "Would love more customization options for the dashboard.",
    preview: "Would love more customization options for the dashboard.",
    sentiment: "Neutral",
    confidence: "84%",
    confidenceValue: 84,
  },
];
