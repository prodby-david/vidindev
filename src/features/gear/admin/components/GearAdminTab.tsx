"use client";

import { GearAdminTabProps } from "../gear-admin.types";
import { useGearAdminTab } from "../hooks/useGearAdminTab";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardSkeletonGrid,
  RemovableBadge,
  DeleteConfirmModal,
} from "@/shared/components/admin";
import GearModal from "./GearModal";
import { GEAR_CATEGORY_LABELS } from "../../validator/gear.schema";

export default function GearAdminTab(props: GearAdminTabProps) {
  const {
    isLoading,
    loadError,
    actionError,
    refetch,
    searchQuery,
    setSearchQuery,
    modalState,
    deleteTarget,
    filteredCategories,
    handleSave,
    handleRemoveItem,
    handleDeleteConfirm,
    openAddModal,
    openEditModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  } = useGearAdminTab(props);

  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeader
        title="Toolbox & Everyday Gear"
        description="Manage your hardware setups, apps, developer gear, and equipment"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter gear..."
        actionLabel="Add Gear Category"
        onAction={openAddModal}
      />

      {loadError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">
          <span>{loadError}</span>
          <button
            type="button"
            onClick={refetch}
            className="font-semibold underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {actionError && (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">
          {actionError}
        </div>
      )}

      {isLoading ? (
        <DashboardSkeletonGrid count={3} />
      ) : filteredCategories.length === 0 ? (
        <DashboardEmptyState
          title="No gear categories found"
          description="Add a setup or hardware group to list your development tools"
          actionLabel="Add Gear Category"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <DashboardCard
              key={cat.id}
              title={GEAR_CATEGORY_LABELS[cat.category]}
              badge={`${cat.items.length} items`}
              onEdit={() => openEditModal(cat)}
              onDelete={() => openDeleteModal(cat)}
            >
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <RemovableBadge
                    key={item}
                    label={item}
                    onRemove={() => handleRemoveItem(cat.id, item)}
                    removeAriaLabel={`Remove ${item}`}
                  />
                ))}
              </div>
            </DashboardCard>
          ))}
        </div>
      )}

      <GearModal
        key={modalState.isOpen ? (modalState.item?.id ?? "new-gear") : "closed"}
        isOpen={modalState.isOpen}
        item={modalState.item}
        onClose={closeModal}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={
          deleteTarget ? GEAR_CATEGORY_LABELS[deleteTarget.category] : undefined
        }
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
