"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { defaultShowcaseUser, type ShowcaseUser } from "@/data/admin/modalShowcase";
import ComponentReference from "./ComponentReference";
import EditUserVariant from "./EditUserVariant";
import LoadingStateCard from "./LoadingStateCard";
import ShowcaseNavbar from "./ShowcaseNavbar";
import ShowcasePageHeader from "./ShowcasePageHeader";
import StateSectionHeader from "./StateSectionHeader";
import SuccessStateCard from "./SuccessStateCard";
import UserModalForm from "./UserModalForm";

export default function ModalShowcase() {
  const router = useRouter();
  const [successUser, setSuccessUser] = useState<ShowcaseUser>(defaultShowcaseUser);

  const focusNewUserForm = () => {
    document
      .getElementById("validation-state")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      document.getElementById("fullName")?.focus({ preventScroll: true });
    }, 350);
  };

  return (
    <div className="admin-font min-h-screen bg-slate-100 text-slate-800">
      <ShowcaseNavbar />

      <main className="min-h-screen px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="container mx-auto w-full max-w-7xl">
          <ShowcasePageHeader />

          <div className="flex flex-col lg:flex-row">
            <section
              id="validation-state"
              className="mb-8 w-full lg:mb-0 lg:mr-3 lg:w-1/3">
              <StateSectionHeader
                step={1}
                stepClass="bg-red-600"
                title="Validation errors"
                description="Empty name, invalid email, role not chosen"
              />

              <div className="flex min-h-[680px] items-center rounded-2xl bg-slate-200 p-3 sm:p-5">
                <UserModalForm onSaved={setSuccessUser} />
              </div>
            </section>

            <section className="mb-8 w-full lg:mb-0 lg:mx-3 lg:w-1/3">
              <StateSectionHeader
                step={2}
                stepClass="bg-blue-700"
                title="Loading / Saving"
                description="Inputs locked while request is in flight"
              />

              <div className="flex min-h-[680px] items-center rounded-2xl bg-slate-200 p-3 sm:p-5">
                <LoadingStateCard />
              </div>
            </section>

            <section className="w-full lg:ml-3 lg:w-1/3">
              <StateSectionHeader
                step={3}
                stepClass="bg-green-600"
                title="Success"
                description="Confirmation view with toast feedback"
              />

              <div className="flex min-h-[680px] flex-col rounded-2xl bg-slate-200 p-3 sm:p-5">
                <SuccessStateCard
                  user={successUser}
                  onAddAnother={focusNewUserForm}
                  onDone={() => router.push("/admin/users")}
                />
              </div>
            </section>
          </div>

          <EditUserVariant />

          <ComponentReference />
        </div>
      </main>
    </div>
  );
}
