"use client";

type PageItem = number | "gap";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
}

function buildPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  let start = current - 1;
  let end = current + 1;

  if (current <= 2) {
    start = 1;
    end = 3;
  } else if (current >= total - 1) {
    start = total - 2;
    end = total;
  }

  const items: PageItem[] = [];

  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("gap");
  }

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (end < total) {
    if (end < total - 1) items.push("gap");
    items.push(total);
  }

  return items;
}

const controlClasses =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

const inactiveControlClasses =
  "border-slate-200 bg-white text-slate-600 hover:bg-slate-50";

const activeControlClasses =
  "border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700";

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "users",
}: PaginationProps) {
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const lastItem = Math.min(safePage * pageSize, totalItems);
  const pageItems = buildPageItems(safePage, totalPages);
  const label = totalItems === 1 ? itemLabel.replace(/s$/, "") : itemLabel;

  return (
    <div className="flex flex-col justify-between gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:p-5">
      <p className="text-xs text-slate-500 sm:text-sm">
        Showing <b className="font-semibold text-slate-700">{firstItem}</b>
        {"–"}
        <b className="font-semibold text-slate-700">{lastItem}</b> of{" "}
        <b className="font-semibold text-slate-700">{totalItems}</b> {label}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto sm:justify-end">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          aria-label="Previous page"
          className={`${controlClasses} ${inactiveControlClasses}`}>
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>

        {pageItems.map((item, index) =>
          typeof item === "number" ? (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === safePage ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={`${controlClasses} ${
                item === safePage ? activeControlClasses : inactiveControlClasses
              }`}>
              {item}
            </button>
          ) : (
            <span
              key={`gap-${index}`}
              aria-hidden="true"
              className="px-1 text-sm text-slate-400">
              ...
            </span>
          ),
        )}

        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          aria-label="Next page"
          className={`${controlClasses} ${inactiveControlClasses}`}>
          <i className="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>
  );
}