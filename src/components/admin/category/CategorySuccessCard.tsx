import type { SavedCategory } from "@/data/admin/categoryModal";

interface CategorySuccessCardProps {
  category: SavedCategory;
  onViewCategories: () => void;
}

export default function CategorySuccessCard({
  category,
  onViewCategories,
}: CategorySuccessCardProps) {
  return (
    <div
      aria-live="polite"
      className="w-full rounded-xl bg-white p-6 text-center sm:p-8">
      <div className="mb-6 inline-flex items-center rounded-full bg-[#ECFDF3] px-4 py-1.5 text-xs font-semibold text-[#16A34A]">
        <i className="fa-solid fa-check mr-2"></i>
        Category saved successfully
      </div>

      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-2xl text-[#16A34A]">
        <i className="fa-solid fa-check"></i>
      </div>

      <h3 className="text-xl font-bold text-[#111827]">Category saved</h3>

      <p className="mt-1 text-xs text-[#64748B]">
        Your category has been successfully created and is ready for use.
      </p>

      <div className="my-6 rounded-xl border border-[#E2E5EC] bg-[#F7F8FC] p-4 text-left">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-[#64748B]">Category Name</span>

          <span className="flex items-center font-bold text-[#111827]">
            <span
              className="mr-2 h-3 w-3 rounded-full"
              style={{ backgroundColor: category.color }}></span>
            {category.name}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#64748B]">Status</span>

          <span
            className={`font-bold ${
              category.active ? "text-[#16A34A]" : "text-slate-500"
            }`}>
            {category.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewCategories}
        className="w-full rounded-xl bg-[#4338CA] py-3 text-xs font-semibold text-white transition hover:bg-[#3730A3]">
        View Categories
      </button>
    </div>
  );
}
