"use client";

import { motion } from "motion/react";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { TopRouteUI, DeviceStatUI } from "../../dashboard.types";

interface AnalyticsBreakdownCardProps {
  topRoutes?: TopRouteUI[];
  devices?: DeviceStatUI[];
}

const DEVICE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Desktop: Laptop,
  Mobile: Smartphone,
  Tablet: Tablet,
};

export default function AnalyticsBreakdownCard({
  topRoutes = [],
  devices = [],
}: AnalyticsBreakdownCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/30 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm flex flex-col gap-4"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean">
            Top Visited Routes
          </h3>
          <p className="text-xs text-ocean">
            Most active endpoints navigated by visitors
          </p>
        </div>

        {topRoutes.length === 0 ? (
          <div className="py-8 text-center text-xs text-ocean border border-dashed border-deep-ocean/15 dark:border-horizon/20 rounded-md">
            No route visits recorded yet
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {topRoutes.map((route) => (
              <div key={route.path} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="font-mono text-deep-ocean">{route.path}</span>
                  <span className="text-ocean">{route.views} views ({route.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-sand/60 dark:bg-sand/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${route.percentage}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-horizon rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
        className="p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/30 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm flex flex-col gap-4"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean">
            Device Distribution
          </h3>
          <p className="text-xs text-ocean">
            Screen form factors and client platforms used
          </p>
        </div>

        {devices.length === 0 ? (
          <div className="py-8 text-center text-xs text-ocean border border-dashed border-deep-ocean/15 dark:border-horizon/20 rounded-md">
            No device telemetry recorded yet
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {devices.map((item) => {
              const Icon = DEVICE_ICON_MAP[item.device] || Laptop;
              return (
                <div key={item.device} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2 text-deep-ocean">
                      <Icon size={14} className="text-horizon" />
                      <span>{item.device}</span>
                    </div>
                    <span className="text-ocean">{item.count} sessions ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-sand/60 dark:bg-sand/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
