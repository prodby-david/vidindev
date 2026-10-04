"use client";

import { motion } from "motion/react";

interface AnalyticsMetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isLive?: boolean;
  index?: number;
}

export default function AnalyticsMetricCard({
  label,
  value,
  trend,
  isPositive = true,
  icon: Icon,
  isLive = false,
  index = 0,
}: AnalyticsMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="flex flex-col justify-between p-5 rounded-md bg-polaroid dark:bg-sand/30 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:border-horizon/30 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ocean">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          )}
          <div className="p-2 rounded-md bg-horizon/10 text-horizon">
            <Icon size={18} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-bold font-display text-deep-ocean tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
