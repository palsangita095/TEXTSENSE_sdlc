const stats = [
  {
    icon: "fa-solid fa-comments",
    iconBg: "bg-cyan-300/15",
    iconColor: "text-cyan-200",
    value: "12.4M",
    label: "Messages analysed",
  },
  {
    icon: "fa-solid fa-chart-line",
    iconBg: "bg-violet-300/15",
    iconColor: "text-violet-200",
    value: "91%",
    label: "Model accuracy",
  },
  {
    icon: "fa-solid fa-bolt",
    iconBg: "bg-blue-300/15",
    iconColor: "text-blue-200",
    value: "1.8s",
    label: "Average analysis time",
  },
];

const Ctasection = () => {
  return (
    <section className="relative overflow-hidden pb-20">
      <div className="container mx-auto px-5 lg:px-8">
        {/* CTA MAIN BOX */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123FC4] via-[#102F9B] to-[#071746] px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-20">
          {/* Background Glow */}
          <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-blue-400/30 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none"></div>

          {/* Decorative Circle */}
          <div className="absolute top-10 right-10 hidden lg:block w-24 h-24 rounded-full border border-white/10"></div>
          <div className="absolute top-16 right-16 hidden lg:block w-12 h-12 rounded-full border border-white/10"></div>

          {/* CTA CONTENT */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2.5 mb-7">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 mr-2">
                <i className="fa-solid fa-wand-sparkles text-xs text-cyan-200"></i>
              </span>

              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-100">
                Listen. Understand. Improve.
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6">
              Your customers already
              <span className="block mt-1 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                told you what to fix.
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-blue-100/85 mb-9">
              Turn customer feedback into meaningful insights. Discover what
              people feel, identify recurring issues and make smarter decisions
              with TEXTSENSE.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center">
              {/* Primary Button */}
              <a
                href="#analyze"
                className="group inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-white px-6 sm:px-7 py-4 mb-3 sm:mb-0 sm:mr-4 text-sm font-bold text-blue-900 shadow-xl shadow-blue-950/20 hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300"
              >
                Analyze Feedback
                <i className="fa-solid fa-arrow-right ml-3 transition-transform duration-300 group-hover:translate-x-1"></i>
              </a>

              {/* Secondary Button */}
              <a
                href="#how-it-works"
                className="group inline-flex items-center justify-center w-full sm:w-auto rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm px-6 sm:px-7 py-4 text-sm font-semibold text-white hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-regular fa-circle-play mr-3 text-lg"></i>
                How It Works
                <i className="fa-solid fa-arrow-up-right-from-square ml-3 text-xs opacity-70"></i>
              </a>
            </div>

            {/* Supporting Text */}
            <p className="flex flex-wrap items-center justify-center text-xs text-blue-100/75 mt-5">
              <span className="inline-flex items-center mr-4 mb-2">
                <i className="fa-solid fa-check-circle text-cyan-200 mr-2"></i>
                No credit card required
              </span>

              <span className="inline-flex items-center mb-2">
                <i className="fa-solid fa-check-circle text-cyan-200 mr-2"></i>
                Simple to get started
              </span>
            </p>

            {/* STATISTICS PANEL */}
            <div className="mt-12 sm:mt-16">
              <div className="border-t border-white/20 mb-7"></div>

              <div className="flex flex-wrap -mx-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="w-full sm:w-1/3 px-3 mb-4 sm:mb-0"
                  >
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-sm px-4 py-6 sm:py-7 hover:bg-white/10 transition duration-300">
                      <div className="flex items-center justify-center mb-3">
                        <span
                          className={`flex items-center justify-center w-9 h-9 rounded-xl ${stat.iconBg} ${stat.iconColor} mr-3`}
                        >
                          <i className={stat.icon}></i>
                        </span>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {stat.value}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-blue-100/75">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Trust Note */}
            <div className="flex flex-wrap items-center justify-center mt-8 text-xs text-blue-100/60">
              <i className="fa-solid fa-shield-halved mr-2"></i>
              <span>Built to help teams understand customer feedback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ctasection;

