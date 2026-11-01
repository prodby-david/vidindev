import { useCallback, useEffect, useState } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import {
  ExperienceItemUI,
  ExperienceAdminTabProps,
} from "../../experience-admin.types";

export function useExperienceAdminTab({
  initialItems = [],
  searchQuery: initialSearch = "",
}: ExperienceAdminTabProps) {
  const [items, setItems] = useState<ExperienceItemUI[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItems.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [roleModalState, setRoleModalState] = useState<{
    isOpen: boolean;
    item: ExperienceItemUI | null;
  }>({ isOpen: false, item: null });

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const fetchExperience = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await api.get<{ data: ExperienceItemUI[] }>(
        "/api/experience",
      );
      setItems(response.data.data ?? []);
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Failed to load experience."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadExperience() {
      try {
        const response = await api.get<{ data: ExperienceItemUI[] }>(
          "/api/experience",
        );
        if (!ignore) setItems(response.data.data ?? []);
      } catch (error) {
        if (!ignore) {
          setLoadError(getApiErrorMessage(error, "Failed to load experience."));
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadExperience();

    return () => {
      ignore = true;
    };
  }, []);

  const query = searchQuery.toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      item.role.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.details.toLowerCase().includes(query) ||
      item.skills.some((skill) => skill.toLowerCase().includes(query)),
  );

  const handleSaveRole = async (itemData: Partial<ExperienceItemUI>) => {
    try {
      if (roleModalState.item) {
        const response = await api.patch<{ data: ExperienceItemUI }>(
          `/api/experience?id=${roleModalState.item.id}`,
          itemData,
        );

        setItems((previous) =>
          previous.map((item) =>
            item.id === roleModalState.item?.id ? response.data.data : item,
          ),
        );
        return;
      }

      const response = await api.post<{ data: ExperienceItemUI }>(
        "/api/experience",
        itemData,
      );

      setItems((previous) => [response.data.data, ...previous]);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to save experience."));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/api/experience?id=${deleteTarget.id}`);
      setItems((previous) =>
        previous.filter((item) => item.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Failed to delete experience."),
      );
    }
  };

  return {
    items,
    isLoading,
    loadError,
    refetch: fetchExperience,
    searchQuery,
    setSearchQuery,
    roleModalState,
    deleteTarget,
    filteredItems,
    handleSaveRole,
    handleDeleteConfirm,
    openAddRoleModal: () => setRoleModalState({ isOpen: true, item: null }),
    openEditRoleModal: (item: ExperienceItemUI) =>
      setRoleModalState({ isOpen: true, item }),
    closeRoleModal: () => setRoleModalState({ isOpen: false, item: null }),
    openDeleteRoleModal: (item: ExperienceItemUI) =>
      setDeleteTarget({ id: item.id, title: item.role }),
    closeDeleteModal: () => setDeleteTarget(null),
  };
}
