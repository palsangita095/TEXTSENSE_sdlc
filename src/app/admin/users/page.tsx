import type { Metadata } from "next";
import UserManagement from "@/components/admin/UserManagement";

export const metadata: Metadata = {
  title: "User Management | TEXTSENSE",
};

export default function UsersPage() {
  return (
    <main id="users" className="w-full p-4 sm:p-6 lg:p-8">
      <UserManagement />
    </main>
  );
}
