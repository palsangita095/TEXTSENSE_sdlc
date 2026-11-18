import { categoryColorOptions } from "@/data/admin/categoryModal";

interface CategoryColorPickerProps {
  selected: string;
  onChange?: (color: string) => void;
  disabled?: boolean;
}

export default function CategoryColorPicker({
  selected,
  onChange,
  disabled = false,
}: CategoryColorPickerProps) {
  return (
    <div className="flex flex-wrap items-center">
      {categoryColorOptions.map((option) => {
        const isSelected = option.value === selected;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={`${option.name} category color`}
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => onChange?.(option.value)}
            style={{ backgroundColor: option.value }}
            className={`mb-2 mr-3 h-6 w-6 rounded-full transition last:mr-0 ${
              isSelected ? `ring-2 ring-offset-2 ${option.ringClass}` : ""
            } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          />
        );
      })}
    </div>
  );
}
