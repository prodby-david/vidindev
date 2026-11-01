import { useState } from "react";
import { GearCategoryUI } from "../gear-admin.types";
import {
  gearCategoryInputSchema,
  GearCategoryValue,
} from "../../validator/gear.schema";

export function useGearModalForm(
  item: GearCategoryUI | null | undefined,
  onSave: (item: Partial<GearCategoryUI>) => Promise<void> | void,
  onClose: () => void,
) {
  const [category, setCategory] = useState<GearCategoryValue>(
    item?.category || "HARDWARE",
  );
  const [itemsText, setItemsText] = useState(item?.items?.join(", ") || "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const items = itemsText
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const result = gearCategoryInputSchema.safeParse({
      id: item?.id,
      category,
      items,
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
      setError(error instanceof Error ? error.message : "Failed to save gear.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    category,
    setCategory,
    itemsText,
    setItemsText,
    error,
    isSubmitting,
    setError,
    handleSubmit,
  };
}
