export type SentimentLabel = "Positive" | "Neutral" | "Negative";

export type FeedbackSentiment = SentimentLabel | "Unknown";

export type FeedbackStatus = "PENDING" | "REVIEWED" | "NEEDS_ATTENTION";

export interface FeedbackRecord {
  id: number;
  user: number;
  title: string;
  text: string;
  category: number;
  source: string;
  status: FeedbackStatus;
  created_at: string;
}

export interface FeedbackCreatePayload {
  title: string;
  text: string;
  category: number;
  source?: string;
  status?: FeedbackStatus;
}

export interface CategoryRecord {
  id: number;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryListResponse {
  message: string;
  categories: CategoryRecord[];
}

export interface CategoryCreatePayload {
  name: string;
  description?: string;
  active?: boolean;
}

export interface CategoryCreateResponse {
  message: string;
  category: CategoryRecord;
}

export interface SentimentDistributionItem {
  sentiment: SentimentLabel;
  count: number;
}

export interface CategoryDistributionItem {
  category__name: string | null;
  count: number;
}

export interface StatusDistributionItem {
  status: FeedbackStatus;
  count: number;
}

export interface TopKeywordItem {
  term: string;
  frequency: number;
  relevance: number;
}

export interface AdminAnalytics {
  total_feedback: number;
  total_analyzed: number;
  pending_analysis: number;
  sentiment_distribution: SentimentDistributionItem[];
  category_distribution: CategoryDistributionItem[];
  status_distribution: StatusDistributionItem[];
  top_keywords: TopKeywordItem[];
}

export interface AdminAnalyticsResponse {
  message: string;
  analytics: AdminAnalytics;
}

export interface AdminAnalyticsQuery {
  date_from?: string;
  date_to?: string;
}

export interface AdminState {
  analytics: AdminAnalytics | null;
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: string | null;
  feedbacks: FeedbackRecord[];
  categories: CategoryRecord[];
  isFeedbackLoading: boolean;
  isFeedbackSubmitting: boolean;
  isCategoriesLoading: boolean;
  isCategorySubmitting: boolean;
  feedbackError: string | null;
  categoriesError: string | null;
  lastFeedbacksFetchedAt: string | null;
}

export interface SentimentCounts {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentPercentages {
  positive: number;
  neutral: number;
  negative: number;
}

export interface CategorySegment {
  name: string;
  count: number;
  percentage: number;
  width: number;
  colorClass: string;
  labelClasses: string;
}

export interface KeywordSegment {
  label: string;
  description: string;
  count: string;
  width: number;
}
