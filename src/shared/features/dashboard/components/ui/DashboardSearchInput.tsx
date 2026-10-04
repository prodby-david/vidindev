"use client";

import { Search, X } from "lucide-react";

interface DashboardSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DashboardSearchInput({
  value,
  onChange,
  placeholder = "Search items...",
}: DashboardSearchInputProps) {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ocean/60 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-md bg-polaroid dark:bg-sand/50 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ocean/60 hover:text-deep-ocean p-0.5 cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
