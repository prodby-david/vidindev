import { useCallback, useEffect, useState } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import { MarqueeItemUI, AboutMarqueeTabProps } from "../../about-admin.types";

export function useMarqueeAdminTab({
  initialItems = [],
  searchQuery: initialSearch = "",
}: AboutMarqueeTabProps) {
  const [items, setItems] = useState<MarqueeItemUI[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItems.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: MarqueeItemUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState<MarqueeItemUI | null>(null);

  const fetchSnapshots = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await api.get<{ data: MarqueeItemUI[] }>("/api/marquee");
      setItems(response.data.data ?? []);
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Failed to load snapshots."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadSnapshots() {
      try {
        const response = await api.get<{ data: MarqueeItemUI[] }>(
          "/api/marquee",
        );
        if (!ignore) setItems(response.data.data ?? []);
      } catch (error) {
        if (!ignore) {
          setLoadError(getApiErrorMessage(error, "Failed to load snapshots."));
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadSnapshots();

    return () => {
      ignore = true;
    };
  }, []);

  const query = searchQuery.toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      item.caption.toLowerCase().includes(query) ||
      item.alt.toLowerCase().includes(query),
  );

  const handleSave = async (itemData: Partial<MarqueeItemUI>) => {
    try {
      if (modalState.item) {
        const response = await api.patch<{ data: MarqueeItemUI }>(
          `/api/marquee?id=${modalState.item.id}`,
          itemData,
        );

        setItems((previous) =>
          previous.map((item) =>
            item.id === modalState.item?.id ? response.data.data : item,
          ),
        );
        return;
      }

      const response = await api.post<{ data: MarqueeItemUI }>(
        "/api/marquee",
        itemData,
      );

      setItems((previous) => [response.data.data, ...previous]);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to save snapshot."));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/api/marquee?id=${deleteTarget.id}`);
      setItems((previous) =>
        previous.filter((item) => item.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to delete snapshot."));
    }
  };

  return {
    items,
    isLoading,
    loadError,
    refetch: fetchSnapshots,
    searchQuery,
    setSearchQuery,
    modalState,
    deleteTarget,
    filteredItems,
    handleSave,
    handleDeleteConfirm,
    openAddModal: () => setModalState({ isOpen: true, item: null }),
    openEditModal: (item: MarqueeItemUI) =>
      setModalState({ isOpen: true, item }),
    closeModal: () => setModalState({ isOpen: false, item: null }),
    openDeleteModal: (item: MarqueeItemUI) => setDeleteTarget(item),
    closeDeleteModal: () => setDeleteTarget(null),
  };
}
