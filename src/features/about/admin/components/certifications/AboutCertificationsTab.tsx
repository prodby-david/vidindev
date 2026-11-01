"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { AboutCertificationsTabProps } from "../../about-admin.types";
import { useCertificationsAdminTab } from "../../hooks/certifications/useCertificationsAdminTab";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardSkeletonGrid,
  DeleteConfirmModal,
} from "@/shared/components/admin";
import CertificationModal from "./CertificationModal";

export default function AboutCertificationsTab(
  props: AboutCertificationsTabProps
) {
  const {
    isLoading,
    loadError,
    refetch,
    searchQuery,
    setSearchQuery,
    modalState,
    deleteTarget,
    filteredItems,
    handleSave,
    handleDeleteConfirm,
    openAddModal,
    openEditModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  } = useCertificationsAdminTab(props);

  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeader
        title="Education & Certifications"
        description="Manage your verified degrees, certifications, and credentials"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter credentials..."
        actionLabel="Add Certification"
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

      {isLoading ? (
        <DashboardSkeletonGrid count={3} />
      ) : filteredItems.length === 0 ? (
        <DashboardEmptyState
          title="No certifications found"
          description="Add verified credentials to showcase in the 3D flip card carousel"
          actionLabel="Add Certification"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.title}
              subtitle={`${item.institution} • ${item.period}`}
              badge={item.type === "degree" ? "Degree" : "Certification"}
              onEdit={() => openEditModal(item)}
              onDelete={() => openDeleteModal(item)}
            >
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-sand/30 dark:bg-sand/60">
                  <Image
                    src={item.credentialImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-contain p-2"
                  />
                </div>

                {item.credentialId && (
                  <div className="flex items-center justify-between text-[11px] font-mono text-ocean bg-sand/20 dark:bg-sand/30 px-2.5 py-1 rounded">
                    <span>ID:</span>
                    <span className="font-semibold text-deep-ocean">
                      {item.credentialId}
                    </span>
                  </div>
                )}

                {item.details && (
                  <p className="text-xs text-ocean line-clamp-2">
                    {item.details}
                  </p>
                )}

                {item.verificationUrl && (
                  <div className="pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-horizon hover:underline"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </DashboardCard>
          ))}
        </div>
      )}

      <CertificationModal
        key={modalState.isOpen ? (modalState.item?.id ?? "new-certification") : "closed"}
        isOpen={modalState.isOpen}
        item={modalState.item}
        onClose={closeModal}
        onSave={handleSave}
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
