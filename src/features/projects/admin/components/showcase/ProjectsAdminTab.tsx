"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ProjectsAdminTabProps } from "../../projects-admin.types";
import { useProjectsAdminTab } from "../../hooks/showcase/useProjectsAdminTab";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardSkeletonGrid,
  DeleteConfirmModal,
} from "@/shared/components/admin";
import ProjectModal from "./ProjectModal";

export default function ProjectsAdminTab(props: ProjectsAdminTabProps) {
  const {
    isLoading,
    loadError,
    refetch,
    searchQuery,
    setSearchQuery,
    projectModalState,
    deleteTarget,
    filteredItems,
    handleSaveProject,
    handleDeleteConfirm,
    openAddProjectModal,
    openEditProjectModal,
    closeProjectModal,
    openDeleteProjectModal,
    closeDeleteModal,
  } = useProjectsAdminTab(props);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6">
        <DashboardHeader
          title="Portfolio Projects"
          description="Manage your showcased case studies, work samples, and repository links"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Filter projects..."
          actionLabel="Add Project"
          onAction={openAddProjectModal}
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
          <DashboardSkeletonGrid count={3} />
        ) : filteredItems.length === 0 ? (
          <DashboardEmptyState
            title="No projects found"
            description="Create your first featured engineering project"
            actionLabel="Add Project"
            onAction={openAddProjectModal}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <DashboardCard
                key={item.id}
                title={item.title}
                badge={`#${item.number}`}
                onEdit={() => openEditProjectModal(item)}
                onDelete={() => openDeleteProjectModal(item)}
              >
                <div className="flex flex-col gap-3">
                  <div className="relative w-full h-36 rounded-md overflow-hidden bg-sand/30 dark:bg-sand/60">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>

                  <p className="text-xs text-ocean leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-horizon hover:underline"
                    >
                      <span>Visit Project</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <ProjectModal
        key={
          projectModalState.isOpen
            ? (projectModalState.item?.id ?? "new-project")
            : "closed"
        }
        isOpen={projectModalState.isOpen}
        item={projectModalState.item}
        onClose={closeProjectModal}
        onSave={handleSaveProject}
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
