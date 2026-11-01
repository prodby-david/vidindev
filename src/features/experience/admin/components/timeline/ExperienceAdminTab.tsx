"use client";

import { Code2, Terminal, GraduationCap } from "lucide-react";
import {
  ExperienceAdminTabProps,
  ExperienceIconUI,
} from "../../experience-admin.types";
import { useExperienceAdminTab } from "../../hooks/timeline/useExperienceAdminTab";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardSkeletonGrid,
  DeleteConfirmModal,
} from "@/shared/components/admin";
import ExperienceModal from "./ExperienceModal";

const renderRoleIcon = (icon?: ExperienceIconUI) => {
  switch (icon) {
    case "Terminal":
      return <Terminal size={16} className="text-horizon" />;
    case "GraduationCap":
      return <GraduationCap size={16} className="text-horizon" />;
    case "Code2":
    default:
      return <Code2 size={16} className="text-horizon" />;
  }
};

export default function ExperienceAdminTab(props: ExperienceAdminTabProps) {
  const {
    isLoading,
    loadError,
    refetch,
    searchQuery,
    setSearchQuery,
    roleModalState,
    deleteTarget,
    filteredItems,
    handleSaveRole,
    handleDeleteConfirm,
    openAddRoleModal,
    openEditRoleModal,
    closeRoleModal,
    openDeleteRoleModal,
    closeDeleteModal,
  } = useExperienceAdminTab(props);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6">
        <DashboardHeader
          title="Career & Experience"
          description="Manage your work history, engineering positions, and responsibilities"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Filter roles..."
          actionLabel="Add Career Role"
          onAction={openAddRoleModal}
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

        {isLoading ? (
          <DashboardSkeletonGrid
            count={2}
            columnsClassName="grid-cols-1 xl:grid-cols-2"
          />
        ) : filteredItems.length === 0 ? (
          <DashboardEmptyState
            title="No career entries found"
            description="Create your first role in the career experience timeline"
            actionLabel="Add Career Role"
            onAction={openAddRoleModal}
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <DashboardCard
                key={item.id}
                title={item.role}
                subtitle={item.company}
                badge={item.period}
                onEdit={() => openEditRoleModal(item)}
                onDelete={() => openDeleteRoleModal(item)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-ocean">
                    {renderRoleIcon(item.icon)}
                    <span>Icon: {item.icon}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-ocean leading-relaxed">
                    {item.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <ExperienceModal
        key={
          roleModalState.isOpen
            ? (roleModalState.item?.id ?? "new-role")
            : "closed"
        }
        isOpen={roleModalState.isOpen}
        item={roleModalState.item}
        onClose={closeRoleModal}
        onSave={handleSaveRole}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.title}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
