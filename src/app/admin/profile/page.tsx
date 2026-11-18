import type { Metadata } from "next";
import UserProfile from "@/components/admin/profile/UserProfile";

export const metadata: Metadata = {
  title: "User Profile | TEXTSENSE",
};

export default function ProfilePage() {
  return (
    <main className="relative min-w-0 flex-1 overflow-x-hidden px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="relative z-10">
        <UserProfile />
      </div>
    </main>
  );
}
