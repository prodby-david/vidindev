import { X } from "lucide-react";

export interface RemovableBadgeProps {
  label: string;
  onRemove: () => void;
  removeAriaLabel?: string;
  className?: string;
}

export default function RemovableBadge({
  label,
  onRemove,
  removeAriaLabel,
  className = "",
}: RemovableBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15 hover:border-horizon/40 transition-colors ${className}`}
    >
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeAriaLabel || `Remove ${label}`}
        className="text-ocean hover:text-red-500 cursor-pointer p-0.5 rounded transition-colors"
      >
        <X size={11} />
      </button>
    </span>
  );
}

export { RemovableBadge };
