"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TrafficDataPointUI } from "../../dashboard.types";

interface AnalyticsTrafficGraphProps {
  data?: TrafficDataPointUI[];
}

export default function AnalyticsTrafficGraph({
  data = [],
}: AnalyticsTrafficGraphProps) {
  const [activeMetric, setActiveMetric] = useState<"views" | "visitors">("views");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = data.map((d) => (activeMetric === "views" ? d.views : d.visitors));
  const maxValue = values.length > 0 ? Math.max(...values, 10) : 10;

  const width = 800;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const points = data.map((d, i) => {
    const val = activeMetric === "views" ? d.views : d.visitors;
    const x =
      data.length > 1
        ? paddingX + (i / (data.length - 1)) * usableWidth
        : width / 2;
    const y = height - paddingY - (val / maxValue) * usableHeight;
    return { x, y, value: val, label: d.label };
  });

  const pathD =
    points.length > 1
      ? points.reduce(
          (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
          ""
        )
      : "";

  const areaD =
    points.length > 1
      ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      className="p-5 sm:p-6 rounded-md bg-polaroid dark:bg-sand/30 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm flex flex-col gap-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base sm:text-lg font-bold font-display text-deep-ocean">
            Traffic Trends
          </h3>
          <p className="text-xs text-ocean">
            Telemetry graph of visitors and interaction pageviews
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-md bg-sand/60 dark:bg-sand/40 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveMetric("views")}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeMetric === "views"
                ? "bg-horizon text-white shadow-xs"
                : "text-deep-ocean hover:text-horizon"
            }`}
          >
            Pageviews
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("visitors")}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeMetric === "visitors"
                ? "bg-horizon text-white shadow-xs"
                : "text-deep-ocean hover:text-horizon"
            }`}
          >
            Unique Visitors
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-60 w-full flex flex-col items-center justify-center rounded-md border border-dashed border-deep-ocean/15 dark:border-horizon/20 p-6 text-center">
          <span className="text-sm font-semibold text-deep-ocean">
            No telemetry data recorded yet
          </span>
          <span className="text-xs text-ocean mt-1">
            Traffic trends will plot automatically once visits occur
          </span>
        </div>
      ) : (
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-56 sm:h-64 select-none"
          >
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4169E1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4169E1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line
              x1={paddingX}
              y1={height - paddingY}
              x2={width - paddingX}
              y2={height - paddingY}
              stroke="currentColor"
              className="text-deep-ocean/10 dark:text-horizon/15"
              strokeDasharray="4 4"
            />
            <line
              x1={paddingX}
              y1={height / 2}
              x2={width - paddingX}
              y2={height / 2}
              stroke="currentColor"
              className="text-deep-ocean/10 dark:text-horizon/15"
              strokeDasharray="4 4"
            />
            <line
              x1={paddingX}
              y1={paddingY}
              x2={width - paddingX}
              y2={paddingY}
              stroke="currentColor"
              className="text-deep-ocean/10 dark:text-horizon/15"
              strokeDasharray="4 4"
            />

            {areaD && (
              <path d={areaD} fill="url(#trafficGradient)" />
            )}

            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#4169E1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {points.map((p, idx) => (
              <g key={idx} className="cursor-pointer">
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === idx ? 6 : 4}
                  fill="#ffffff"
                  stroke="#4169E1"
                  strokeWidth="2.5"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <text
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-[10px] fill-ocean font-mono"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>

          {hoveredIndex !== null && points[hoveredIndex] && (
            <div
              className="absolute pointer-events-none -translate-x-1/2 px-2.5 py-1 rounded bg-deep-ocean text-white text-[11px] font-mono shadow-md z-10 transition-transform"
              style={{
                left: `${(points[hoveredIndex].x / width) * 100}%`,
                top: `${(points[hoveredIndex].y / height) * 100 - 35}%`,
              }}
            >
              {points[hoveredIndex].label}: {points[hoveredIndex].value}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
