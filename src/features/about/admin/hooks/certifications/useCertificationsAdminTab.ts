import { useCallback, useEffect, useState } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import {
  CertificationItemUI,
  AboutCertificationsTabProps,
} from "../../about-admin.types";

export function useCertificationsAdminTab({
  initialItems = [],
  searchQuery: initialSearch = "",
}: AboutCertificationsTabProps) {
  const [items, setItems] = useState<CertificationItemUI[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItems.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: CertificationItemUI | null;
  }>({ isOpen: false, item: null });
  const [deleteTarget, setDeleteTarget] =
    useState<CertificationItemUI | null>(null);

  const fetchCertifications = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await api.get<{ data: CertificationItemUI[] }>(
        "/api/certifications",
      );
      setItems(response.data.data ?? []);
    } catch (error) {
      setLoadError(
        getApiErrorMessage(error, "Failed to load certifications."),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadCertifications() {
      try {
        const response = await api.get<{ data: CertificationItemUI[] }>(
          "/api/certifications",
        );
        if (!ignore) setItems(response.data.data ?? []);
      } catch (error) {
        if (!ignore) {
          setLoadError(
            getApiErrorMessage(error, "Failed to load certifications."),
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadCertifications();

    return () => {
      ignore = true;
    };
  }, []);

  const query = searchQuery.toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.institution.toLowerCase().includes(query) ||
      item.credentialId?.toLowerCase().includes(query),
  );

  const handleSave = async (itemData: Partial<CertificationItemUI>) => {
    try {
      if (modalState.item) {
        const response = await api.patch<{ data: CertificationItemUI }>(
          `/api/certifications?id=${modalState.item.id}`,
          itemData,
        );

        setItems((previous) =>
          previous.map((item) =>
            item.id === modalState.item?.id ? response.data.data : item,
          ),
        );
        return;
      }

      const response = await api.post<{ data: CertificationItemUI }>(
        "/api/certifications",
        itemData,
      );

      setItems((previous) => [response.data.data, ...previous]);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Failed to save certification."),
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/api/certifications?id=${deleteTarget.id}`);
      setItems((previous) =>
        previous.filter((item) => item.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Failed to delete certification."),
      );
    }
  };

  return {
    items,
    isLoading,
    loadError,
    refetch: fetchCertifications,
    searchQuery,
    setSearchQuery,
    modalState,
    deleteTarget,
    filteredItems,
    handleSave,
    handleDeleteConfirm,
    openAddModal: () => setModalState({ isOpen: true, item: null }),
    openEditModal: (item: CertificationItemUI) =>
      setModalState({ isOpen: true, item }),
    closeModal: () => setModalState({ isOpen: false, item: null }),
    openDeleteModal: (item: CertificationItemUI) => setDeleteTarget(item),
    closeDeleteModal: () => setDeleteTarget(null),
  };
}
