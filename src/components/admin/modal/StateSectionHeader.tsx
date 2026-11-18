interface StateSectionHeaderProps {
  step: number;
  stepClass: string;
  title: string;
  description: string;
}

export default function StateSectionHeader({
  step,
  stepClass,
  title,
  description,
}: StateSectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center">
      <span
        className={`mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${stepClass} font-bold text-white`}>
        {step}
      </span>

      <div>
        <h2 className="font-bold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
