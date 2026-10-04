"use client";

import { useState } from "react";
import { X, Code2, Terminal, GraduationCap } from "lucide-react";
import { ExperienceItemUI, ExperienceIconUI } from "../../dashboard.types";

interface ExperienceModalProps {
  isOpen: boolean;
  item?: ExperienceItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<ExperienceItemUI>) => void;
}

export default function ExperienceModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ExperienceModalProps) {
  const [role, setRole] = useState(item?.role || "");
  const [company, setCompany] = useState(item?.company || "");
  const [period, setPeriod] = useState(item?.period || "");
  const [icon, setIcon] = useState<ExperienceIconUI>(item?.icon || "Code2");
  const [details, setDetails] = useState(item?.details || "");
  const [skillsText, setSkillsText] = useState(item?.skills?.join(", ") || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      id: item?.id,
      role,
      company,
      period,
      icon,
      details,
      skills,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Career Role" : "Add Career Role"}
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
                Job Title / Role
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Full-Stack Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Company / Organization
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tech Innovations Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Employment Period
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2024 - Present"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Role Icon
              </label>
              <div className="flex items-center gap-2">
                {[
                  { value: "Code2" as ExperienceIconUI, label: "Code", Icon: Code2 },
                  { value: "Terminal" as ExperienceIconUI, label: "Terminal", Icon: Terminal },
                  { value: "GraduationCap" as ExperienceIconUI, label: "Education", Icon: GraduationCap },
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
              Responsibilities & Impact
            </label>
            <textarea
              rows={3}
              required
              placeholder="Architected frontend microfrontends, reduced load times by 40%..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Technologies & Skills (comma separated)
            </label>
            <input
              type="text"
              required
              placeholder="React, Next.js, Node.js, TypeScript, PostgreSQL"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
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
              {item ? "Update Role" : "Save Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
