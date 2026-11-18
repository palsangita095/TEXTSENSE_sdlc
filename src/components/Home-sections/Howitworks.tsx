"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

type WorkflowStep = {
  icon: string;
  iconBg: string;
  iconColor: string;
  stepBg: string;
  stepColor: string;
  step: string;
  title: string;
  description: string;
  footerIcon: string;
  footerText: string;
};

const workflowSteps: WorkflowStep[] = [
  {
    icon: "fa-solid fa-pen-to-square",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    stepBg: "bg-indigo-50",
    stepColor: "text-indigo-600",
    step: "Step 01",
    title: "Submit Your Text",
    description:
      "Submit customer feedback, reviews, complaints, suggestions, or comments through the platform.",
    footerIcon: "fa-regular fa-clock",
    footerText: "Web, email, in-app, API",
  },
  {
    icon: "fa-solid fa-filter",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    stepBg: "bg-purple-50",
    stepColor: "text-purple-600",
    step: "Step 02",
    title: "Text Preprocessing",
    description:
      "The system cleans and prepares the submitted text using tokenization and other NLP techniques.",
    footerIcon: "fa-regular fa-clock",
    footerText: "Text preprocessing",
  },
  {
    icon: "fa-solid fa-brain",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    stepBg: "bg-pink-50",
    stepColor: "text-pink-600",
    step: "Step 03",
    title: "NLP Analysis",
    description:
      "NLP techniques analyze the text to identify sentiment, confidence, keywords, and categories.",
    footerIcon: "fa-solid fa-magnifying-glass",
    footerText: "Sentiment and keywords",
  },
  {
    icon: "fa-solid fa-database",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    stepBg: "bg-emerald-50",
    stepColor: "text-emerald-600",
    step: "Step 04",
    title: "Store Results",
    description:
      "The processed text and its analysis results are stored for future access and reporting.",
    footerIcon: "fa-solid fa-lightbulb",
    footerText: "Actionable insights",
  },
  {
    icon: "fa-solid fa-chart-pie",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    stepBg: "bg-orange-50",
    stepColor: "text-orange-600",
    step: "Step 05",
    title: "View Insights",
    description:
      "Explore dashboards and reports to understand customer opinions and make better decisions.",
    footerIcon: "fa-solid fa-chart-line",
    footerText: "Team analytics and reports",
  },
];

const Howitworks = () => {
  return (
    <section id="how-it-works" className="sm:py-5 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Process
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How TEXTSENSE Works
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Turn customer feedback into meaningful insights through our simple
            and intelligent text analysis process.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative px-1 sm:px-2">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            speed={600}
            loop={false}
            grabCursor={true}
            navigation={{
              nextEl: ".workflow-next",
              prevEl: ".workflow-prev",
            }}
            pagination={{
              el: ".workflow-pagination",
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}">${index + 1}</span>`;
              },
            }}
            breakpoints={{
              640: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
              1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
              1280: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 20 },
            }}
          >
            {workflowSteps.map((step) => (
              <SwiperSlide key={step.title}>
                <div className="h-full rounded-2xl border border-indigo-100 bg-white p-6 text-center shadow-sm flex flex-col">
                  <div
                    className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${step.iconBg} ${step.iconColor}`}
                  >
                    <i className={`${step.icon} text-2xl`}></i>
                  </div>

                  <span
                    className={`mb-3 inline-block self-center rounded-full ${step.stepBg} px-4 py-1 text-sm font-semibold ${step.stepColor}`}
                  >
                    {step.step}
                  </span>

                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>

                  <div className="mt-auto flex items-start border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500 pt-4 mt-4">
                    <i
                      className={`${step.footerIcon} mr-2 mt-1 text-indigo-600`}
                    ></i>
                    <span>{step.footerText}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Arrow */}
          <button
            type="button"
            className="workflow-prev absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-indigo-600 shadow-lg border border-indigo-100 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="workflow-next absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-indigo-600 shadow-lg border border-indigo-100 flex items-center justify-center"
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Numbered Pagination */}
        <div className="workflow-pagination flex justify-center items-center mt-8"></div>
      </div>
    </section>
  );
};

export default Howitworks;
