"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { GearCategoryUI } from "../../dashboard.types";

interface GearModalProps {
  isOpen: boolean;
  item?: GearCategoryUI | null;
  onClose: () => void;
  onSave: (item: Partial<GearCategoryUI>) => void;
}

export default function GearModal({
  isOpen,
  item,
  onClose,
  onSave,
}: GearModalProps) {
  const [category, setCategory] = useState(item?.category || "");
  const [itemsText, setItemsText] = useState(item?.items.join(", ") || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = itemsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      id: item?.id,
      category,
      items,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Gear Category" : "Add Gear Category"}
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
              Category Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hardware & Peripherals"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Items (comma separated)
            </label>
            <textarea
              rows={4}
              required
              placeholder="MacBook Pro M-Series, Dell UltraSharp Monitor, Keychron K2"
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
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
              {item ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
