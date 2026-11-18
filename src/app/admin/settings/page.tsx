import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Settings | TEXTSENSE",
};

export default function SettingsPage() {
  return (
    <main id="overview" className="min-w-0">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">System Settings</h2>
        <p className="mt-3 max-w-[560px] text-sm leading-6 text-slate-500 sm:text-base">
          Configure platform and notification settings.
        </p>
      </div>
    </main>
  );
}
