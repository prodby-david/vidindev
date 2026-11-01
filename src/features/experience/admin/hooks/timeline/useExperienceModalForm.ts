import { useState } from "react";
import {
  ExperienceIconUI,
  ExperienceItemUI,
} from "../../experience-admin.types";
import { experienceSchema } from "../../../validator/experience.schema";

export function useExperienceModalForm(
  item: ExperienceItemUI | null | undefined,
  onSave: (item: Partial<ExperienceItemUI>) => Promise<void> | void,
  onClose: () => void,
) {
  const [role, setRole] = useState(item?.role || "");
  const [company, setCompany] = useState(item?.company || "");
  const [period, setPeriod] = useState(item?.period || "");
  const [details, setDetails] = useState(item?.details || "");
  const [skillsText, setSkillsText] = useState(item?.skills?.join(", ") || "");
  const [icon, setIcon] = useState<ExperienceIconUI>(item?.icon || "Code2");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsedSkills = skillsText
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const result = experienceSchema.safeParse({
      id: item?.id,
      role,
      company,
      period,
      details,
      skills: parsedSkills,
      icon,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Validation failed");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({ ...result.data, id: item?.id });
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save experience.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
