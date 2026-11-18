import Image from "next/image";

/**
 * Right-hand product preview of the original login.html
 * (dashboard card, sentiment chart, metrics, features, trusted-by).
 * Purely presentational.
 */
const LoginPreview = () => {
  return (
    <section className="mt-12 w-full lg:mt-0 lg:w-1/2 lg:pl-10 xl:pl-14">
      <div className="preview-card mx-auto w-full max-w-[580px]">
        {/* DASHBOARD CARD */}
        <div className="rounded-[24px] border border-white/80 bg-white/55 p-5 shadow-[0_25px_70px_-25px_rgba(49,46,129,0.30)] backdrop-blur-xl sm:rounded-[30px] sm:p-7 lg:p-8">
          {/* CARD HEADING */}
          <div className="mb-7 flex items-center">
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50">
              <i className="fa-solid fa-chart-line text-xl text-emerald-600"></i>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Real-time Intelligence
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                Turn feedback into actionable insights.
              </p>
            </div>

            <span className="ml-2 hidden shrink-0 items-center rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 sm:inline-flex">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              LIVE
            </span>
          </div>

          {/* CHART CARD */}
          <div className="mb-6 rounded-2xl border border-white/90 bg-white/65 p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 sm:text-sm">
                  Customer Sentiment Trend
                </p>

                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  Weekly performance overview
                </p>
              </div>

              <span className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600 sm:mt-0 sm:text-xs">
                <i className="fa-solid fa-arrow-trend-up mr-1.5"></i>
                +22%
              </span>
            </div>

            {/* CHART BARS */}
            <div
              className="flex h-[100px] items-end border-b border-slate-200/80 px-1 sm:h-[125px]"
              role="img"
              aria-label="Illustrative customer sentiment trend over seven weeks"
            >
              <div className="sentiment-bar mr-2 h-[45%] min-w-0 flex-1 rounded-t-md bg-indigo-300/80"></div>
              <div className="sentiment-bar mr-2 h-[58%] min-w-0 flex-1 rounded-t-md bg-indigo-300"></div>
              <div className="sentiment-bar mr-2 h-[52%] min-w-0 flex-1 rounded-t-md bg-indigo-400/80"></div>
              <div className="sentiment-bar mr-2 h-[72%] min-w-0 flex-1 rounded-t-md bg-indigo-400"></div>
              <div className="sentiment-bar mr-2 h-[67%] min-w-0 flex-1 rounded-t-md bg-indigo-500/90"></div>
              <div className="sentiment-bar mr-2 h-[88%] min-w-0 flex-1 rounded-t-md bg-indigo-500"></div>
              <div className="sentiment-bar h-full min-w-0 flex-1 rounded-t-md bg-indigo-600"></div>
            </div>

            {/* CHART LABELS */}
            <div className="mt-3 flex justify-between px-1 text-[9px] font-medium text-slate-400 sm:text-[10px]">
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
              <span>W5</span>
              <span>W6</span>
              <span>W7</span>
            </div>

            {/* CHART LEGEND */}
            <div className="mt-5 flex flex-wrap items-center">
              <span className="mr-4 mb-2 inline-flex items-center text-[10px] text-slate-500 sm:text-xs">
                <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                Positive
              </span>

              <span className="mr-4 mb-2 inline-flex items-center text-[10px] text-slate-500 sm:text-xs">
                <span className="mr-2 h-2 w-2 rounded-full bg-slate-300"></span>
                Customer signals
              </span>
            </div>
          </div>

          {/* METRIC CARDS */}
          <div className="mb-6 flex flex-wrap -mx-2">
            <div className="mb-3 w-1/2 px-2">
              <div className="h-full rounded-xl border border-white bg-white/70 p-3 sm:p-4">
                <div className="mb-2 flex items-center">
                  <i className="fa-solid fa-face-smile mr-2 text-sm text-emerald-600"></i>
                  <span className="text-[10px] text-slate-500 sm:text-xs">Positive</span>
                </div>

                <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">84%</p>

                <p className="mt-1 text-[10px] text-emerald-600">
                  <i className="fa-solid fa-arrow-up mr-1"></i>
                  Customer sentiment
                </p>
              </div>
            </div>

            <div className="mb-3 w-1/2 px-2">
              <div className="h-full rounded-xl border border-white bg-white/70 p-3 sm:p-4">
                <div className="mb-2 flex items-center">
                  <i className="fa-solid fa-comments mr-2 text-sm text-indigo-600"></i>
                  <span className="text-[10px] text-slate-500 sm:text-xs">Analysed</span>
                </div>

                <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">12.4K</p>

                <p className="mt-1 text-[10px] text-slate-500">Feedback messages</p>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="border-t border-indigo-100/80 pt-5">
            <div className="mb-4 flex items-start">
              <span className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                <i className="fa-solid fa-check text-sm text-emerald-600"></i>
              </span>

              <div>
                <h3 className="text-xs font-bold text-slate-800 sm:text-sm">
                  Automated feedback analysis
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  Categorize messages and discover important keywords.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                <i className="fa-solid fa-brain text-sm text-indigo-600"></i>
              </span>

              <div>
                <h3 className="text-xs font-bold text-slate-800 sm:text-sm">
                  Smarter customer insights
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  Understand customer sentiment and identify emerging trends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8 px-2 text-center sm:mt-10 lg:text-left">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 sm:text-xs">
            Understand every customer signal
          </p>

          <h3 className="mx-auto mb-4 max-w-[520px] text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:mx-0">
            Master your customer intelligence
          </h3>

          <p className="mx-auto max-w-[500px] text-sm leading-6 text-slate-600 sm:text-base lg:mx-0">
            TEXTSENSE empowers teams to turn customer words into actionable insights and better
            decisions.
          </p>
        </div>

        {/* TRUSTED BY */}
        <div className="mt-8 flex flex-wrap items-center justify-center sm:mt-9 lg:justify-start">
          <div className="mr-4 mb-3 flex items-center sm:mb-0">
            <Image
              src="/assets/images/auth/profile-1.jpg"
              alt="TEXTSENSE customer profile 1"
              width={36}
              height={36}
              className="relative z-30 h-9 w-9 rounded-full border-2 border-white object-cover"
            />

            <Image
              src="/assets/images/auth/profile-2.jpg"
              alt="TEXTSENSE customer profile 2"
              width={36}
              height={36}
              className="relative z-20 -ml-3 h-9 w-9 rounded-full border-2 border-white object-cover"
            />

            <Image
              src="/assets/images/auth/profile-3.jpg"
              alt="TEXTSENSE customer profile 3"
              width={36}
              height={36}
              className="relative z-10 -ml-3 h-9 w-9 rounded-full border-2 border-white object-cover"
            />
          </div>

          <p className="text-center text-[10px] leading-5 text-slate-600 sm:text-xs">
            Trusted by teams building better customer experiences
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPreview;
