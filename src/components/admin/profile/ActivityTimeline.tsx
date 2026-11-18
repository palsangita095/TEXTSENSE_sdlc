import { activityTimeline } from "@/data/admin/profile";

export default function ActivityTimeline() {
  return (
    <section className="rounded-2xl border border-[#E2E5EC] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] sm:p-8">
      <h2 className="mb-5 text-xl font-bold text-[#0F172A] sm:text-2xl">
        Activity timeline
      </h2>

      <div className="relative">
        <span
          className="absolute bottom-2 left-[3.5px] top-2 w-px bg-[#E2E5EC]"
          aria-hidden="true"></span>

        <div className="space-y-4">
          {activityTimeline.map((event) => (
            <div key={event.id} className="relative pl-5">
              <span
                className={`absolute left-0 top-1.5 h-2 w-2 rounded-full ring-2 ring-white ${event.dotClasses}`}></span>

              <p className="text-sm text-[#64748B]">{event.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-[#334155]">
                {event.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
