"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ExternalLink } from "lucide-react";
import { CertificationItemUI } from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import CertificationModal from "../modals/CertificationModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardCertificationsTabProps {
  initialItems?: CertificationItemUI[];
  onAdd?: (item: Partial<CertificationItemUI>) => void;
  onUpdate?: (item: Partial<CertificationItemUI>) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
}

export default function DashboardCertificationsTab({
  initialItems = [],
  onAdd,
  onUpdate,
  onDelete,
  searchQuery: initialSearch = "",
}: DashboardCertificationsTabProps) {
  const [items, setItems] = useState<CertificationItemUI[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: CertificationItemUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] =
    useState<CertificationItemUI | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.credentialId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (itemData: Partial<CertificationItemUI>) => {
    if (modalState.item) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === modalState.item?.id
            ? ({ ...i, ...itemData } as CertificationItemUI)
            : i
        )
      );
      onUpdate?.(itemData);
    } else {
      const newItem: CertificationItemUI = {
        id: `c-${Date.now()}`,
        title: itemData.title || "",
        institution: itemData.institution || "",
        period: itemData.period || "",
        type: itemData.type || "certification",
        credentialId: itemData.credentialId || "",
        verificationUrl: itemData.verificationUrl,
        details: itemData.details || "",
        credentialImage:
          itemData.credentialImage || "/images/aws-cert2.jpg",
      };
      setItems((prev) => [newItem, ...prev]);
      onAdd?.(newItem);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    onDelete?.(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
            Education & Certifications
          </h2>
          <p className="text-xs sm:text-sm text-ocean">
            Manage your verified degrees, certifications, and credentials
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DashboardSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter credentials..."
          />
          <button
            type="button"
            onClick={() => setModalState({ isOpen: true, item: null })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
          >
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <DashboardEmptyState
          title="No certifications found"
          description="Add verified credentials to showcase in the 3D flip card carousel"
          actionLabel="Add Certification"
          onAction={() => setModalState({ isOpen: true, item: null })}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.title}
              subtitle={`${item.institution} • ${item.period}`}
              badge={item.type === "degree" ? "Degree" : "Certification"}
              onEdit={() => setModalState({ isOpen: true, item })}
              onDelete={() => setDeleteTarget(item)}
            >
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-sand/30 dark:bg-sand/60">
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
