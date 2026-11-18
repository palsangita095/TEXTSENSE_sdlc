import type { ProfileData } from "@/data/admin/profile";
import ProfileStatusPill from "./ProfileStatusPill";

interface AccountStatusCardProps {
  profile: ProfileData;
}

export default function AccountStatusCard({ profile }: AccountStatusCardProps) {
  const rows = [
    {
      id: "email",
      label: "Email verified",
      value: (
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] sm:text-base">
          <i className="fa-solid fa-circle-check text-lg text-[#16A34A]"></i>
          Verified
        </span>
      ),
    },
    {
      id: "twofactor",
      label: "Two-factor auth",
      value: (
        <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-medium text-[#64748B]">
          Off
        </span>
      ),
    },
    {
      id: "login",
      label: "Last login",
      value: (
        <span className="text-sm font-semibold text-[#111827] sm:text-base">
          {profile.lastActive}
        </span>
      ),
    },
    {
      id: "device",
      label: "Device",
      value: (
        <span className="text-sm font-semibold text-[#111827] sm:text-base">
          Chrome · Windows
        </span>
      ),
    },
    {
      id: "registered",
      label: "Registered",
      value: (
        <span className="text-sm font-semibold text-[#111827] sm:text-base">
          {profile.registered}
        </span>
      ),
    },
  ];

  return (
    <section className="mb-6 rounded-2xl border border-[#E2E5EC] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
          Account status
        </h2>
        <ProfileStatusPill status={profile.status} />
      </div>

      <div className="mt-5">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 border-t border-[#EEF1F6] py-4">
            <span className="text-sm text-[#64748B] sm:text-base">{row.label}</span>
            <span className="text-right">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
