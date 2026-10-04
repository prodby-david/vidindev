"use client";

import { useState } from "react";
import { X, ShieldCheck, Smartphone, GitBranch } from "lucide-react";
import {
  ProjectPracticeUI,
  ProjectPracticeIconUI,
} from "../../dashboard.types";

interface ProjectPracticeModalProps {
  isOpen: boolean;
  item?: ProjectPracticeUI | null;
  onClose: () => void;
  onSave: (item: Partial<ProjectPracticeUI>) => void;
}

export default function ProjectPracticeModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ProjectPracticeModalProps) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [guardrail, setGuardrail] = useState(item?.guardrail || "");
  const [icon, setIcon] = useState<ProjectPracticeIconUI>(
    item?.icon || "ShieldCheck"
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id,
      title,
      description,
      guardrail,
      icon,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Engineering Practice" : "Add Engineering Practice"}
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
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Practice Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Strict Type Safety & Contracts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Icon Representation
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  value: "ShieldCheck" as ProjectPracticeIconUI,
                  label: "Security / Safety",
                  Icon: ShieldCheck,
                },
                {
                  value: "Smartphone" as ProjectPracticeIconUI,
                  label: "Mobile / Responsive",
                  Icon: Smartphone,
                },
                {
                  value: "GitBranch" as ProjectPracticeIconUI,
                  label: "Version / CI/CD",
                  Icon: GitBranch,
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setIcon(opt.value)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-md border text-xs font-semibold cursor-pointer transition-colors ${
                    icon === opt.value
                      ? "bg-horizon text-white border-horizon"
                      : "bg-polaroid dark:bg-sand/40 text-ocean border-deep-ocean/15 dark:border-horizon/20 hover:text-deep-ocean"
                  }`}
                >
                  <opt.Icon size={14} />
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="Explain the engineering practice methodology and team benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Guardrail / Verification Rule
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Zero any types allowed; CI fails on lint warnings"
              value={guardrail}
              onChange={(e) => setGuardrail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
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
              {item ? "Update Practice" : "Save Practice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
