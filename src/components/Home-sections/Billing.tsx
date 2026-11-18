"use client";
import { useState } from "react";

type Plan = {
  name: string;
  description: string;
  featured?: boolean;
  cta: string;
  includedHeading: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    description:
      "Ideal for individuals exploring an idea, students, and small projects.",
    cta: "Start for Free",
    includedHeading: "What's included",
    features: [
      "250 text analyses per month",
      "Sentiment analysis and key terms",
      "Feedback history",
      "1 workspace member",
      "Community support",
    ],
  },
  {
    name: "Growth",
    featured: true,
    description:
      "Perfect for product and customer experience teams that analyse feedback regularly.",
    cta: "Start 14-Day Free Trial",
    includedHeading: "Everything in Starter, plus",
    features: [
      "10,000 text analyses per month",
      "Keyword and topic analytics",
      "Sentiment trend reports",
      "Up to 10 workspace members",
      "CSV and PDF report exports",
      "Email and chat support",
    ],
  },
  {
    name: "Enterprise",
    description:
      "Built for organisations that need advanced security, compliance, and scalable analytics.",
    cta: "Contact Sales",
    includedHeading: "Everything in Growth, plus",
    features: [
      "Custom analysis volume",
      "Custom categories and models",
      "SSO, SAML, and audit logs",
      "Unlimited workspace members",
      "Regional data residency options",
      "Dedicated customer success manager",
    ],
  },
];

const Billing = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  return (
    <section
      id="pricing"
      className="lg:py-5 px-4 md:px-8 bg-white text-slate-900 font-sans min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        {/* Pricing Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4 border border-indigo-100">
            Pricing
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Simple plans that scale with your feedback volume
          </h2>

          <p className="text-slate-600 text-sm md:text-base mb-8 leading-7">
            Start free and upgrade as your team grows. Every plan includes
            sentiment analysis, key terms, and feedback history.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex flex-wrap items-center justify-center bg-slate-100 p-1.5 rounded-full border border-slate-200">
            <span
              className={`text-sm font-medium px-3 py-1 transition-colors ${
                isAnnual ? "text-slate-500" : "text-slate-900"
              }`}
            >
              Monthly
            </span>

            <button
              type="button"
              aria-label="Switch billing period"
              aria-pressed={isAnnual}
              onClick={() => setIsAnnual((prev) => !prev)}
              className={`w-11 h-6 rounded-full relative cursor-pointer flex items-center px-0.5 shrink-0 transition-colors ${
                isAnnual ? "bg-blue-600" : "bg-slate-400"
              }`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              ></span>
            </button>

            <span
              className={`text-sm font-medium px-2 py-1 transition-colors ${
                isAnnual ? "text-slate-900" : "text-slate-500"
              }`}
            >
              Annual
            </span>

            <span
              className={`bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full mx-1 ${
                isAnnual ? "" : "hidden"
              }`}
            >
              SAVE 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap -mx-3 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6"
            >
              <div
                className={`h-full bg-white rounded-2xl p-6 md:p-8 flex flex-col ${
                  plan.featured
                    ? "border-2 border-blue-600 shadow-xl shadow-blue-100 relative"
                    : "border border-slate-200 shadow-sm"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.featured ? "mt-2" : ""
                  }`}
                >
                  {plan.name}
                </h3>

                <p className="text-slate-600 text-sm leading-6 mb-6">
                  {plan.description}
                </p>

                {plan.name === "Growth" ? (
                  <>
                    <div className="text-4xl font-extrabold mb-2">
                      <span>{isAnnual ? "$39" : "$49"}</span>
                      <span className="text-slate-500 text-sm font-normal">
                        / month
                      </span>
                    </div>

                    <p className="text-xs text-emerald-600 mb-6">
                      {isAnnual
                        ? "Billed annually. Save 20%."
                        : "Billed monthly. Cancel anytime."}
                    </p>
                  </>
                ) : (
                  <div className="text-4xl font-extrabold mb-6">
                    {plan.name === "Starter" ? (
                      <>
                        $0
                        <span className="text-slate-500 text-sm font-normal">
                          / month
                        </span>
                      </>
                    ) : (
                      "Custom"
                    )}
                  </div>
                )}

                <a
                  href="#"
                  className={`block w-full font-semibold py-3 px-4 rounded-xl transition mb-8 text-sm text-center ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "bg-white hover:bg-slate-50 text-slate-900 border border-slate-300"
                  }`}
                >
                  {plan.cta}{" "}
                  <i className="fa-solid fa-arrow-right-long"></i>
                </a>

                <h4 className="text-sm font-semibold text-slate-900 mb-4">
                  {plan.includedHeading}
                </h4>

                <div>
                  <ul className="text-sm text-slate-600">
                    {plan.features.map((feature, index) => (
                      <li
                        key={feature}
                        className={`flex items-start ${
                          index === plan.features.length - 1 ? "" : "mb-3"
                        }`}
                      >
                        <i className="fa-solid fa-check text-blue-600 mr-2 mt-1 shrink-0"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-center text-gray-400">
            All plans include SSL encryption, data residency options and 99.9%
            uptime SLA on paid tiers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Billing;
