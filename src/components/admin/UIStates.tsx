export default function UIStates() {
  return (
    <section className="mb-8">
      <div className="mb-5 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold">UI States</h3>
          <p className="mt-1 text-sm text-slate-500">
            Reference examples for different application states
          </p>
        </div>

        <span className="mt-3 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 sm:mt-0">
          <i className="fa-solid fa-layer-group mr-1"></i>5 Components
        </span>
      </div>

      <div className="-mx-2 flex flex-wrap">
        <div className="w-full px-2 pb-4 min-[480px]:w-1/2 lg:w-1/3 xl:w-1/5">
          <article className="h-full min-h-[225px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-sm font-bold">Loading Skeleton</h4>
              <i className="fa-solid fa-spinner text-blue-600"></i>
            </div>

            <div className="animate-pulse">
              <div className="mb-3 flex items-center">
                <div className="mr-2 h-9 w-9 rounded-full bg-slate-100"></div>

                <div className="flex-1">
                  <div className="mb-2 h-2.5 w-3/4 rounded-full bg-slate-100"></div>
                  <div className="h-2 w-1/2 rounded-full bg-slate-100"></div>
                </div>
              </div>

              <div className="mb-2 h-2.5 w-full rounded-full bg-slate-100"></div>
              <div className="mb-2 h-2.5 w-4/5 rounded-full bg-slate-100"></div>
              <div className="h-8 w-full rounded-lg bg-slate-100"></div>
            </div>

            <p className="mt-4 text-xs text-slate-400">Loading content...</p>
          </article>
        </div>

        <div className="w-full px-2 pb-4 min-[480px]:w-1/2 lg:w-1/3 xl:w-1/5">
          <article className="flex h-full min-h-[225px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-4 text-sm font-bold">Empty State</h4>

            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <i className="fa-regular fa-folder-open mb-3 text-3xl text-slate-400"></i>
              <p className="text-sm font-bold">No feedback found</p>
              <p className="mt-1 text-xs text-slate-400">Feedback records will appear here.</p>
              <span className="mt-3 rounded-lg bg-slate-100 px-3 py-1.5 text-xs">No Data</span>
            </div>
          </article>
        </div>

        <div className="w-full px-2 pb-4 min-[480px]:w-1/2 lg:w-1/3 xl:w-1/5">
          <article className="h-full min-h-[225px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-5 text-sm font-bold">Chart Loading</h4>

            <div className="flex h-24 items-end justify-around border-b border-l border-slate-100 px-2 pb-1">
              <div className="h-8 w-5 animate-pulse rounded-t bg-purple-100"></div>
              <div className="h-14 w-5 animate-pulse rounded-t bg-purple-100"></div>
              <div className="h-20 w-5 animate-pulse rounded-t bg-purple-100"></div>
              <div className="h-11 w-5 animate-pulse rounded-t bg-purple-100"></div>
              <div className="h-16 w-5 animate-pulse rounded-t bg-purple-100"></div>
            </div>

            <p className="mt-4 text-xs text-slate-400">Preparing chart data...</p>
          </article>
        </div>

        <div className="w-full px-2 pb-4 min-[480px]:w-1/2 lg:w-1/3 xl:w-1/5">
          <article className="flex h-full min-h-[225px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-5 text-sm font-bold">Error State</h4>

            <div className="mt-auto rounded-xl border border-red-100 bg-red-50 p-3">
              <p className="mb-2 text-sm font-bold text-red-600">Something went wrong</p>
              <p className="text-xs text-red-500">Failed to load data. Please try again.</p>
              <button className="mt-4 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white">
                Retry
              </button>
            </div>
          </article>
        </div>

        <div className="w-full px-2 pb-4 min-[480px]:w-1/2 lg:w-1/3 xl:w-1/5">
          <article className="flex h-full min-h-[225px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-5 text-sm font-bold">Success State</h4>

            <div className="mt-auto rounded-xl border border-emerald-100 bg-emerald-50 p-3">
              <p className="mb-2 text-sm font-bold text-emerald-700">Success!</p>
              <p className="text-xs text-emerald-600">
                Your changes have been saved successfully.
              </p>
              <p className="mt-4 text-xs font-semibold text-emerald-700">✓ All changes saved</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
