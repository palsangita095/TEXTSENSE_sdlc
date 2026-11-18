const stories = [
  {
    quote:
      "We went from reading feedback in a spreadsheet to knowing exactly which theme to fix each sprint. TEXTSENSE paid for itself in the first month.",
    metricIcon: "fa-solid fa-arrow-trend-down",
    metric: "-34% negative sentiment",
    initials: "AI",
    name: "Ananya Iyer",
    role: "Head of Customer Experience, Brightpath",
  },
  {
    quote:
      "The confidence score and key terms make the AI explainable to non-technical stakeholders. Our execs finally trust the sentiment dashboard.",
    metricIcon: "fa-solid fa-arrow-trend-up",
    metric: "12 hrs saved weekly",
    initials: "MH",
    name: "Marcus Hale",
    role: "VP Operations, Lumen Labs",
  },
  {
    quote:
      "Keyword analytics surfaced a packaging issue three weeks before it hit our NPS. That is the whole value proposition right there.",
    metricIcon: "fa-solid fa-arrow-trend-up",
    metric: "3 weeks earlier detection",
    initials: "GW",
    name: "Grace Whitfield",
    role: "Director of Insights, Tidalform",
  },
];

const Customerstories = () => {
  return (
    <section className="py-20 px-4 md:px-8 min-h-screen flex flex-col justify-center items-center text-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="bg-[#1D2635] text-gray-300 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-4 border border-gray-700/50 shadow-sm">
            Customer Stories
          </span>

          <h2 className="text-3xl md:text-[45px] text-black font-extrabold tracking-tight mb-4 mx-auto max-w-[620px] leading-tight">
            The teams closest to customers trust{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              TEXTSENSE
            </span>
          </h2>

          {/* Rating & Review Count */}
          <div className="flex items-center justify-center text-sm text-gray-400 mt-4 gap-2">
            <div className="flex text-amber-400 text-xs gap-1">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>

            <p className="text-gray-300">
              <strong>4.9/5</strong> average across 480+ reviews
            </p>
          </div>
        </div>

        {/* Cards Wrapper */}
        <div className="flex flex-wrap -mx-3">
          {stories.map((story) => (
            <div
              key={story.name}
              className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6"
            >
              <div className="h-full bg-[#131B28] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group">
                <div>
                  <div className="text-slate-500 group-hover:text-emerald-400 transition-colors duration-300 text-3xl font-serif mb-3">
                    &ldquo;
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {story.quote}
                  </p>
                </div>

                <div>
                  {/* Metric Badge */}
                  <div className="inline-flex items-center bg-[#0F292B] text-[#34D399] border border-[#164E4D] text-xs font-medium px-3 py-1 rounded-full mb-6 transition-all duration-300 hover:bg-[#15383a]">
                    <i className={`${story.metricIcon} text-[10px] mr-1.5`}></i>
                    {story.metric}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center pt-4 border-t border-slate-800/80">
                    <div className="w-10 h-10 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0 mr-3 border border-slate-600/50">
                      {story.initials}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {story.name}
                      </h4>

                      <p className="text-xs text-slate-400">{story.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Customerstories;
