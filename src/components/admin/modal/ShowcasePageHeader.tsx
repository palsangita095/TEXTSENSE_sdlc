export default function ShowcasePageHeader() {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              TEXTSENSE • USER MANAGEMENT
            </p>

            <h1 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
              Add / Edit User Modal — States
            </h1>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center text-xs font-medium text-slate-500 sm:mt-0">
          <span className="mr-2 mb-2 rounded-lg bg-slate-100 px-3 py-2 sm:mb-0">
            Desktop · 1440
          </span>

          <span className="mr-2 mb-2 rounded-lg bg-slate-100 px-3 py-2 sm:mb-0">
            Modal · 440px
          </span>

          <span className="rounded-lg bg-blue-50 px-3 py-2 font-bold text-blue-700">
            3 states
          </span>
        </div>
      </div>
    </div>
  );
}
