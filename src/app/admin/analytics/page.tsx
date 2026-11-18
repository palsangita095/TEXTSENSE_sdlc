import type { Metadata } from "next";
import SentimentAnalytics from "@/components/admin/analytics/SentimentAnalytics";

export const metadata: Metadata = {
  title: "Sentiment Analytics | TEXTSENSE",
};

export default function AnalyticsPage() {
  return <SentimentAnalytics />;
}
