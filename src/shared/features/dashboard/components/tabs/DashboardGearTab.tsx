"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { GearCategoryUI } from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import GearModal from "../modals/GearModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardGearTabProps {
  initialCategories?: GearCategoryUI[];
  onAddCategory?: (category: Partial<GearCategoryUI>) => void;
  onUpdateCategory?: (category: Partial<GearCategoryUI>) => void;
  onDeleteCategory?: (id: string) => void;
  searchQuery?: string;
}

export default function DashboardGearTab({
  initialCategories = [],
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  searchQuery: initialSearch = "",
}: DashboardGearTabProps) {
  const [categories, setCategories] =
    useState<GearCategoryUI[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: GearCategoryUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState<GearCategoryUI | null>(null);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.items.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = (catData: Partial<GearCategoryUI>) => {
    if (modalState.item) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === modalState.item?.id
            ? ({ ...c, ...catData } as GearCategoryUI)
            : c
        )
      );
      onUpdateCategory?.(catData);
    } else {
      const newCat: GearCategoryUI = {
        id: `g-${Date.now()}`,
        category: catData.category || "New Category",
        items: catData.items || [],
      };
      setCategories((prev) => [...prev, newCat]);
      onAddCategory?.(newCat);
    }
  };

  const handleRemoveItem = (categoryId: string, itemToRemove: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.filter((i) => i !== itemToRemove) }
          : c
      )
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    onDeleteCategory?.(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
            Toolbox & Everyday Gear
          </h2>
          <p className="text-xs sm:text-sm text-ocean">
            Manage your hardware setups, apps, developer gear, and equipment
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DashboardSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter gear..."
          />
          <button
            type="button"
            onClick={() => setModalState({ isOpen: true, item: null })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
          >
            <Plus size={16} />
            <span>Add Gear Category</span>
          </button>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <DashboardEmptyState
          title="No gear categories found"
          description="Add a setup or hardware group to list your development tools"
          actionLabel="Add Gear Category"
          onAction={() => setModalState({ isOpen: true, item: null })}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <DashboardCard
              key={cat.id}
              title={cat.category}
              badge={`${cat.items.length} items`}
              onEdit={() => setModalState({ isOpen: true, item: cat })}
              onDelete={() => setDeleteTarget(cat)}
            >
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(cat.id, item)}
                      aria-label={`Remove ${item}`}
                      className="text-ocean hover:text-red-500 cursor-pointer p-0.5"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            </DashboardCard>
          ))}
        </div>
      )}

      <GearModal
        isOpen={modalState.isOpen}
        item={modalState.item}
        onClose={() => setModalState({ isOpen: false, item: null })}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.category}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
