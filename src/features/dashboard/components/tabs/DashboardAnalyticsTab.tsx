"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Eye, Users, Clock, Activity } from "lucide-react";
import {
  VisitorMetricUI,
  TrafficDataPointUI,
  VisitorActivityUI,
  TopRouteUI,
  DeviceStatUI,
} from "../../dashboard.types";
import AnalyticsMetricCard from "../analytics/AnalyticsMetricCard";
import AnalyticsTrafficGraph from "../analytics/AnalyticsTrafficGraph";
import AnalyticsBreakdownCard from "../analytics/AnalyticsBreakdownCard";
import AnalyticsActivityTable from "../analytics/AnalyticsActivityTable";

interface DashboardAnalyticsTabProps {
  metrics?: VisitorMetricUI;
  trafficData?: TrafficDataPointUI[];
  activities?: VisitorActivityUI[];
  topRoutes?: TopRouteUI[];
  devices?: DeviceStatUI[];
}

export default function DashboardAnalyticsTab({
  metrics,
  trafficData = [],
  activities = [],
  topRoutes = [],
  devices = [],
}: DashboardAnalyticsTabProps) {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");

  const resolvedMetrics: VisitorMetricUI = metrics || {
    totalViews: 0,
    uniqueVisitors: 0,
    avgDuration: "0m 00s",
    activeNow: 0,
    viewsTrend: "0%",
    visitorsTrend: "0%",
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
              Visitor Analytics & Monitoring
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ocean">
            Monitor real-time audience traffic, visitor telemetry, and user interaction events
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-md bg-sand/60 dark:bg-sand/40 self-start sm:self-auto">
          {(
            [
              { id: "24h", label: "24 Hours" },
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
            ] as const
          ).map((range) => (
            <button
              key={range.id}
              type="button"
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                timeRange === range.id
                  ? "bg-horizon text-white shadow-xs"
                  : "text-deep-ocean hover:text-horizon"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <AnalyticsMetricCard
          label="Total Pageviews"
          value={resolvedMetrics.totalViews.toLocaleString()}
          trend={resolvedMetrics.viewsTrend}
          isPositive={true}
          icon={Eye}
          index={0}
        />
        <AnalyticsMetricCard
          label="Unique Visitors"
          value={resolvedMetrics.uniqueVisitors.toLocaleString()}
          trend={resolvedMetrics.visitorsTrend}
          isPositive={true}
          icon={Users}
          index={1}
        />
        <AnalyticsMetricCard
          label="Avg. Session Duration"
          value={resolvedMetrics.avgDuration}
          icon={Clock}
          index={2}
        />
        <AnalyticsMetricCard
          label="Active Visitors Now"
          value={resolvedMetrics.activeNow}
          icon={Activity}
          isLive={true}
          index={3}
        />
      </div>

      <AnalyticsTrafficGraph data={trafficData} />

      <AnalyticsBreakdownCard topRoutes={topRoutes} devices={devices} />

      <AnalyticsActivityTable activities={activities} />
    </div>
  );
}
