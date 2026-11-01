import { useState } from "react";
import { CreateSkillInput, createSkillSchema, StackCategory } from "../../validator/skills.schema";

export function useSkillModalForm(
  onSave: (data: CreateSkillInput) => Promise<void>,
  onClose: () => void
) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<StackCategory>("FRONTEND");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = createSkillSchema.safeParse({ name: name.trim(), category });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Validation failed");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(result.data);
      setName("");
      setCategory("FRONTEND");
      onClose();
    } catch {
      setError("Failed to create skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    category,
    isSubmitting,
    error,
    setName,
    setCategory,
    setError,
    handleSubmit,
  };
}
