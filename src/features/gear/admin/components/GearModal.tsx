"use client";

import { GearModalProps } from "../gear-admin.types";
import { useGearModalForm } from "../hooks/useGearModalForm";
import { AdminModal } from "@/shared/components/admin";
import { Select, Textarea } from "@/shared/components/ui";
import { GEAR_CATEGORY_OPTIONS } from "../../validator/gear.schema";

export default function GearModal({
  isOpen,
  item,
  onClose,
  onSave,
}: GearModalProps) {
  const {
    category,
    setCategory,
    itemsText,
    setItemsText,
    error,
    isSubmitting,
    setError,
    handleSubmit,
  } = useGearModalForm(item, onSave, onClose);

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? "Edit Gear Category" : "Add Gear Category"}
      error={error}
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          label="Category"
          required
          value={category}
          onChange={(event) => {
            setCategory(event.target.value as typeof category);
            setError(null);
          }}
          options={GEAR_CATEGORY_OPTIONS}
        />

        <Textarea
          label="Items (comma separated)"
          required
          rows={3}
          placeholder="e.g. MacBook Pro, Dell Monitor, MX Master"
          value={itemsText}
          onChange={(event) => {
            setItemsText(event.target.value);
            setError(null);
          }}
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-ocean hover:text-deep-ocean cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-horizon hover:bg-ocean text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : item
                ? "Save Changes"
                : "Add Category"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
