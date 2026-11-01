"use client";

import { FolderOpen, Plus } from "lucide-react";

interface DashboardEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function DashboardEmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: DashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-md bg-polaroid dark:bg-sand/30 border border-dashed border-deep-ocean/20 dark:border-horizon/30 w-full gap-3">
      <div className="p-3.5 rounded-md bg-horizon/10 text-horizon">
        <FolderOpen size={28} />
      </div>

      <div className="flex flex-col gap-1 max-w-sm">
        <h4 className="text-base font-bold font-display text-deep-ocean">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-ocean leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 rounded-md text-xs font-semibold bg-ocean text-white hover:bg-deep-ocean transition-colors cursor-pointer shadow-sm"
        >
          <Plus size={14} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
