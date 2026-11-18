"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How accurate is the sentiment analysis?",
    answer:
      "TEXTSENSE provides sentiment predictions and confidence scores for submitted feedback. Low-confidence results can be flagged for human review to help teams double-check important feedback.",
  },
  {
    question: "Do I need a data team to get started?",
    answer:
      "No. TEXTSENSE is designed to make text analysis accessible. Teams can submit feedback and review analysis results through a simple, user-friendly dashboard.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "Language support depends on the NLP models integrated into the application. The current version can be configured for the languages supported by its analysis model.",
  },
  {
    question: "How does TEXTSENSE handle data privacy?",
    answer:
      "TEXTSENSE is designed to keep submitted feedback and analysis results within the application's data workflow. Access controls and secure data-handling practices should be configured for your deployment.",
  },
  {
    question: "Can I connect my existing tools?",
    answer:
      "TEXTSENSE uses a backend API to process text and return analysis results. Integration with external tools can be added through suitable APIs based on project requirements.",
  },
  {
    question: "What happens when I exceed my analysis limit?",
    answer:
      "Analysis limits depend on the configuration of your TEXTSENSE deployment. The application can display a clear message when a configured limit is reached and guide users on what to do next.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative py-16 overflow-hidden sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="absolute w-64 h-64 rounded-full -top-20 -right-16 bg-indigo-100/60 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full -bottom-24 -left-16 bg-violet-100/60 blur-3xl"></div>

      <div className="container relative z-10 px-5 mx-auto lg:px-8">
        {/* Equal Height Columns */}
        <div className="flex flex-wrap items-stretch -mx-4">
          {/* LEFT CONTENT */}
          <div className="w-full px-4 mb-10 lg:w-5/12 lg:mb-0">
            <div className="h-full p-5 border rounded-3xl border-indigo-100/70 bg-white/40 sm:p-7 lg:p-6 xl:p-8">
              {/* Label */}
              <span className="inline-flex items-center px-4 py-2 mb-5 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-100 rounded-full">
                <span className="w-2 h-2 mr-2 bg-indigo-600 rounded-full"></span>
                FAQ
              </span>

              {/* Heading */}
              <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl xl:text-6xl text-slate-900">
                Questions,
                <span className="block text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text">
                  answered.
                </span>
              </h2>

              {/* Description */}
              <p className="max-w-lg mb-8 text-base leading-8 md:text-lg text-slate-500">
                Everything teams usually ask before rolling TEXTSENSE out across
                support, product and leadership.
              </p>

              {/* Contact Support Card */}
              <div className="p-5 border border-white shadow-xl rounded-3xl bg-white/90 sm:p-7 shadow-indigo-100/50 backdrop-blur-sm">
                {/* Support Header */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center mr-4 text-2xl text-white w-14 h-14 rounded-2xl shrink-0 bg-gradient-to-br from-indigo-600 to-violet-500">
                    <i className="fa-regular fa-comments"></i>
                  </div>

                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">
                      Still have a question?
                    </h3>
                    <p className="text-sm leading-6 text-slate-500">
                      Our team is here to help you.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="pt-5 border-t border-slate-100">
                  <a
                    href="mailto:support@textsense.com"
                    className="flex items-center justify-between mb-5 text-sm transition-colors sm:text-base text-slate-600 hover:text-indigo-600"
                  >
                    <span className="flex items-center min-w-0">
                      <i className="mr-3 text-lg fa-regular fa-envelope shrink-0"></i>
                      <span className="break-all">support@textsense.com</span>
                    </span>
                    <i className="ml-3 fa-solid fa-arrow-right shrink-0"></i>
                  </a>

                  <a
                    href="mailto:support@textsense.com"
                    className="flex items-center justify-center w-full rounded-xl bg-indigo-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <i className="mr-3 fa-regular fa-envelope"></i>
                    Contact support
                  </a>

                  <p className="flex items-center mt-5 text-xs leading-5 text-slate-400">
                    <i className="mr-2 text-indigo-500 fa-regular fa-clock"></i>
                    Contact us for assistance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="w-full px-4 lg:w-7/12">
            <div className="flex flex-col h-full">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`faq-item rounded-2xl border border-indigo-100 bg-white/90 transition-all duration-300 ${
                    index === faqs.length - 1 ? "" : "mb-4"
                  } ${activeIndex === index ? "active" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={activeIndex === index}
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full px-5 py-5 text-left faq-question sm:px-7 sm:py-6"
                  >
                    <span className="pr-4 text-base font-bold sm:text-lg text-slate-900">
                      {faq.question}
                    </span>

                    <span className="flex items-center justify-center w-10 h-10 rounded-full faq-icon shrink-0">
                      <i className="text-xs fa-solid fa-chevron-down"></i>
                    </span>
                  </button>

                  <div className="faq-answer">
                    <p className="px-5 pb-6 text-sm leading-7 sm:px-7 sm:text-base text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
