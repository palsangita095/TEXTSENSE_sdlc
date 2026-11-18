import type { Article } from "@/type/type/article.type";

export const articles: Article[] = [
  {
    category: "Playbook",
    title: "Building a feedback loop your product team actually uses",
    time: "7 min read",
    excerpt:
      "A practical framework for routing customer signals to the people who can act on them — in under a week.",
    image: "/assets/images/home_page/article-img1.png",
    imageAlt: "Team working together in an office",
    content: (
      <>
        <p className="mb-4">
          Customer feedback helps product teams understand what users need,
          where they face problems, and which improvements matter most.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          1. Collect customer feedback
        </h3>

        <p className="mb-5">
          Collect reviews, suggestions, complaints and support messages in one
          place. A consistent collection process helps teams understand
          customer expectations.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          2. Organize the feedback
        </h3>

        <p className="mb-5">
          Categorize feedback by topic, sentiment and priority. This makes it
          easier to identify repeated problems and important customer requests.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          3. Take action and measure results
        </h3>

        <p>
          Share insights with the relevant team, make improvements and review
          new feedback to understand whether the changes have helped customers.
          TEXTSENSE can support this process through text analysis and
          sentiment insights.
        </p>
      </>
    ),
  },
  {
    category: "Research",
    title: "What 1.2M support messages told us about response time",
    time: "11 min read",
    excerpt:
      "Sentiment drops sharply after the four-hour mark. Here is the data, and what high-performing teams do differently.",
    image: "/assets/images/home_page/article-img2.png",
    imageAlt: "Team discussing customer data",
    content: (
      <>
        <p className="mb-4">
          Response time is an important part of the customer experience.
          Delayed replies can leave customers frustrated, especially when they
          need urgent help.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Why response time matters
        </h3>

        <p className="mb-5">
          Analyzing support messages can help teams discover recurring
          complaints, identify negative sentiment and understand which issues
          require faster attention.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Turn messages into insights
        </h3>

        <p className="mb-5">
          Organize customer messages by topic, urgency and sentiment.
          Reviewing these patterns helps teams identify bottlenecks and improve
          their support workflow.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          What teams can do
        </h3>

        <p>
          Monitor response patterns, prioritize important customer concerns and
          regularly evaluate feedback. Use actual support data to decide which
          improvements will have the greatest impact.
        </p>
      </>
    ),
  },
  {
    category: "Guide",
    title: "Reading AI confidence scores without over-trusting them",
    time: "5 min read",
    excerpt:
      "Confidence is a signal, not a verdict. A simple review workflow for low-confidence classifications.",
    image: "/assets/images/home_page/article-img3.png",
    imageAlt: "Business team analyzing information",
    content: (
      <>
        <p className="mb-4">
          AI confidence scores help indicate how strongly a model supports its
          prediction. However, a high confidence score does not guarantee that
          a result is always correct.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          What is a confidence score?
        </h3>

        <p className="mb-5">
          In text analysis, a model may predict positive, negative or neutral
          sentiment and provide a score associated with that prediction. The
          meaning of the score depends on the model and its calibration.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Review uncertain results
        </h3>

        <p className="mb-5">
          Messages containing sarcasm, ambiguous language or limited context
          may be difficult to classify. Low-confidence predictions can be
          flagged for human review.
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Use AI responsibly
        </h3>

        <p>
          Combine model predictions with context and human judgment. Regularly
          evaluate model performance against reviewed examples instead of
          relying only on confidence scores.
        </p>
      </>
    ),
  },
];
