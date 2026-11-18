"use client";
import { useEffect, useRef, useState } from "react";

const Capabilities = () => {
  const [insightOpen, setInsightOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  const openInsightModal = () => setInsightOpen(true);
  const closeInsightModal = () => setInsightOpen(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveals = root.querySelectorAll<HTMLElement>(".reveal");
    const counters = root.querySelectorAll<HTMLElement>(".count-up");
    const chart = root.querySelector("#capabilities svg");

    const animateCounter = (counter: HTMLElement) => {
      const target = Number(counter.dataset.target);
      const finalWidth = Number(counter.dataset.width);
      const bar = counter.dataset.bar
        ? document.getElementById(counter.dataset.bar)
        : null;

      if (reduceMotion) {
        counter.textContent = target.toLocaleString("en-US");
        if (bar) {
          bar.style.width = finalWidth + "%";
        }
        return;
      }

      const duration = 1500;
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(target * eased);
        const currentWidth = finalWidth * eased;

        counter.textContent = currentValue.toLocaleString("en-US");

        if (bar) {
          bar.style.width = currentWidth + "%";
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString("en-US");

          if (bar) {
            bar.style.width = finalWidth + "%";
          }
        }
      };

      requestAnimationFrame(update);
    };

    // Reveal cards on scroll
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((element) => revealObserver.observe(element));

    // Number and matching bar animate together
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    // Draw chart lines when chart appears
    if (chart) {
      const chartObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              chart
                .querySelectorAll(".chart-line")
                .forEach((line, index) => {
                  if (reduceMotion) {
                    line.classList.add("drawn");
                  } else {
                    window.setTimeout(() => {
                      line.classList.add("drawn");
                    }, index * 250);
                  }
                });

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );

      chartObserver.observe(chart);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeInsightModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 reveal">
          <span className="inline-block rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest text-indigo-700 mb-5">
            CAPABILITIES
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">
            Everything you need to understand
            <span className="block">what customers are telling you</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-6 text-gray-500 max-w-xl mx-auto">
            Four connected layers of analysis — from a single comment to
            company-wide intelligence — all explainable, all in plain language.
          </p>
        </div>

        {/* ================= FLEX CARDS ================= */}
        <div className="flex flex-wrap -mx-3">
          {/* ================= CARD 1 ================= */}
          <div className="w-full md:w-1/2 px-3 mb-6">
            <div className="feature-card reveal h-full bg-white p-5 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1">
              {/* Icon + Title */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] text-white flex items-center justify-center shadow-md mr-3 shrink-0">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>

                <h3 className="text-base font-bold text-gray-900">
                  Sentiment Analysis
                </h3>
              </div>

              <p className="text-sm leading-6 text-gray-500 mb-5">
                Every piece of feedback is classified as positive, neutral or
                negative with a transparent confidence score — so you always
                know how much to trust the result.
              </p>

              {/* Features */}
              <div>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Per-item confidence scoring
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Low-confidence auto-flagging
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    28 languages supported
                  </li>
                </ul>
              </div>

              {/* Sentiment Statistics */}
              <div className="flex mt-7">
                {/* Positive */}
                <div className="w-1/3 bg-green-50 rounded-xl p-2 sm:p-3 mr-2 transition-transform duration-300 hover:scale-105">
                  <p className="text-[9px] sm:text-[10px] font-bold text-green-700 mb-2">
                    <i className="fa-solid fa-check"></i> POSITIVE
                  </p>

                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    <span
                      className="count-up"
                      data-target="68"
                      data-width="68"
                      data-bar="positive-bar"
                    >
                      0
                    </span>
                    %
                  </h4>

                  <div className="h-1.5 bg-green-100 rounded-full mt-2 overflow-hidden">
                    <div
                      id="positive-bar"
                      className="progress-bar h-full bg-green-600 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Neutral */}
                <div className="w-1/3 bg-amber-50 rounded-xl p-2 sm:p-3 mr-2 transition-transform duration-300 hover:scale-105">
                  <p className="text-[9px] sm:text-[10px] font-bold text-amber-700 mb-2">
                    <i className="fa-solid fa-minus"></i> NEUTRAL
                  </p>

                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    <span
                      className="count-up"
                      data-target="21"
                      data-width="21"
                      data-bar="neutral-bar"
                    >
                      0
                    </span>
                    %
                  </h4>

                  <div className="h-1.5 bg-amber-100 rounded-full mt-2 overflow-hidden">
                    <div
                      id="neutral-bar"
                      className="progress-bar h-full bg-amber-500 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Negative */}
                <div className="w-1/3 bg-red-50 rounded-xl p-2 sm:p-3 transition-transform duration-300 hover:scale-105">
                  <p className="text-[9px] sm:text-[10px] font-bold text-red-700 mb-2">
                    <i className="fa-solid fa-caret-up"></i> NEGATIVE
                  </p>

                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    <span
                      className="count-up"
                      data-target="11"
                      data-width="11"
                      data-bar="negative-bar"
                    >
                      0
                    </span>
                    %
                  </h4>

                  <div className="h-1.5 bg-red-100 rounded-full mt-2 overflow-hidden">
                    <div
                      id="negative-bar"
                      className="progress-bar h-full bg-red-500 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD 2 ================= */}
          <div className="w-full md:w-1/2 px-3 mb-6">
            <div className="feature-card reveal h-full bg-white p-5 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] text-white flex items-center justify-center shadow-md mr-3 shrink-0">
                  <i className="fa-solid fa-hashtag"></i>
                </div>

                <h3 className="text-base font-bold text-gray-900">
                  Keyword Insights
                </h3>
              </div>

              <p className="text-sm leading-6 text-gray-500 mb-5">
                Surface the words and phrases customers actually use, ranked by
                frequency and relevance, with trends that reveal problems before
                they escalate.
              </p>

              {/* Features */}
              <div>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Frequency + relevance ranking
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Trending term detection
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Keywords by category
                  </li>
                </ul>
              </div>

              {/* Keyword Bars */}
              <div className="mt-7">
                {/* Delivery */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">
                      Delivery
                    </span>

                    <span className="text-xs font-bold text-gray-800">
                      <span
                        className="count-up"
                        data-target="1842"
                        data-width="100"
                        data-bar="delivery-bar"
                      >
                        0
                      </span>
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      id="delivery-bar"
                      className="progress-bar h-full bg-rose-600 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Support */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">
                      Support
                    </span>

                    <span className="text-xs font-bold text-gray-800">
                      <span
                        className="count-up"
                        data-target="1610"
                        data-width="87.4"
                        data-bar="support-bar"
                      >
                        0
                      </span>
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      id="support-bar"
                      className="progress-bar h-full bg-emerald-600 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Quality */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">
                      Quality
                    </span>

                    <span className="text-xs font-bold text-gray-800">
                      <span
                        className="count-up"
                        data-target="1288"
                        data-width="69.9"
                        data-bar="quality-bar"
                      >
                        0
                      </span>
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      id="quality-bar"
                      className="progress-bar h-full bg-amber-600 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">
                      Price
                    </span>

                    <span className="text-xs font-bold text-gray-800">
                      <span
                        className="count-up"
                        data-target="1046"
                        data-width="56.8"
                        data-bar="price-bar"
                      >
                        0
                      </span>
                    </span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      id="price-bar"
                      className="progress-bar h-full bg-rose-500 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD 3 ================= */}
          <div className="w-full md:w-1/2 px-3 mb-6">
            <div className="feature-card reveal h-full bg-white p-5 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1">
              {/* Icon + Title */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] text-white flex items-center justify-center shadow-md mr-3 shrink-0">
                  <i className="fa-solid fa-chart-line"></i>
                </div>

                <h3 className="text-base font-bold text-gray-900">
                  Customer Feedback Analytics
                </h3>
              </div>

              <p className="text-sm leading-6 text-gray-500 mb-5">
                One dashboard for volume, sentiment mix, category performance
                and the items that need a human right now.
              </p>

              {/* Features */}
              <div>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Sentiment over time
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Category breakdown
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Needs-attention queue
                  </li>
                </ul>
              </div>

              {/* Animated Chart */}
              <div className="mt-7 w-full">
                <svg
                  viewBox="0 0 500 160"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Illustrative positive and negative sentiment trends"
                >
                  <g stroke="#E5E7EB" strokeDasharray="3 4">
                    <line x1="35" y1="20" x2="480" y2="20" />
                    <line x1="35" y1="55" x2="480" y2="55" />
                    <line x1="35" y1="90" x2="480" y2="90" />
                    <line x1="35" y1="125" x2="480" y2="125" />
                  </g>

                  <polyline
                    className="chart-line"
                    points="35,42 98,40 161,47 224,41 287,39 350,44 413,38 475,42"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    className="chart-line"
                    points="35,95 98,98 161,100 224,104 287,109 350,111 413,115 475,119"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g fill="#9CA3AF"  fontSize="9" textAnchor="middle">
                    <text x="35" y="145">
                      W1
                    </text>
                    <text x="98" y="145">
                      W2
                    </text>
                    <text x="161" y="145">
                      W3
                    </text>
                    <text x="224" y="145">
                      W4
                    </text>
                    <text x="287" y="145">
                      W5
                    </text>
                    <text x="350" y="145">
                      W6
                    </text>
                    <text x="413" y="145">
                      W7
                    </text>
                    <text x="475" y="145">
                      W8
                    </text>
                  </g>
                </svg>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                <span>Positive</span>

                <span className="w-2 h-2 rounded-full bg-red-600 ml-5 mr-2"></span>
                <span>Negative</span>
              </div>
            </div>
          </div>

          {/* ================= CARD 4 ================= */}
          <div className="w-full md:w-1/2 px-3 mb-6">
            <div className="feature-card reveal h-full bg-white p-5 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1">
              {/* Icon + Title */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] text-white flex items-center justify-center shadow-md mr-3 shrink-0">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>

                <h3 className="text-base font-bold text-gray-900">
                  AI-powered Insights
                </h3>
              </div>

              <p className="text-sm leading-6 text-gray-500 mb-5">
                Plain-language summaries that tell your team what changed, why
                it matters and where to look next.
              </p>

              {/* Features */}
              <div>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Written for non-technical teams
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Theme + root-cause hints
                  </li>

                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-indigo-500 mr-2 mt-0.5"></i>
                    Weekly digest
                  </li>
                </ul>
              </div>

              {/* AI Insight Panel */}
              <div className="mt-7 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Insight Heading */}
                <div className="flex items-center justify-between bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mr-2 shrink-0">
                      <i className="fa-solid fa-brain"></i>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-indigo-900">
                        AI Insight
                      </p>

                      <p className="text-[10px] text-indigo-600">
                        Feedback intelligence
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-indigo-700 bg-white border border-indigo-100 rounded-full px-2 py-1">
                    NEW
                  </span>
                </div>

                {/* Refund Insight */}
                <div className="p-4">
                  <div className="flex items-start">
                    {/* Logo beside Refund */}
                    <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mr-3 shrink-0">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center mb-2">
                        <h4 className="text-sm font-bold text-gray-900 mr-2">
                          Refund delays
                        </h4>

                        <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                          <i className="fa-solid fa-arrow-trend-up mr-1"></i>
                          +14%
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm leading-5 text-gray-600">
                        Refund delays are now the top negative theme, up 14%
                        this week.
                      </p>
                    </div>
                  </div>

                  {/* Suggested Owner */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-tie text-indigo-600 mr-3 text-lg"></i>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Suggested owner
                        </p>
                        <p className="text-sm text-gray-500">Service Ops</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={openInsightModal}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      View details
                      <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                  </div>

                  {/* Insight Modal */}
                  {insightOpen && (
                    <div
                      id="insightModal"
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                      onClick={(event) => {
                        if (event.target === event.currentTarget) {
                          closeInsightModal();
                        }
                      }}
                    >
                      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                              <i className="fa-solid fa-lightbulb text-xl text-yellow-800"></i>
                            </div>

                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                AI Insight Details
                              </h3>
                              <p className="text-sm text-gray-500">
                                Refund delays analysis
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={closeInsightModal}
                            className="text-xl text-gray-500 hover:text-gray-800"
                            aria-label="Close modal"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>

                        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                          <div className="mb-2 flex items-center">
                            <i className="fa-solid fa-triangle-exclamation mr-2 text-orange-500"></i>
                            <h4 className="font-semibold text-gray-800">
                              Refund delays detected
                            </h4>
                          </div>

                          <p className="text-sm leading-6 text-gray-600">
                            Customer feedback indicates that refund processing
                            time is a recurring concern. The Service Ops team
                            should review the refund workflow and identify
                            possible bottlenecks.
                          </p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4">
                          <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-sm text-gray-500">
                              Sentiment trend
                            </p>
                            <p className="mt-1 font-bold text-red-500">
                              Needs attention
                            </p>
                          </div>

                          <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-sm text-gray-500">
                              Suggested owner
                            </p>
                            <p className="mt-1 font-bold text-gray-800">
                              Service Ops
                            </p>
                          </div>
                        </div>

                        <div className="mt-5">
                          <h4 className="mb-2 font-semibold text-gray-800">
                            Recommended actions
                          </h4>

                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                            <li>Review pending refund requests.</li>
                            <li>Identify delays in the refund process.</li>
                            <li>
                              Improve customer communication about refund
                              status.
                            </li>
                          </ul>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={closeInsightModal}
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
