import type { ProfileStatus } from "@/data/admin/profile";

interface ProfileStatusPillProps {
  status: ProfileStatus;
  className?: string;
}

export default function ProfileStatusPill({
  status,
  className = "",
}: ProfileStatusPillProps) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
        active ? "bg-[#ECFDF3] text-[#15803D]" : "bg-[#FEF2F2] text-[#DC2626]"
      } ${className}`}>
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          active ? "bg-[#16A34A]" : "bg-[#DC2626]"
        }`}></span>
      {status}
    </span>
  );
}
