import { ReactNode } from "react";
import { Plus } from "lucide-react";
import DashboardSearchInput from "./DashboardSearchInput";

export interface DashboardHeaderProps {
  title: string;
  description: string;
  badge?: string | number;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: ReactNode;
}

export default function DashboardHeader({
  title,
  description,
  badge,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  actionLabel,
  onAction,
  actionIcon = <Plus size={16} />,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
            {title}
          </h2>
          {badge !== undefined && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sand/60 dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 text-ocean">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-ocean">{description}</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {onSearchChange && (
          <DashboardSearchInput
            value={searchQuery ?? ""}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        )}
        {onAction && actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold bg-ocean text-white hover:bg-deep-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
          >
            {actionIcon}
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export { DashboardHeader };
