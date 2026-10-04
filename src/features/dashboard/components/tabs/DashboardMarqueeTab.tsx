"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { MarqueeItemUI } from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import MarqueeModal from "../modals/MarqueeModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardMarqueeTabProps {
  initialItems?: MarqueeItemUI[];
  onAdd?: (item: Partial<MarqueeItemUI>) => void;
  onUpdate?: (item: Partial<MarqueeItemUI>) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
}

export default function DashboardMarqueeTab({
  initialItems = [],
  onAdd,
  onUpdate,
  onDelete,
  searchQuery: initialSearch = "",
}: DashboardMarqueeTabProps) {
  const [items, setItems] = useState<MarqueeItemUI[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: MarqueeItemUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState<MarqueeItemUI | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (itemData: Partial<MarqueeItemUI>) => {
    if (modalState.item) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === modalState.item?.id ? ({ ...i, ...itemData } as MarqueeItemUI) : i
        )
      );
      onUpdate?.(itemData);
    } else {
      const newItem: MarqueeItemUI = {
        id: `m-${Date.now()}`,
        src: itemData.src || "/images/gradpic.jpg",
        caption: itemData.caption || "",
        alt: itemData.alt || "",
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
            Polaroid Snapshots
          </h2>
          <p className="text-xs sm:text-sm text-ocean">
            Total of {filteredItems.length} moments configured in the marquee conveyor
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DashboardSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter snapshots..."
          />
          <button
            type="button"
            onClick={() => setModalState({ isOpen: true, item: null })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
          >
            <Plus size={16} />
            <span>Add Snapshot</span>
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <DashboardEmptyState
          title="No snapshots found"
          description="Add your first polaroid photo to appear on the about marquee"
          actionLabel="Add Snapshot"
          onAction={() => setModalState({ isOpen: true, item: null })}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.caption}
              subtitle={item.alt}
              onEdit={() => setModalState({ isOpen: true, item })}
              onDelete={() => setDeleteTarget(item)}
            >
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-sand/30 dark:bg-sand/60">
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
        isOpen={modalState.isOpen}
        item={modalState.item}
        onClose={() => setModalState({ isOpen: false, item: null })}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.caption}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
