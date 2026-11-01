import { useCallback, useEffect, useState } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import { GearCategoryUI, GearAdminTabProps } from "../gear-admin.types";

export function useGearAdminTab({
  initialCategories = [],
  searchQuery: initialSearch = "",
}: GearAdminTabProps) {
  const [categories, setCategories] =
    useState<GearCategoryUI[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(initialCategories.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: GearCategoryUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] = useState<GearCategoryUI | null>(null);

  const fetchGear = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await api.get<{ data: GearCategoryUI[] }>("/api/gear");
      setCategories(response.data.data ?? []);
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Failed to load gear."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadGear() {
      try {
        const response = await api.get<{ data: GearCategoryUI[] }>("/api/gear");
        if (!ignore) setCategories(response.data.data ?? []);
      } catch (error) {
        if (!ignore) {
          setLoadError(getApiErrorMessage(error, "Failed to load gear."));
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadGear();

    return () => {
      ignore = true;
    };
  }, []);

  const query = searchQuery.toLowerCase();
  const filteredCategories = categories.filter(
    (category) =>
      category.category.toLowerCase().includes(query) ||
      category.items.some((item) => item.toLowerCase().includes(query)),
  );

  const handleSave = async (catData: Partial<GearCategoryUI>) => {
    try {
      if (modalState.item) {
        const response = await api.patch<{ data: GearCategoryUI }>(
          `/api/gear?id=${modalState.item.id}`,
          catData,
        );

        setCategories((previous) =>
          previous.map((category) =>
            category.id === modalState.item?.id
              ? response.data.data
              : category,
          ),
        );
        return;
      }

      const response = await api.post<{ data: GearCategoryUI }>(
        "/api/gear",
        catData,
      );

      setCategories((previous) => [...previous, response.data.data]);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to save gear."));
    }
  };

  const handleRemoveItem = async (categoryId: string, itemToRemove: string) => {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;

    const nextItems = category.items.filter((item) => item !== itemToRemove);
    if (nextItems.length === 0) {
      setDeleteTarget(category);
      return;
    }

    setActionError(null);

    try {
      const response = await api.patch<{ data: GearCategoryUI }>(
        `/api/gear?id=${categoryId}`,
        { items: nextItems },
      );

      setCategories((previous) =>
        previous.map((item) =>
          item.id === categoryId ? response.data.data : item,
        ),
      );
    } catch (error) {
      setActionError(getApiErrorMessage(error, "Failed to remove item."));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/api/gear?id=${deleteTarget.id}`);
      setCategories((previous) =>
        previous.filter((category) => category.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to delete gear."));
    }
  };

  return {
    categories,
    isLoading,
    loadError,
    actionError,
    refetch: fetchGear,
    searchQuery,
    setSearchQuery,
    modalState,
    deleteTarget,
    filteredCategories,
    handleSave,
    handleRemoveItem,
    handleDeleteConfirm,
    openAddModal: () => setModalState({ isOpen: true, item: null }),
    openEditModal: (item: GearCategoryUI) =>
      setModalState({ isOpen: true, item }),
    closeModal: () => setModalState({ isOpen: false, item: null }),
    openDeleteModal: (item: GearCategoryUI) => setDeleteTarget(item),
    closeDeleteModal: () => setDeleteTarget(null),
  };
}
