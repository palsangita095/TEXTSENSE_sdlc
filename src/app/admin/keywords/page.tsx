import type { Metadata } from "next";
import KeywordsTopics from "@/components/admin/keywords/KeywordsTopics";

export const metadata: Metadata = {
  title: "Keywords & Topics | TEXTSENSE",
  description:
    "Discover recurring themes, trending topics and sentiment for the keywords customers mention.",
};

export default function KeywordsPage() {
  return <KeywordsTopics />;
}
