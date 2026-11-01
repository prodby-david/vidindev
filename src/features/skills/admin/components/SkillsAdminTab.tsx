"use client";

import { SkillsAdminTabProps } from "../skills-admin.types";
import { useSkillsAdminTab } from "../hooks/useSkillsAdminTab";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardFilterTabs,
  DashboardSkeletonGrid,
  RemovableBadge,
  DeleteConfirmModal,
} from "@/shared/components/admin";
import SkillModal from "./SkillModal";
import { CATEGORY_TABS } from "../constants/skills-admin.constant";

export default function SkillsAdminTab(props: SkillsAdminTabProps) {
  const {
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    deleteTarget,
    openDeleteModal,
    closeDeleteModal,
    categoryGroups,
    totalCount,
    filteredCount,
    handleAddSkill,
    handleDeleteConfirm,
  } = useSkillsAdminTab(props);

  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeader
        title="Skills & Technologies"
        description="Manage your technical skill categories and individual stack badges"
        badge={`${totalCount} total`}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter skills..."
        actionLabel="Add Stack"
        onAction={openAddModal}
      />

      <DashboardFilterTabs
        tabs={CATEGORY_TABS}
        activeTab={selectedCategory}
        onTabChange={setSelectedCategory}
      />

      {error && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
          {error}
        </div>
      )}

      {isLoading ? (
        <DashboardSkeletonGrid count={3} />
      ) : filteredCount === 0 ? (
        <DashboardEmptyState
          title="No technology stack found"
          description={
            searchQuery
              ? `No skills matching "${searchQuery}"`
              : "Create your technical skills and stack items to display here"
          }
          actionLabel="Add Technology Stack"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categoryGroups.map((group) => {
            if (selectedCategory === "ALL" && group.items.length === 0) {
              return null;
            }

            return (
              <DashboardCard
                key={group.category}
                title={group.title}
                badge={`${group.items.length} ${group.items.length === 1 ? "skill" : "skills"}`}
              >
                <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                  {group.items.length === 0 ? (
                    <span className="text-xs text-ocean/60 italic py-1">
                      No technologies in this category
                    </span>
                  ) : (
                    group.items.map((item) => (
                      <RemovableBadge
                        key={item.id}
                        label={item.name}
                        onRemove={() => openDeleteModal(item)}
                      />
                    ))
                  )}
                </div>
              </DashboardCard>
            );
          })}
        </div>
      )}

      <SkillModal
        key={isAddModalOpen ? "open" : "closed"}
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSave={handleAddSkill}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.name}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
