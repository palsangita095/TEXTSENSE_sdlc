import Image from "next/image";
import {
  referenceIcons,
  referenceNavItems,
  sparklineSeries,
  type SparklineSeries,
} from "@/data/admin/modalShowcase";

function Sparkline({ series }: { series: SparklineSeries }) {
  return (
    <div className="w-full p-3 md:w-1/4">
      <div className="flex items-center">
        <span
          className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full text-white ${series.iconBgClass}`}>
          <i className={series.trendIcon}></i>
        </span>

        <p className={`text-sm font-semibold ${series.changeClass}`}>{series.change}</p>
      </div>

      <div className={`mt-3 h-16 overflow-hidden rounded-lg p-2 ${series.areaClass}`}>
        <svg
          viewBox="0 0 180 45"
          className="h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          role="img"
          aria-label={`${series.label} sparkline`}>
          <path d={series.areaPath} fill={series.areaColor} opacity="0.10" />

          <path
            d={series.linePath}
            stroke={series.strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray="100"
            strokeDashoffset="100">
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="2.5s"
              begin={series.animationBegin}
              fill="freeze"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}

export default function ComponentReference() {
  return (
    <section
      id="componentReferenceSection"
      className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-lg md:p-6">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Icon &amp; component reference
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Assets carried over from the User Management screen the modal opens above.
          </p>
        </div>

        <span className="mt-3 self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:mt-0 sm:self-auto">
          Inter · #4338CA
        </span>
      </div>

      <div className="mb-5 rounded-xl bg-slate-800 px-4 py-5">
        <div className="flex flex-wrap items-center justify-around">
          {referenceNavItems.map((item) => (
            <div
              key={item.label}
              className={`px-2 py-2 text-center ${
                item.active ? "text-white" : "text-slate-300"
              }`}>
              <i className={`${item.icon} text-lg`}></i>

              <p className={`mt-2 text-xs ${item.active ? "font-semibold" : ""}`}>
                {item.label}
              </p>
            </div>
          ))}

          <div className="px-2 py-2 text-center">
            <Image
              src="/assets/images/modal_page/modal-logo.jpg"
              alt="User avatar"
              width={36}
              height={36}
              className="mx-auto h-9 w-9 rounded-full border-2 border-slate-400 object-cover"
            />

            <p className="mt-2 text-xs text-slate-300">Avatar</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-around">
        {referenceIcons.map((item, index) => (
          <div key={`${item.label}-${index}`} className="px-3 py-3 text-center">
            <i className={item.icon}></i>

            <p className="mt-2 text-xs text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center">
        {sparklineSeries.map((series) => (
          <Sparkline key={series.label} series={series} />
        ))}
      </div>

      <div className="mt-4 flex items-center border-t border-slate-100 pt-4">
        <Image
          src="/assets/images/modal_page/modal-logo.jpg"
          alt="User avatar"
          width={40}
          height={40}
          className="mr-3 h-10 w-10 rounded-full object-cover"
        />

        <p className="text-sm text-slate-600">Sparklines · avatar</p>
      </div>
    </section>
  );
}
