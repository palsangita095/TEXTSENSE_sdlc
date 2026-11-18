import type { Metadata } from "next";
import ArticleManagement from "@/components/admin/articles/ArticleManagement";

export const metadata: Metadata = {
  title: "Content / Articles | TEXTSENSE",
};

export default function ArticlesPage() {
  return (
    <main id="articles" className="w-full p-4 sm:p-6 lg:p-8">
      <ArticleManagement />
    </main>
  );
}
