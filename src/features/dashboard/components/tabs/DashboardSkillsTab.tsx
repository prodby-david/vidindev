"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { SkillCategoryUI } from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import SkillModal from "../modals/SkillModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardSkillsTabProps {
  initialCategories?: SkillCategoryUI[];
  onAddCategory?: (category: Partial<SkillCategoryUI>) => void;
  onUpdateCategory?: (category: Partial<SkillCategoryUI>) => void;
  onDeleteCategory?: (id: string) => void;
  searchQuery?: string;
}

export default function DashboardSkillsTab({
  initialCategories = [],
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  searchQuery: initialSearch = "",
}: DashboardSkillsTabProps) {
  const [categories, setCategories] =
    useState<SkillCategoryUI[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: SkillCategoryUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState<SkillCategoryUI | null>(null);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = (catData: Partial<SkillCategoryUI>) => {
    if (modalState.item) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === modalState.item?.id
            ? ({ ...c, ...catData } as SkillCategoryUI)
            : c
        )
      );
      onUpdateCategory?.(catData);
    } else {
      const newCat: SkillCategoryUI = {
        id: `s-${Date.now()}`,
        title: catData.title || "New Category",
        skills: catData.skills || [],
      };
      setCategories((prev) => [...prev, newCat]);
      onAddCategory?.(newCat);
    }
  };

  const handleRemoveSkill = (categoryId: string, skillName: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, skills: c.skills.filter((s) => s !== skillName) }
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
            Skills & Technologies
          </h2>
          <p className="text-xs sm:text-sm text-ocean">
            Manage your technical skill categories and individual stack badges
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DashboardSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter skills..."
          />
          <button
            type="button"
            onClick={() => setModalState({ isOpen: true, item: null })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
          >
            <Plus size={16} />
            <span>Add Skill Category</span>
          </button>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <DashboardEmptyState
          title="No skill stacks found"
          description="Create a technical category and add technology badges"
          actionLabel="Add Skill Category"
          onAction={() => setModalState({ isOpen: true, item: null })}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <DashboardCard
              key={cat.id}
              title={cat.title}
              badge={`${cat.skills.length} skills`}
              onEdit={() => setModalState({ isOpen: true, item: cat })}
              onDelete={() => setDeleteTarget(cat)}
            >
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(cat.id, skill)}
                      aria-label={`Remove ${skill}`}
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

      <SkillModal
        isOpen={modalState.isOpen}
        item={modalState.item}
        onClose={() => setModalState({ isOpen: false, item: null })}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.title}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
