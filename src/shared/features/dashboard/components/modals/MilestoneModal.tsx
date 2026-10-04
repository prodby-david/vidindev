"use client";

import { useState } from "react";
import { X, GraduationCap, Rocket, Code } from "lucide-react";
import {
  ExperienceMilestoneUI,
  MilestoneIconUI,
} from "../../dashboard.types";

interface MilestoneModalProps {
  isOpen: boolean;
  item?: ExperienceMilestoneUI | null;
  onClose: () => void;
  onSave: (item: Partial<ExperienceMilestoneUI>) => void;
}

export default function MilestoneModal({
  isOpen,
  item,
  onClose,
  onSave,
}: MilestoneModalProps) {
  const [year, setYear] = useState(item?.year || "");
  const [title, setTitle] = useState(item?.title || "");
  const [organization, setOrganization] = useState(item?.organization || "");
  const [summary, setSummary] = useState(item?.summary || "");
  const [icon, setIcon] = useState<MilestoneIconUI>(
    item?.icon || "Rocket"
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id,
      year,
      title,
      organization,
      summary,
      icon,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Milestone" : "Add Career Milestone"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-ocean hover:text-deep-ocean cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Year / Milestone Date
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Icon Category
              </label>
              <div className="flex items-center gap-2">
                {[
                  {
                    value: "Rocket" as MilestoneIconUI,
                    label: "Launch",
                    Icon: Rocket,
                  },
                  {
                    value: "GraduationCap" as MilestoneIconUI,
                    label: "Education",
                    Icon: GraduationCap,
                  },
                  {
                    value: "Code" as MilestoneIconUI,
                    label: "Code",
                    Icon: Code,
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setIcon(opt.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border text-xs font-semibold cursor-pointer transition-colors ${
                      icon === opt.value
                        ? "bg-horizon text-white border-horizon"
                        : "bg-polaroid dark:bg-sand/40 text-ocean border-deep-ocean/15 dark:border-horizon/20 hover:text-deep-ocean"
                    }`}
                  >
                    <opt.Icon size={14} />
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Milestone Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Full-Stack Engineer Promotion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Organization / Event
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Global Tech Enterprise"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Summary
            </label>
            <textarea
              rows={3}
              required
              placeholder="Brief context and significance of this career milestone..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-deep-ocean/10 dark:border-horizon/15">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-ocean hover:text-deep-ocean cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm"
            >
              {item ? "Update Milestone" : "Save Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
