"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Globe, Clock } from "lucide-react";
import { VisitorActivityUI } from "../../dashboard.types";
import DashboardSearchInput from "../ui/DashboardSearchInput";

interface AnalyticsActivityTableProps {
  activities?: VisitorActivityUI[];
}

const ACTION_COLOR_MAP: Record<string, string> = {
  "Page View": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Project Click": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Card Flip": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "Resume Download": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Chatbot Query": "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  "Contact Sent": "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
};

export default function AnalyticsActivityTable({
  activities = [],
}: AnalyticsActivityTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = activities.filter(
    (act) =>
      act.visitorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      className="p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/30 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm flex flex-col gap-5 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean">
            Live Visitor Activity Stream
          </h3>
          <p className="text-xs text-ocean">
            Real-time feed tracking visitor interactions, element clicks, and paths
          </p>
        </div>

        <DashboardSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter activity stream..."
        />
      </div>

      {filteredActivities.length === 0 ? (
        <div className="py-12 text-center flex flex-col items-center justify-center gap-2 border border-dashed border-deep-ocean/15 dark:border-horizon/20 rounded-md">
          <span className="text-sm font-semibold text-deep-ocean">
            No visitor actions logged yet
          </span>
          <span className="text-xs text-ocean">
            Telemetry events (pageviews, clicks, flips, form submissions) will stream here live
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-deep-ocean/10 dark:border-horizon/15 text-ocean uppercase font-mono tracking-wider text-[10px]">
                <th className="pb-3 px-3">Visitor</th>
                <th className="pb-3 px-3">Location</th>
                <th className="pb-3 px-3">Action</th>
                <th className="pb-3 px-3">Target / Event</th>
                <th className="pb-3 px-3">Device / Client</th>
                <th className="pb-3 px-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-deep-ocean/5 dark:divide-horizon/10 font-medium">
              {filteredActivities.map((act, idx) => (
                <motion.tr
                  key={act.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="hover:bg-sand/40 dark:hover:bg-sand/40 transition-colors"
                >
                  <td className="py-3 px-3 font-mono text-horizon font-semibold">
                    {act.visitorId}
                  </td>
                  <td className="py-3 px-3 text-deep-ocean">
                    <div className="flex items-center gap-1.5">
                      <Globe size={13} className="text-ocean" />
                      <span>{act.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        ACTION_COLOR_MAP[act.action] ||
                        "bg-sand/60 text-deep-ocean border-deep-ocean/15"
                      }`}
                    >
                      {act.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-deep-ocean truncate max-w-xs">
                    {act.target}
                  </td>
                  <td className="py-3 px-3 text-ocean">
                    {act.device}
                  </td>
                  <td className="py-3 px-3 text-right text-ocean whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 justify-end">
                      <Clock size={12} />
                      <span>{act.timestamp}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
