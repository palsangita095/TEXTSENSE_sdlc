export type ProfileRole = "Admin" | "Manager" | "Analyst" | "User";

export type ProfileStatus = "Active" | "Suspended";

export type FeedbackSentiment = "Positive" | "Neutral" | "Negative";

export type FeedbackStatus = "New" | "Resolved" | "Reviewed";

export const PROFILE_ROLES: ProfileRole[] = ["Admin", "Manager", "Analyst", "User"];

export interface ProfileData {
  name: string;
  email: string;
  role: ProfileRole;
  status: ProfileStatus;
  userId: string;
  company: string;
  registered: string;
  lastActive: string;
  location: string;
  plan: string;
}

export const initialProfile: ProfileData = {
  name: "Daniel Okafor",
  email: "daniel.okafor@brightlabs.io",
  role: "User",
  status: "Active",
  userId: "USR-10482",
  company: "Brightlabs",
  registered: "Mar 3, 2023",
  lastActive: "Yesterday, 6:42 PM",
  location: "Lagos, Nigeria",
  plan: "Enterprise",
};

export interface ProfileStat {
  id: string;
  label: string;
  value: string;
  extra?: string;
  extraClasses?: string;
  icon: string;
  iconWrapClasses: string;
  trend: string;
  trendIcon: string;
  trendClasses: string;
  stroke: string;
  fill: string;
  linePath: string;
  areaPath: string;
}

export const profileStats: ProfileStat[] = [
  {
    id: "total",
    label: "Total Feedback Submitted",
    value: "86",
    icon: "fa-regular fa-user",
    iconWrapClasses: "bg-[#EAF0FF] text-[#2563EB]",
    trend: "+12.5%",
    trendIcon: "fa-solid fa-arrow-trend-up",
    trendClasses: "bg-[#ECFDF3] text-[#16A34A]",
    stroke: "#2563EB",
    fill: "#EAF0FF",
    linePath: "M0 26 L12 20 L24 22 L36 12 L48 16 L60 8 L72 14 L84 4 L96 10",
    areaPath:
      "M0 26 L12 20 L24 22 L36 12 L48 16 L60 8 L72 14 L84 4 L96 10 L96 40 L0 40 Z",
  },
  {
    id: "positive",
    label: "Positive",
    value: "54",
    extra: "(63%)",
    extraClasses: "text-[#16A34A]",
    icon: "fa-regular fa-face-smile",
    iconWrapClasses: "bg-[#ECFDF3] text-[#16A34A]",
    trend: "+8.0%",
    trendIcon: "fa-solid fa-arrow-trend-up",
    trendClasses: "bg-[#ECFDF3] text-[#16A34A]",
    stroke: "#16A34A",
    fill: "#ECFDF3",
    linePath: "M0 28 L12 24 L24 26 L36 16 L48 20 L60 12 L72 16 L84 8 L96 6",
    areaPath:
      "M0 28 L12 24 L24 26 L36 16 L48 20 L60 12 L72 16 L84 8 L96 6 L96 40 L0 40 Z",
  },
  {
    id: "neutral",
    label: "Neutral",
    value: "19",
    extra: "(22%)",
    extraClasses: "text-[#64748B]",
    icon: "fa-regular fa-user",
    iconWrapClasses: "bg-[#EFEDFF] text-[#4338CA]",
    trend: "+2.1%",
    trendIcon: "fa-solid fa-arrow-trend-up",
    trendClasses: "bg-[#ECFDF3] text-[#16A34A]",
    stroke: "#4338CA",
    fill: "#EFEDFF",
    linePath: "M0 20 L12 26 L24 18 L36 24 L48 14 L60 20 L72 12 L84 18 L96 10",
    areaPath:
      "M0 20 L12 26 L24 18 L36 24 L48 14 L60 20 L72 12 L84 18 L96 10 L96 40 L0 40 Z",
  },
  {
    id: "negative",
    label: "Negative",
    value: "13",
    extra: "(15%)",
    extraClasses: "text-[#DC2626]",
    icon: "fa-solid fa-triangle-exclamation",
    iconWrapClasses: "bg-[#FEF2F2] text-[#DC2626]",
    trend: "-4.3%",
    trendIcon: "fa-solid fa-arrow-trend-down",
    trendClasses: "bg-[#FEF2F2] text-[#DC2626]",
    stroke: "#EF4444",
    fill: "#FEF2F2",
    linePath: "M0 10 L12 14 L24 12 L36 20 L48 16 L60 24 L72 22 L84 30 L96 34",
    areaPath:
      "M0 10 L12 14 L24 12 L36 20 L48 16 L60 24 L72 22 L84 30 L96 34 L96 40 L0 40 Z",
  },
];

export interface MonthlyFeedbackPoint {
  month: string;
  count: number;
  height: number;
  highlighted?: boolean;
}

export const monthlyFeedback: MonthlyFeedbackPoint[] = [
  { month: "May", count: 9, height: 38 },
  { month: "Jun", count: 11, height: 48 },
  { month: "Jul", count: 14, height: 62 },
  { month: "Aug", count: 17, height: 76 },
  { month: "Sep", count: 15, height: 67 },
  { month: "Oct", count: 20, height: 90, highlighted: true },
];

export interface UserFeedbackRow {
  id: number;
  date: string;
  feedback: string;
  category: string;
  categoryClasses: string;
  sentiment: FeedbackSentiment;
  sentimentClasses: string;
  sentimentDotClasses: string;
  status: FeedbackStatus;
  statusClasses: string;
}

export const initialFeedbackRows: UserFeedbackRow[] = [
  {
    id: 1,
    date: "Oct 28, 2024",
    feedback:
      "The sentiment analysis is impressively accurate, though I'd love more granular emotion categories.",
    category: "Product",
    categoryClasses: "bg-[#EFEDFF] text-[#4338CA]",
    sentiment: "Neutral",
    sentimentClasses: "bg-[#F1F5F9] text-[#64748B]",
    sentimentDotClasses: "bg-[#94A3B8]",
    status: "New",
    statusClasses: "bg-[#FEF3C7] text-[#B45309]",
  },
  {
    id: 2,
    date: "Oct 14, 2024",
    feedback:
      "Support team resolved my billing issue within minutes. Outstanding service!",
    category: "Support",
    categoryClasses: "bg-[#EAF0FF] text-[#2563EB]",
    sentiment: "Positive",
    sentimentClasses: "bg-[#ECFDF3] text-[#15803D]",
    sentimentDotClasses: "bg-[#16A34A]",
    status: "Resolved",
    statusClasses: "bg-[#ECFDF3] text-[#15803D]",
  },
  {
    id: 3,
    date: "Sep 30, 2024",
    feedback:
      "I was charged twice for my subscription this month. Please refund the duplicate.",
    category: "Billing",
    categoryClasses: "bg-[#FEF3C7] text-[#B45309]",
    sentiment: "Negative",
    sentimentClasses: "bg-[#FEE2E2] text-[#DC2626]",
    sentimentDotClasses: "bg-[#DC2626]",
    status: "Reviewed",
    statusClasses: "bg-[#EEF2FF] text-[#4338CA]",
  },
  {
    id: 4,
    date: "Sep 12, 2024",
    feedback: "The new dashboard export feature saves my team hours every week.",
    category: "Feature",
    categoryClasses: "bg-[#FEF3C7] text-[#B45309]",
    sentiment: "Positive",
    sentimentClasses: "bg-[#ECFDF3] text-[#15803D]",
    sentimentDotClasses: "bg-[#16A34A]",
    status: "Reviewed",
    statusClasses: "bg-[#EEF2FF] text-[#4338CA]",
  },
  {
    id: 5,
    date: "Aug 21, 2024",
    feedback:
      "Navigation feels a bit cluttered on mobile. Consider simplifying the menu.",
    category: "UX",
    categoryClasses: "bg-[#FEF3C7] text-[#B45309]",
    sentiment: "Neutral",
    sentimentClasses: "bg-[#F1F5F9] text-[#64748B]",
    sentimentDotClasses: "bg-[#94A3B8]",
    status: "Resolved",
    statusClasses: "bg-[#ECFDF3] text-[#15803D]",
  },
];

export interface AdminNote {
  id: number;
  text: string;
  author: string;
  date: string;
}

export const initialAdminNotes: AdminNote[] = [
  {
    id: 1,
    text: "Verified enterprise contact. Frequently submits detailed product feedback.",
    author: "Admin User",
    date: "Oct 12, 2024",
  },
  {
    id: 2,
    text: "Requested CSV export improvements; forwarded to product team.",
    author: "Sarah Mitchell",
    date: "Aug 3, 2024",
  },
];

export interface TimelineEvent {
  id: string;
  label: string;
  value: string;
  dotClasses: string;
}

export const activityTimeline: TimelineEvent[] = [
  {
    id: "login",
    label: "Last login",
    value: "Yesterday, 6:42 PM",
    dotClasses: "bg-[#4338CA]",
  },
  {
    id: "feedback",
    label: "Last feedback submitted",
    value: "Oct 28, 2024",
    dotClasses: "bg-[#16A34A]",
  },
  {
    id: "first",
    label: "First feedback",
    value: "Mar 14, 2023",
    dotClasses: "bg-[#B45309]",
  },
  {
    id: "registered",
    label: "Registered",
    value: "Mar 3, 2023",
    dotClasses: "bg-[#94A3B8]",
  },
];
