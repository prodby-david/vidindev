"use client";

import { Loader2 } from "lucide-react";
import { SkillModalProps } from "../skills-admin.types";
import { useSkillModalForm } from "../hooks/useSkillModalForm";
import { StackCategory } from "../../validator/skills.schema";
import { AdminModal } from "@/shared/components/admin";
import { Input, Select } from "@/shared/components/ui";
import { SKILL_CATEGORY_OPTIONS } from "../constants/skills-admin.constant";

export default function SkillModal({ isOpen, onClose, onSave }: SkillModalProps) {
  const {
    name,
    category,
    isSubmitting,
    error,
    setName,
    setCategory,
    setError,
    handleSubmit,
  } = useSkillModalForm(onSave, onClose);

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Technology Stack"
      error={error}
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Technology / Skill Name"
          type="text"
          required
          placeholder="e.g. Next.js, PostgreSQL, Docker"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
        />

        <Select
          label="Category"
          required
          value={category}
          options={SKILL_CATEGORY_OPTIONS}
          onChange={(e) => {
            setCategory(e.target.value as StackCategory);
            setError(null);
          }}
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
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md text-xs font-semibold bg-ocean text-white hover:bg-deep-ocean transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isSubmitting && <Loader2 size={14} className="animate-spin" />}
            <span>{isSubmitting ? "Saving..." : "Add Stack"}</span>
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
