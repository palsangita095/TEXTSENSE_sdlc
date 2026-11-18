export interface FeedbackRow {
  id: number;
  preview: string;
  category: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  confidence: string;
  date: string;
  status: "Reviewed" | "Pending";
}

export const feedbackRows: FeedbackRow[] = [
  {
    id: 1,
    preview: '"The support team resolved my issue incredibly fast..."',
    category: "Customer Support",
    sentiment: "Positive",
    confidence: "94%",
    date: "Oct 12, 2024",
    status: "Reviewed",
  },
  {
    id: 2,
    preview: '"Product quality has declined compared to last year..."',
    category: "Product Quality",
    sentiment: "Negative",
    confidence: "88%",
    date: "Oct 11, 2024",
    status: "Pending",
  },
  {
    id: 3,
    preview: '"Delivery arrived a bit later than the estimated date..."',
    category: "Delivery",
    sentiment: "Neutral",
    confidence: "79%",
    date: "Oct 10, 2024",
    status: "Reviewed",
  },
  {
    id: 4,
    preview: '"Pricing is a bit high but the value justifies it..."',
    category: "Pricing",
    sentiment: "Positive",
    confidence: "91%",
    date: "Oct 9, 2024",
    status: "Reviewed",
  },
  {
    id: 5,
    preview: '"Overall experience was smooth, easy to navigate the app..."',
    category: "General Experience",
    sentiment: "Positive",
    confidence: "96%",
    date: "Oct 8, 2024",
    status: "Reviewed",
  },
  {
    id: 6,
    preview: '"Customer rep was rude and unhelpful during call..."',
    category: "Customer Support",
    sentiment: "Negative",
    confidence: "83%",
    date: "Oct 7, 2024",
    status: "Pending",
  },
];
