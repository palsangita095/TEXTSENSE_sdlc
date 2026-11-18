"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  getKeywordRangeLabel,
  getKeywordRangeTitle,
  getSentimentFilterLabel,
  keywordBarRows,
  keywordDefaultTrend,
  keywordRangeMultipliers,
  keywordSentimentRows,
  keywordSummaryCards,
  trendingTopics,
  type KeywordChartMode,
  type KeywordRange,
  type SentimentFilter,
  type TopicRange,
  type TopicSort,
} from "@/data/admin/keywords";
import { downloadCsv } from "@/lib/exportCsv";
import EmergingIssues from "./EmergingIssues";
import KeywordFilters from "./KeywordFilters";
import KeywordSummaryCards from "./KeywordSummaryCards";
import KeywordSentimentSection from "./KeywordSentimentSection";
import TopicClusters from "./TopicClusters";
import TrendingTopics from "./TrendingTopics";

function downloadJson(filename: string, payload: unknown): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function KeywordsTopics() {
  const [search, setSearch] = useState<string>("");
  const [range, setRange] = useState<TopicRange>("30");
  const [sentiment, setSentiment] = useState<SentimentFilter>("all");
  const [category, setCategory] = useState<string>("All Categories");
  const [sortBy, setSortBy] = useState<TopicSort>("Most Mentioned");

  const [keywordSearch, setKeywordSearch] = useState<string>("");
  const [keywordRange, setKeywordRange] = useState<KeywordRange>("30");
  const [keywordSentiment, setKeywordSentiment] = useState<SentimentFilter>("all");
  const [chartMode, setChartMode] = useState<KeywordChartMode>("frequency");

  const rangeLabel = getKeywordRangeLabel(range);
  const keywordRangeLabel = getKeywordRangeLabel(keywordRange);

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    return trendingTopics
      .map((topic) => ({
        ...topic,
        mentions: Math.max(1, Math.round(topic.mentions * keywordRangeMultipliers[range])),
        relatedFeedback: Math.max(
          1,
          Math.round(topic.relatedFeedback * keywordRangeMultipliers[range]),
        ),
      }))
      .filter((topic) => {
        const searchMatch =
          !query ||
          topic.name.toLowerCase().includes(query) ||
          topic.category.toLowerCase().includes(query);
        const sentimentMatch =
          sentiment === "all" || topic.sentiment.toLowerCase() === sentiment;
        const categoryMatch = category === "All Categories" || topic.category === category;

        return searchMatch && sentimentMatch && categoryMatch;
      });
  }, [search, sentiment, category, range]);

  const sortedTopics = useMemo(() => {
    const topics = [...filteredTopics];

    switch (sortBy) {
      case "Least Mentioned":
        return topics.sort((a, b) => a.mentions - b.mentions);
      case "Most Recent":
        return topics.sort((a, b) => a.recency - b.recency);
      case "Trending":
        return topics.sort((a, b) => b.change - a.change);
      default:
        return topics.sort((a, b) => b.mentions - a.mentions);
    }
  }, [filteredTopics, sortBy]);

  const totalMentions = filteredTopics.reduce((total, topic) => total + topic.mentions, 0);
  const hasFilters =
    search.trim().length > 0 || sentiment !== "all" || category !== "All Categories";
  const changePercent =
    totalMentions === 0
      ? 0
      : hasFilters
        ? filteredTopics.reduce((total, topic) => total + topic.change * topic.mentions, 0) /
          totalMentions
        : keywordDefaultTrend;

  const keywordMultiplier = keywordRangeMultipliers[keywordRange];
  const keywordQuery = keywordSearch.trim().toLowerCase();

  const filteredBarRows = useMemo(
    () =>
      keywordBarRows
        .map((row) => ({
          ...row,
          mentions: Math.max(1, Math.round(row.mentions * keywordMultiplier)),
        }))
        .filter((row) => {
          const searchMatch = !keywordQuery || row.keyword.toLowerCase().includes(keywordQuery);
          const sentimentMatch =
            keywordSentiment === "all" ||
            row.dominant.toLowerCase() === keywordSentiment;

          return searchMatch && sentimentMatch;
        }),
    [keywordMultiplier, keywordQuery, keywordSentiment],
  );

  const filteredSentimentRows = useMemo(
    () =>
      keywordSentimentRows
        .map((row) => ({
          ...row,
          mentions: Math.max(1, Math.round(row.mentions * keywordMultiplier)),
        }))
        .filter((row) => {
          const searchMatch = !keywordQuery || row.keyword.toLowerCase().includes(keywordQuery);
          const sentimentMatch =
            keywordSentiment === "all" ||
            row.dominant.toLowerCase() === keywordSentiment;

          return searchMatch && sentimentMatch;
        }),
    [keywordMultiplier, keywordQuery, keywordSentiment],
  );

  const resetTopicFilters = () => {
    setSearch("");
    setSentiment("all");
    setCategory("All Categories");
    setSortBy("Most Mentioned");
  };

  const handleExport = (format: "csv" | "json") => {
    const generatedAt = new Date().toLocaleString("en-US");
    const rangeTitle = getKeywordRangeTitle(range);
    const keywordRangeTitle = getKeywordRangeTitle(keywordRange);

    const payload = {
      generatedAt,
      filters: {
        search: search || "None",
        range: rangeTitle,
        sentiment: getSentimentFilterLabel(sentiment),
        category,
        sortBy,
        keywordRange: keywordRangeTitle,
        keywordSearch: keywordSearch || "None",
        keywordSentiment: getSentimentFilterLabel(keywordSentiment),
      },
      trendingTopics: sortedTopics.map((topic) => ({
        topic: topic.name,
        category: topic.category,
        sentiment: topic.sentiment,
        mentions: topic.mentions,
        change: topic.changeLabel,
        relatedFeedback: topic.relatedFeedback,
      })),
      mostMentionedKeywords: filteredBarRows.map((row) => ({
        keyword: row.keyword,
        mentions: row.mentions,
        growth: `${row.growth}%`,
        dominantSentiment: row.dominant,
      })),
      keywordSentiment: filteredSentimentRows.map((row) => ({
        keyword: row.keyword,
        mentions: row.mentions,
        positive: `${row.positive}%`,
        neutral: `${row.neutral}%`,
        negative: `${row.negative}%`,
        dominantSentiment: row.dominant,
      })),
      summaryCards: keywordSummaryCards.map((card) => ({
        label: card.label,
        value: card.valueLines ? card.valueLines.join(" ") : card.value,
        caption: card.caption,
      })),
    };

    if (format === "csv") {
      downloadCsv(`textsense-keywords-topics-${range}-days.csv`, [
        ["Keywords & Topics Report"],
        ["Trending Date Range", rangeTitle],
        ["Keyword Detail Date Range", keywordRangeTitle],
        ["Search", search || "None"],
        ["Sentiment Filter", getSentimentFilterLabel(sentiment)],
        ["Category", category],
        ["Sort By", sortBy],
        ["Keyword Search", keywordSearch || "None"],
        ["Keyword Sentiment Filter", getSentimentFilterLabel(keywordSentiment)],
        ["Generated At", generatedAt],
        [],
        ["Trending Topics"],
        ["Topic", "Category", "Sentiment", "Mentions", "Change", "Related Feedback"],
        ...sortedTopics.map((topic) => [
          topic.name,
          topic.category,
          topic.sentiment,
          topic.mentions,
          topic.changeLabel,
          topic.relatedFeedback,
        ]),
        [],
        ["Most Mentioned Keywords"],
        ["Keyword", "Mentions", "Growth", "Dominant Sentiment"],
        ...filteredBarRows.map((row) => [
          row.keyword,
          row.mentions,
          `${row.growth}%`,
          row.dominant,
        ]),
        [],
        ["Keyword Sentiment"],
        ["Keyword", "Mentions", "Positive %", "Neutral %", "Negative %", "Dominant"],
        ...filteredSentimentRows.map((row) => [
          row.keyword,
          row.mentions,
          row.positive,
          row.neutral,
          row.negative,
          row.dominant,
        ]),
      ]);
    } else {
      downloadJson(`textsense-keywords-topics-${range}-days.json`, payload);
    }

    toast.success(`Keywords report exported as ${format.toUpperCase()}.`);
  };

  return (
    <main className="min-w-0 bg-[#F7F8FC]">
      <section className="px-3 pb-8 pt-2 sm:px-7 sm:pt-3 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold leading-tight text-[#111827] sm:text-3xl">
            Keywords &amp; Topics
          </h1>
          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            Discover recurring themes and understand what customers are talking about.
          </p>
        </div>

        <KeywordSummaryCards />

        <p className="mb-5 -mt-1 text-xs text-slate-400">Illustrative sample data</p>

        <KeywordFilters
          search={search}
          onSearchChange={setSearch}
          range={range}
          onRangeChange={setRange}
          sentiment={sentiment}
          onSentimentChange={setSentiment}
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onExport={handleExport}
        />
      </section>

      <TrendingTopics
        topics={sortedTopics}
        rangeLabel={rangeLabel}
        totalMentions={totalMentions}
        changePercent={changePercent}
        hasFilters={hasFilters}
        onResetFilters={resetTopicFilters}
      />

      <KeywordSentimentSection
        search={keywordSearch}
        onSearchChange={setKeywordSearch}
        range={keywordRange}
        onRangeChange={setKeywordRange}
        sentiment={keywordSentiment}
        onSentimentChange={setKeywordSentiment}
        chartMode={chartMode}
        onChartModeChange={setChartMode}
        barRows={filteredBarRows}
        sentimentRows={filteredSentimentRows}
        rangeLabel={keywordRangeLabel}
      />

      <TopicClusters />

      <EmergingIssues />
    </main>
  );
}
