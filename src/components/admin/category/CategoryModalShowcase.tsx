"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ShowcaseNavbar from "@/components/admin/modal/ShowcaseNavbar";
import {
  defaultSavedCategory,
  type SavedCategory,
} from "@/data/admin/categoryModal";
import CategoryAddForm from "./CategoryAddForm";
import CategorySavingCard from "./CategorySavingCard";
import CategorySuccessCard from "./CategorySuccessCard";
import CategoryValidationCard from "./CategoryValidationCard";

interface StateLabelProps {
  dotClass: string;
  children: React.ReactNode;
}

function StateLabel({ dotClass, children }: StateLabelProps) {
  return (
    <div className="mb-2 flex items-center text-xs font-semibold text-slate-600">
      <span className={`mr-2 h-2.5 w-2.5 rounded-full ${dotClass}`}></span>
      {children}
    </div>
  );
}

export default function CategoryModalShowcase() {
  const router = useRouter();
  const [savedCategory, setSavedCategory] =
    useState<SavedCategory>(defaultSavedCategory);

  return (
    <div className="admin-font min-h-screen bg-white text-slate-800">
      <ShowcaseNavbar />

      <main className="px-4 py-10">
        <div className="container-full mx-auto w-full max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">
              TEXTSENSE / CATEGORIES
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#111827]">
              Add / Edit Category Modal - States
            </h1>

            <p className="mt-1 text-sm text-[#64748B]">
              Default, validation, saving and success states of the category dialog.
            </p>
          </div>

          <div className="flex flex-wrap -mx-3">
            <section className="mb-6 w-full px-3 lg:w-1/2">
              <StateLabel dotClass="bg-blue-500">1. Default - Add Category</StateLabel>

              <div className="rounded-2xl bg-[#10152F] p-4 shadow-xl sm:p-6">
                <CategoryAddForm onSaved={setSavedCategory} />
              </div>
            </section>

            <section className="mb-6 w-full px-3 lg:w-1/2">
              <StateLabel dotClass="bg-red-500">2. Validation Errors</StateLabel>

              <div className="rounded-2xl bg-[#10152F] p-4 shadow-xl sm:p-6">
                <CategoryValidationCard />
              </div>
            </section>

            <section className="mb-6 w-full px-3 lg:w-1/2">
              <StateLabel dotClass="bg-amber-500">
                3. Saving State (Edit Category)
              </StateLabel>

              <div className="rounded-2xl bg-[#10152F] p-4 shadow-xl sm:p-6">
                <CategorySavingCard />
              </div>
            </section>

            <section className="mb-6 w-full px-3 lg:w-1/2">
              <StateLabel dotClass="bg-emerald-500">
                4. Success State (Category Saved)
              </StateLabel>

              <div className="rounded-2xl bg-[#10152F] p-4 shadow-xl sm:p-6">
                <CategorySuccessCard
                  category={savedCategory}
                  onViewCategories={() => router.push("/admin/dashboard#categories")}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
