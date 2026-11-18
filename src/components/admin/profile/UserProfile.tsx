"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  PROFILE_ROLES,
  initialProfile,
  type ProfileData,
  type ProfileRole,
} from "@/data/admin/profile";
import AccountActionsCard from "./AccountActionsCard";
import AccountStatusCard from "./AccountStatusCard";
import ActivityTimeline from "./ActivityTimeline";
import AdminNotesCard from "./AdminNotesCard";
import EditProfileModal from "./EditProfileModal";
import ProfileCard from "./ProfileCard";
import ProfileStatsCards from "./ProfileStatsCards";
import RecentFeedback from "./RecentFeedback";
import SentimentBreakdown from "./SentimentBreakdown";

interface MenuState {
  top: number;
  left: number;
}

const moreMenuWidth = 176;
const roleMenuWidth = 160;

export default function UserProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [roleMenu, setRoleMenu] = useState<MenuState | null>(null);
  const [moreMenu, setMoreMenu] = useState<MenuState | null>(null);

  const positionMenu = (rect: DOMRect, width: number, height: number): MenuState => {
    const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
    const top =
      rect.bottom + 6 + height > window.innerHeight
        ? Math.max(8, rect.top - height - 6)
        : rect.bottom + 6;

    return { top, left };
  };

  const openRoleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMoreMenu(null);
    setRoleMenu(positionMenu(event.currentTarget.getBoundingClientRect(), roleMenuWidth, 176));
  };

  const openMoreMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setRoleMenu(null);
    setMoreMenu(
      positionMenu(event.currentTarget.getBoundingClientRect(), moreMenuWidth, 184),
    );
  };

  const handleRoleChange = (role: ProfileRole) => {
    setProfile((prev) => ({ ...prev, role }));
    setRoleMenu(null);
    toast.success(`Role changed to ${role}`);
  };

  const handleSaveProfile = (next: ProfileData) => {
    setProfile(next);
    setEditOpen(false);
    toast.success("Profile updated");
  };

  const handleSuspend = () => {
    setMoreMenu(null);
    if (profile.status === "Suspended") return;
    if (!window.confirm(`Suspend ${profile.name}'s account?`)) return;

    setProfile((prev) => ({ ...prev, status: "Suspended" }));
    toast.success(`${profile.name}'s account suspended`);
  };

  const handleActivate = () => {
    setMoreMenu(null);
    if (profile.status === "Active") return;

    setProfile((prev) => ({ ...prev, status: "Active" }));
    toast.success(`${profile.name}'s account activated`);
  };

  const handleDelete = () => {
    setMoreMenu(null);
    if (
      !window.confirm(
        `Delete ${profile.name}'s account? This permanently removes their account and data.`,
      )
    ) {
      return;
    }

    toast.success(`${profile.name}'s account deleted`);
    router.push("/admin/users");
  };

  return (
    <>
      <Link
        href="/admin/users"
        className="mb-6 inline-flex items-center text-sm font-semibold text-[#4338CA] transition hover:text-[#3730A3] sm:text-base">
        <i className="fa-solid fa-chevron-left mr-2 text-xs"></i>
        Back to users
      </Link>

      <div className="flex flex-col xl:flex-row">
        <div className="min-w-0 xl:w-[66%] xl:pr-5">
          <ProfileCard
            profile={profile}
            onEdit={() => setEditOpen(true)}
            onChangeRole={openRoleMenu}
            onOpenMenu={openMoreMenu}
          />

          <ProfileStatsCards />

          <SentimentBreakdown />

          <RecentFeedback />
        </div>

        <div className="min-w-0 xl:w-[34%] xl:pl-5">
          <AccountStatusCard profile={profile} />

          <AdminNotesCard />

          <AccountActionsCard
            status={profile.status}
            onEdit={() => setEditOpen(true)}
            onChangeRole={openRoleMenu}
            onSuspend={handleSuspend}
            onActivate={handleActivate}
            onDelete={handleDelete}
          />

          <ActivityTimeline />
        </div>
      </div>

      {roleMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setRoleMenu(null)}
            aria-hidden="true"></div>

          <div
            style={{ top: roleMenu.top, left: roleMenu.left }}
            className="fixed z-50 w-40 rounded-lg border border-[#E2E5EC] bg-white py-2 text-left shadow-lg">
            {PROFILE_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-[#334155] hover:bg-[#F8FAFC]">
                {role}
                {profile.role === role && (
                  <i className="fa-solid fa-check text-xs text-[#4338CA]"></i>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {moreMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMoreMenu(null)}
            aria-hidden="true"></div>

          <div
            style={{ top: moreMenu.top, left: moreMenu.left }}
            className="fixed z-50 w-44 rounded-lg border border-[#E2E5EC] bg-white py-2 text-left shadow-lg">
            <button
              type="button"
              onClick={() => {
                setMoreMenu(null);
                setEditOpen(true);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-[#334155] hover:bg-[#F8FAFC]">
              <i className="fa-regular fa-pen-to-square mr-2"></i>
              Edit User
            </button>

            <button
              type="button"
              onClick={(event) => {
                setMoreMenu(null);
                openRoleMenu(event);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-[#334155] hover:bg-[#F8FAFC]">
              <i className="fa-solid fa-user-shield mr-2"></i>
              Change Role
            </button>

            {profile.status === "Active" ? (
              <button
                type="button"
                onClick={handleSuspend}
                className="block w-full px-4 py-2 text-left text-sm text-[#B45309] hover:bg-[#FEF3C7]">
                <i className="fa-solid fa-ban mr-2"></i>
                Suspend Account
              </button>
            ) : (
              <button
                type="button"
                onClick={handleActivate}
                className="block w-full px-4 py-2 text-left text-sm text-[#15803D] hover:bg-[#ECFDF3]">
                <i className="fa-regular fa-circle-check mr-2"></i>
                Activate Account
              </button>
            )}

            <button
              type="button"
              onClick={handleDelete}
              className="block w-full px-4 py-2 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2]">
              <i className="fa-regular fa-trash-can mr-2"></i>
              Delete User
            </button>
          </div>
        </>
      )}

      {editOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
}
