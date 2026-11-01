"use client";

import Image from "next/image";
import { AboutMarqueeTabProps } from "../../about-admin.types";
import { useMarqueeAdminTab } from "../../hooks/marquee/useMarqueeAdminTab";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardSkeletonGrid,
  DeleteConfirmModal,
} from "@/shared/components/admin";
import MarqueeModal from "./MarqueeModal";

export default function AboutMarqueeTab(props: AboutMarqueeTabProps) {
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
  } = useMarqueeAdminTab(props);

  return (
    <div className="flex flex-col gap-6 w-full">
      <DashboardHeader
        title="Polaroid Snapshots"
        description={`Total of ${filteredItems.length} moments configured in the marquee conveyor`}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter snapshots..."
        actionLabel="Add Snapshot"
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
        <DashboardSkeletonGrid
          count={4}
          columnsClassName="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        />
      ) : filteredItems.length === 0 ? (
        <DashboardEmptyState
          title="No snapshots found"
          description="Add your first polaroid photo to appear on the about marquee"
          actionLabel="Add Snapshot"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.caption}
              subtitle={item.alt}
              onEdit={() => openEditModal(item)}
              onDelete={() => openDeleteModal(item)}
            >
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-sand/30 dark:bg-sand/60">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px"
                  className="object-cover"
                />
              </div>
            </DashboardCard>
          ))}
        </div>
      )}

      <MarqueeModal
        key={modalState.isOpen ? (modalState.item?.id ?? "new-snapshot") : "closed"}
        isOpen={modalState.isOpen}
        item={modalState.item}
        onClose={closeModal}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.caption}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
