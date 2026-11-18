export type ShowcaseRole = "Admin" | "User" | "Editor";
export type ShowcaseStatus = "Pending" | "Active" | "Inactive";

export interface ShowcaseUser {
  fullName: string;
  email: string;
  role: ShowcaseRole;
  status: ShowcaseStatus;
}

export const showcaseRoles: ShowcaseRole[] = ["Admin", "User", "Editor"];
export const showcaseStatuses: ShowcaseStatus[] = ["Pending", "Active", "Inactive"];

export const defaultShowcaseUser: ShowcaseUser = {
  fullName: "Priya Nair",
  email: "priya.nair@helixcorp.com",
  role: "User",
  status: "Active",
};

export const getShowcaseInitials = (fullName: string): string =>
  fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

export const successStatusClasses: Record<ShowcaseStatus, string> = {
  Active: "text-green-600",
  Pending: "text-amber-500",
  Inactive: "text-slate-500",
};

export interface ReferenceNavItem {
  label: string;
  icon: string;
  active?: boolean;
}

export const referenceNavItems: ReferenceNavItem[] = [
  { label: "Overview", icon: "fa-solid fa-chart-pie" },
  { label: "Feedback", icon: "fa-regular fa-comments" },
  { label: "Users", icon: "fa-solid fa-user", active: true },
  { label: "Sentiment", icon: "fa-solid fa-face-smile" },
  { label: "Keywords", icon: "fa-solid fa-hashtag" },
  { label: "Categories", icon: "fa-solid fa-layer-group" },
  { label: "Content", icon: "fa-solid fa-file-lines" },
  { label: "Reports", icon: "fa-solid fa-chart-column" },
  { label: "Notifications", icon: "fa-regular fa-bell" },
  { label: "Settings", icon: "fa-solid fa-gear" },
  { label: "Chevron", icon: "fa-solid fa-chevron-down" },
];

export interface ReferenceIconItem {
  label: string;
  icon: string;
}

export const referenceIcons: ReferenceIconItem[] = [
  { label: "Search", icon: "fa-solid fa-magnifying-glass text-lg text-slate-500" },
  { label: "Search (filter)", icon: "fa-solid fa-magnifying-glass text-lg text-slate-500" },
  { label: "Bell", icon: "fa-regular fa-bell text-lg text-slate-500" },
  { label: "Chevron", icon: "fa-solid fa-chevron-down text-lg text-slate-500" },
  { label: "Total users", icon: "fa-regular fa-user text-xl text-blue-600" },
  { label: "Active", icon: "fa-regular fa-face-smile text-xl text-green-600" },
  { label: "New user", icon: "fa-solid fa-user-plus text-xl text-blue-500" },
  { label: "Suspended", icon: "fa-solid fa-triangle-exclamation text-xl text-red-600" },
  { label: "Calendar", icon: "fa-regular fa-calendar text-xl text-slate-500" },
  { label: "Suspend", icon: "fa-solid fa-triangle-exclamation text-xl text-amber-500" },
  { label: "Delete", icon: "fa-solid fa-circle-minus text-xl text-red-600" },
  { label: "Select arrow", icon: "fa-solid fa-chevron-down text-lg text-slate-500" },
];

export interface SparklineSeries {
  label: string;
  trendIcon: string;
  change: string;
  changeClass: string;
  iconBgClass: string;
  areaClass: string;
  areaPath: string;
  linePath: string;
  areaColor: string;
  strokeColor: string;
  animationBegin: string;
}

export const sparklineSeries: SparklineSeries[] = [
  {
    label: "Positive sentiment",
    trendIcon: "fa-solid fa-arrow-up",
    change: "+4.1%",
    changeClass: "text-green-600",
    iconBgClass: "bg-green-600",
    areaClass: "bg-green-50",
    areaPath: "M0 42 L180 42 L180 7 L0 42Z",
    linePath:
      "M0 36 L20 33 L40 34 L60 27 L80 29 L100 20 L120 23 L140 14 L160 17 L180 7",
    areaColor: "#16A34A",
    strokeColor: "#16A34A",
    animationBegin: "0s",
  },
  {
    label: "Engagement",
    trendIcon: "fa-solid fa-arrow-up",
    change: "+3.2%",
    changeClass: "text-indigo-600",
    iconBgClass: "bg-indigo-600",
    areaClass: "bg-indigo-50",
    areaPath: "M0 42 L180 42 L180 7 L0 42Z",
    linePath:
      "M0 38 L20 35 L40 36 L60 29 L80 31 L100 22 L120 24 L140 15 L160 17 L180 7",
    areaColor: "#6366F1",
    strokeColor: "#6366F1",
    animationBegin: "0.3s",
  },
  {
    label: "Active users",
    trendIcon: "fa-solid fa-arrow-up",
    change: "+12.5%",
    changeClass: "text-blue-600",
    iconBgClass: "bg-blue-600",
    areaClass: "bg-blue-50",
    areaPath: "M0 42 L180 42 L180 4 L0 42Z",
    linePath:
      "M0 39 L20 34 L40 35 L60 27 L80 29 L100 19 L120 21 L140 12 L160 14 L180 4",
    areaColor: "#3B82F6",
    strokeColor: "#3B82F6",
    animationBegin: "0.6s",
  },
  {
    label: "Churn risk",
    trendIcon: "fa-solid fa-arrow-down",
    change: "-8.0%",
    changeClass: "text-red-600",
    iconBgClass: "bg-red-600",
    areaClass: "bg-red-50",
    areaPath: "M0 5 L180 5 L180 42 L0 5Z",
    linePath:
      "M0 7 L20 10 L40 9 L60 16 L80 18 L100 23 L120 25 L140 31 L160 34 L180 40",
    areaColor: "#DC2626",
    strokeColor: "#DC2626",
    animationBegin: "0.9s",
  },
];
