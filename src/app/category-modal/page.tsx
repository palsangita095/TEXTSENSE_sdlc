import type { Metadata } from "next";
import CategoryModalShowcase from "@/components/admin/category/CategoryModalShowcase";

export const metadata: Metadata = {
  title: "Add / Edit Category Modal — States | TEXTSENSE",
};

export default function CategoryModalStatesPage() {
  return <CategoryModalShowcase />;
}
