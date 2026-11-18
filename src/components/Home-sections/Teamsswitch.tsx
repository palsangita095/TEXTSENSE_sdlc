const switchCards = [
  {
    icon: "fa-regular fa-clock",
    stat: "12 hrs",
    statLabel: "SAVED PER WEEK, PER TEAM",
    title: "Stop reading feedback line by line",
    description:
      "Teams replace hours of manual tagging with an automated pass that classifies, categorises, and summarises every item.",
  },
  {
    icon: "fa-solid fa-bullseye",
    stat: "3x",
    statLabel: "FASTER ISSUE PRIORITISATION",
    title: "Fix the right thing first",
    description:
      "Ranked keywords and category performance show exactly which theme is costing you the most goodwill.",
  },
  {
    icon: "fa-solid fa-arrow-trend-down",
    stat: "-34%",
    statLabel: "NEGATIVE SENTIMENT IN 90 DAYS",
    title: "Catch problems before they spread",
    description:
      "Trend detection flags a rising negative theme while it is still a handful of comments, not a crisis.",
  },
  {
    icon: "fa-solid fa-users",
    stat: "100%",
    statLabel: "OF RESULTS EXPLAINED IN WORDS",
    title: "Give everyone the same picture",
    description:
      "Support, product and leadership read one dashboard written in plain language — no analyst translation required.",
  },
];

const Teamsswitch = () => {
  return (
    <section className="relative py-20 bg-slate-50 text-gray-900 font-sans overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Left Column */}
          <div className="w-full lg:w-5/12 lg:pr-12 mb-12 lg:mb-0">
            <div>
              {/* Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold text-xs rounded-full uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                  Why Teams Switch
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.15] text-gray-900 mb-6">
                Feedback you can act on,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  not just archive
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                TEXTSENSE is built around one belief: an insight nobody
                understands is not an insight. Every output is explainable,
                labelled, and tied to a next step.
              </p>

              {/* Quote / Testimonial Box */}
              <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-sm relative">
                <span className="absolute -top-3 left-6 px-2 bg-slate-50 text-blue-600 text-2xl font-serif leading-none">
                  &ldquo;
                </span>
                <blockquote className="text-gray-800 italic text-base leading-snug">
                  We replaced a 40-tab spreadsheet and two weekly meetings with
                  one TEXTSENSE dashboard.
                </blockquote>

                <div className="mt-4 flex items-center">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white font-bold flex items-center justify-center text-xs mr-3 shadow">
                    DO
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-none">
                      Daniel Okafor
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Head of Product, Kiteworks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="w-full lg:w-7/12 flex flex-wrap -mx-3 -my-3">
            {switchCards.map((card) => (
              <div key={card.title} className="w-full sm:w-1/2 p-3">
                <div className="group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 h-full flex flex-col justify-between">
                  <div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-all duration-300 mb-6">
                      <i className={card.icon}></i>
                    </div>

                    {/* Stat */}
                    <div className="mb-4">
                      <div className="text-4xl font-extrabold text-blue-600 tracking-tight">
                        {card.stat}
                      </div>
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
                        {card.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teamsswitch;
