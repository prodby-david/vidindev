"use client";

import { motion } from "motion/react";
import { Pencil, Trash2 } from "lucide-react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export default function DashboardCard({
  title,
  subtitle,
  badge,
  onEdit,
  onDelete,
  children,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col justify-between p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:border-horizon/30 transition-[box-shadow,border-color] duration-200"
    >
      <div>
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-deep-ocean/10 dark:border-horizon/10">
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean line-clamp-1 break-words">
                {title}
              </h3>
              {badge && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-horizon/10 text-horizon border border-horizon/20 shrink-0">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-xs font-medium text-ocean truncate">
                {subtitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                aria-label={`Edit ${title}`}
                className="p-1.5 rounded-md text-ocean hover:text-horizon hover:bg-horizon/10 transition-colors cursor-pointer"
              >
                <Pencil size={15} />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                aria-label={`Delete ${title}`}
                className="p-1.5 rounded-md text-ocean hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        </div>

        <div className="pt-4">{children}</div>
      </div>
    </motion.div>
  );
}
