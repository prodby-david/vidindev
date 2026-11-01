"use client";

import { ExperienceModalProps } from "../../experience-admin.types";
import { useExperienceModalForm } from "../../hooks/timeline/useExperienceModalForm";
import { AdminModal } from "@/shared/components/admin";
import { Input, Select, Textarea } from "@/shared/components/ui";

export default function ExperienceModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ExperienceModalProps) {
  const {
    role,
    company,
    period,
    details,
    skillsText,
    icon,
    error,
    isSubmitting,
    setRole,
    setCompany,
    setPeriod,
    setDetails,
    setSkillsText,
    setIcon,
    setError,
    handleSubmit,
  } = useExperienceModalForm(item, onSave, onClose);

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Career Role" : "Add Career Role"}
      error={error}
      maxWidthClassName="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Job Title / Role"
            type="text"
            required
            placeholder="e.g. Full-Stack Software Engineer"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError(null);
            }}
          />

          <Input
            label="Company / Organization"
            type="text"
            required
            placeholder="e.g. Tech Innovations Corp"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setError(null);
            }}
          />
        </div>

        <Input
          label="Employment Period"
          type="text"
          required
          placeholder="e.g. 2024 - Present"
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
            setError(null);
          }}
        />

        <Textarea
          label="Responsibilities & Impact"
          rows={3}
          required
          placeholder="Architected frontend microfrontends, reduced load times by 40%..."
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            setError(null);
          }}
        />

        <Input
          label="Technologies & Skills (comma separated)"
          type="text"
          required
          placeholder="React, Next.js, Node.js, TypeScript, PostgreSQL"
          value={skillsText}
          onChange={(e) => {
            setSkillsText(e.target.value);
            setError(null);
          }}
        />

        <Select
          label="Timeline Icon"
          value={icon}
          onChange={(e) => {
            setIcon(e.target.value as typeof icon);
            setError(null);
          }}
          options={[
            { value: "Code2", label: "Code" },
            { value: "Terminal", label: "Terminal" },
            { value: "GraduationCap", label: "Graduation cap" },
          ]}
        />

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-deep-ocean/10 dark:border-horizon/15">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md text-xs font-semibold text-ocean hover:text-deep-ocean cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-md text-xs font-semibold bg-ocean text-white hover:bg-deep-ocean transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : item ? "Update Role" : "Save Role"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
