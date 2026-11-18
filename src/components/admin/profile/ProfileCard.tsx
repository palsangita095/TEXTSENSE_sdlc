import Image from "next/image";
import type { MouseEvent } from "react";
import type { ProfileData } from "@/data/admin/profile";
import ProfileStatusPill from "./ProfileStatusPill";

interface ProfileCardProps {
  profile: ProfileData;
  onEdit: () => void;
  onChangeRole: (event: MouseEvent<HTMLButtonElement>) => void;
  onOpenMenu: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface InfoItem {
  icon: string;
  label: string;
  value: string;
}

export default function ProfileCard({
  profile,
  onEdit,
  onChangeRole,
  onOpenMenu,
}: ProfileCardProps) {
  const details: InfoItem[] = [
    {
      icon: "fa-regular fa-user",
      label: "User ID",
      value: profile.userId,
    },
    {
      icon: "fa-regular fa-building",
      label: "Company",
      value: profile.company,
    },
    {
      icon: "fa-regular fa-calendar",
      label: "Registered",
      value: profile.registered,
    },
    {
      icon: "fa-regular fa-clock",
      label: "Last Active",
      value: profile.lastActive,
    },
    {
      icon: "fa-solid fa-location-dot",
      label: "Location",
      value: profile.location,
    },
    {
      icon: "fa-solid fa-layer-group",
      label: "Plan",
      value: profile.plan,
    },
  ];

  return (
    <section className="mb-6 w-full overflow-hidden rounded-2xl border border-[#E2E5EC] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 min-[1800px]:flex-row min-[1800px]:items-center min-[1800px]:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
            <div className="h-[104px] w-[104px] shrink-0 overflow-hidden rounded-full sm:h-[120px] sm:w-[120px]">
              <Image
                src="/assets/images/modal_page/modal-logo.jpg"
                alt={profile.name}
                width={120}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
                {profile.name}
              </h2>

              <p className="mt-1 break-all text-base text-[#64748B] sm:text-lg">
                {profile.email}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-xs font-semibold text-[#475569] sm:text-sm">
                  {profile.role}
                </span>

                <ProfileStatusPill status={profile.status} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#4338CA] px-6 text-sm font-semibold text-white transition hover:bg-[#3730A3] sm:text-[15px]">
              Edit User
            </button>

            <button
              type="button"
              onClick={onChangeRole}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E2E5EC] bg-white px-5 text-sm font-semibold text-[#0F172A] transition hover:border-[#C7D2FE] hover:bg-[#F8FAFC] sm:text-[15px]">
              <i className="fa-solid fa-user-group mr-2 text-[#4338CA]"></i>
              Change Role
            </button>

            <button
              type="button"
              onClick={onOpenMenu}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#C7D2FE] bg-white text-[#4338CA] transition hover:bg-[#EEF2FF]"
              aria-label="More account actions">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E2E5EC] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 2xl:grid-cols-3">
          {details.map((item) => (
            <div key={item.label} className="flex items-center">
              <span className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] text-lg text-[#64748B]">
                <i className={item.icon}></i>
              </span>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                  {item.label}
                </p>
                <p className="mt-1 truncate text-base font-semibold text-[#111827]">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
