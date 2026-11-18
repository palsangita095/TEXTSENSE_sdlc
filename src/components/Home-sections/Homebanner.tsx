"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Homebanner = () => {
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters =
      countersRef.current?.querySelectorAll<HTMLElement>(".counter");

    if (!counters?.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counter = entry.target as HTMLElement;
          const target = Number(counter.dataset.target);
          const decimals = Number(counter.dataset.decimals);

          if (reduceMotion) {
            counter.textContent = target.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
            observer.unobserve(counter);
            return;
          }

          const duration = 2000;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const value = target * progress;

            counter.textContent = value.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            }
          };

          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative pt-16 lg:pt-24 pb-5 bg-gradient-to-b from-indigo-50/40 via-white to-white overflow-hidden"
      id="analyze"
    >
      <div className="absolute -top-20 left-1/2 -z-10 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/30 to-blue-100/20 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-2">
          <div className="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center bg-white shadow-md border border-indigo-100 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 ring-4 ring-indigo-50/50 transition-all duration-300 hover:shadow-lg">
            <span className="bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mr-2.5 shrink-0 shadow-sm">
              NEW
            </span>
            <span className="text-gray-700 font-semibold font-inter">
              Sentiment model v4.2 &mdash; 91% benchmark accuracy
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div
              className="w-full lg:w-1/2 lg:pr-8 mb-12 lg:mb-0"
              id="features"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-inter font-extrabold tracking-tight text-gray-900 leading-[1.15]">
                Turn Customer Feedback Into{" "}
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent underline decoration-indigo-300 decoration-wavy decoration-2 underline-offset-8">
                  Actionable Insights
                </span>
              </h1>

              <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                TEXTSENSE uses AI-powered text analytics to understand customer
                feedback, identify sentiment, discover important themes, and
                help teams make better decisions.
              </p>

              <div className="mt-8 flex flex-wrap items-center">
                <a
                  href="#analyze"
                  className="inline-flex items-center justify-center rounded-xl bg-[#4338CABF] px-6 py-3.5 text-sm font-inter font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:bg-indigo-700 hover:shadow-indigo-500/40 hover:-translate-y-0.5 mr-3 mb-3 sm:mb-0"
                >
                  Analyze Feedback
                  <i className="fa-solid fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900 font-medium px-5 py-3.5 transition-all duration-300 border border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 mb-3 sm:mb-0"
                >
                  <Image
                    src="/assets/images/home_page/work.png"
                    alt="work"
                    width={17}
                    height={17}
                    className="mr-2 w-4 h-4 shrink-0 object-contain"
                  />
                  How It Works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center text-sm text-gray-500">
                <div className="flex items-center mr-6 mb-2">
                  <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  No credit card required
                </div>

                <div className="flex items-center mr-6 mb-2">
                  <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  26 languages
                </div>

                <div className="flex items-center mb-2">
                  <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  SOC 2 Type II
                </div>
              </div>

              {/* Statistics */}
              <div
                ref={countersRef}
                className="mt-12 pt-8 border-t border-gray-200/80 flex flex-wrap text-center sm:text-left"
              >
                <div className="w-1/2 sm:w-1/3 mb-6 sm:mb-0 pr-2">
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    <span
                      className="counter"
                      data-target="12.4"
                      data-decimals="1"
                    >
                      12.4
                    </span>
                    <span className="text-indigo-600">M</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Messages analysed
                  </p>
                </div>

                <div className="w-1/2 sm:w-1/3 mb-6 sm:mb-0 px-2">
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    <span className="counter" data-target="91" data-decimals="0">
                      91
                    </span>
                    <span className="text-indigo-600">%</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Model accuracy
                  </p>
                </div>

                <div className="w-full sm:w-1/3 pl-0 sm:pl-2">
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    <span
                      className="counter"
                      data-target="2600"
                      data-decimals="0"
                    >
                      2,600
                    </span>
                    <span className="text-indigo-600">+</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Teams onboard
                  </p>
                </div>
              </div>
            </div>

            {/* Right Analysis Card */}
            <div className="w-full lg:w-1/2 lg:pl-4">
              <div className="relative w-full max-w-xl mx-auto before:absolute before:-inset-2 before:bg-gradient-to-r before:from-indigo-100 before:to-blue-50 before:rounded-3xl before:blur-xl before:opacity-75">
                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-2xl p-5 sm:p-7 shadow-2xl text-gray-800">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-1.5"></span>
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1.5"></span>
                      <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
                    </div>

                    <div className="flex items-center bg-gray-50 border border-gray-200/60 rounded-full px-3 py-1 text-xs text-gray-500 font-mono shadow-sm ml-2">
                      <svg
                        className="w-3 h-3 text-emerald-500 mr-1.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                      <span className="truncate">app.textsense.ai/analyze</span>
                    </div>
                    <div className="w-6"></div>
                  </div>

                  {/* Feedback Analysis Box */}
                  <div className="relative pt-1">
                    {/* Positive Sentiment Badge */}
                    <div className="absolute -top-3 -left-2 sm:-left-6 bg-white border border-gray-100 shadow-xl rounded-2xl px-3.5 py-2 flex items-center z-20">
                      <div className="w-8 h-8 text-emerald-600 bg-emerald-50 rounded-xl flex items-center justify-center mr-2.5 shrink-0 font-bold">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">
                          +18%
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium">
                          Positive sentiment
                        </div>
                      </div>
                    </div>

                    {/* Live Input Indicator */}
                    <div className="flex justify-end mb-3">
                      <span className="inline-flex items-center bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1.5 animate-pulse"></span>
                        LIVE ANALYSIS
                      </span>
                    </div>

                    {/* Customer Feedback Content */}
                    <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 sm:p-5 shadow-inner">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Customer Feedback Input
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                        &ldquo;The support team was very helpful, but the
                        response took longer than expected. Overall I am
                        satisfied with the service.&rdquo;
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/2 bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 text-center mb-2 sm:mb-0 sm:mr-2">
                        <span className="block text-[10px] font-bold uppercase text-emerald-600">
                          Support Quality
                        </span>
                        <span className="text-xs font-extrabold text-emerald-800">
                          Positive (94%)
                        </span>
                      </div>
                      <div className="w-full sm:w-1/2 bg-amber-50/60 border border-amber-100 rounded-xl p-2.5 text-center sm:ml-2">
                        <span className="block text-[10px] font-bold uppercase text-amber-600">
                          Response Speed
                        </span>
                        <span className="text-xs font-extrabold text-amber-800">
                          Needs Attention
                        </span>
                      </div>
                    </div>

                    {/* Delivery Mentions Badge */}
                    <div className="absolute -bottom-10 sm:-bottom-10 -right-2 sm:-right-4 bg-white border border-gray-100 shadow-xl rounded-2xl px-3.5 py-2 flex items-center z-20">
                      <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-sm mr-2.5 shrink-0">
                        #
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">
                          1,842
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium">
                          &quot;Delivery&quot; mentions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homebanner;
