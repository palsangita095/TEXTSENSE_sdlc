export const categoryDescriptionLimit = 150;

export type CategoryIconId =
  | "comment-dots"
  | "face-smile"
  | "triangle-exclamation"
  | "chart-line"
  | "user"
  | "server"
  | "hashtag";

export interface CategoryIconOption {
  id: CategoryIconId;
  label: string;
  iconClass: string;
}

export const categoryIconOptions: CategoryIconOption[] = [
  { id: "comment-dots", label: "Comment", iconClass: "fa-regular fa-comment-dots" },
  { id: "face-smile", label: "Satisfaction", iconClass: "fa-solid fa-face-smile" },
  {
    id: "triangle-exclamation",
    label: "Alert",
    iconClass: "fa-solid fa-triangle-exclamation",
  },
  { id: "chart-line", label: "Trend", iconClass: "fa-solid fa-chart-line" },
  { id: "user", label: "Customer", iconClass: "fa-solid fa-user" },
  { id: "server", label: "Infrastructure", iconClass: "fa-solid fa-server" },
  { id: "hashtag", label: "Topic", iconClass: "fa-solid fa-hashtag" },
];

export interface CategoryColorOption {
  name: string;
  value: string;
  ringClass: string;
}

export const categoryColorOptions: CategoryColorOption[] = [
  { name: "Blue", value: "#2563EB", ringClass: "ring-[#2563EB]" },
  { name: "Green", value: "#16A34A", ringClass: "ring-[#16A34A]" },
  { name: "Amber", value: "#CA8A04", ringClass: "ring-[#CA8A04]" },
  { name: "Red", value: "#DC2626", ringClass: "ring-[#DC2626]" },
  { name: "Purple", value: "#9333EA", ringClass: "ring-[#9333EA]" },
  { name: "Teal", value: "#0D9488", ringClass: "ring-[#0D9488]" },
  { name: "Slate", value: "#475569", ringClass: "ring-[#475569]" },
  { name: "Pink", value: "#DB2777", ringClass: "ring-[#DB2777]" },
];

export interface CategoryFormValues {
  name: string;
  description: string;
  icon: CategoryIconId;
  color: string;
  active: boolean;
}

export interface SavedCategory {
  name: string;
  color: string;
  active: boolean;
}

export const emptyCategoryValues: CategoryFormValues = {
  name: "",
  description: "",
  icon: "comment-dots",
  color: "#2563EB",
  active: true,
};

export const defaultSavedCategory: SavedCategory = {
  name: "Product Quality",
  color: "#16A34A",
  active: true,
};

export const validationCategoryValues: CategoryFormValues = {
  name: "Customer Support",
  description:
    "Customer service and support responses, including response times, agent helpfulness, and issue resolution quality.",
  icon: "comment-dots",
  color: "#2563EB",
  active: true,
};

export const savingCategoryValues: CategoryFormValues = {
  name: "Product Quality",
  description: "Product satisfaction and quality feedback.",
  icon: "face-smile",
  color: "#16A34A",
  active: true,
};

export const savingDescriptionCount = 45;
export const validationDescriptionCount = 185;

export function isDescriptionOverLimit(description: string): boolean {
  return description.length > categoryDescriptionLimit;
}
