import { useCallback, useEffect, useState } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import {
  ProjectItemUI,
  ProjectsAdminTabProps,
} from "../../projects-admin.types";

export function useProjectsAdminTab({
  initialItems = [],
  searchQuery: initialSearch = "",
}: ProjectsAdminTabProps) {
  const [items, setItems] = useState<ProjectItemUI[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItems.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [projectModalState, setProjectModalState] = useState<{
    isOpen: boolean;
    item: ProjectItemUI | null;
  }>({ isOpen: false, item: null });

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await api.get<{ data: ProjectItemUI[] }>("/api/projects");
      setItems(response.data.data ?? []);
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Failed to load projects."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadProjects() {
      try {
        const response = await api.get<{ data: ProjectItemUI[] }>(
          "/api/projects",
        );
        if (!ignore) setItems(response.data.data ?? []);
      } catch (error) {
        if (!ignore) {
          setLoadError(getApiErrorMessage(error, "Failed to load projects."));
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadProjects();

    return () => {
      ignore = true;
    };
  }, []);

  const query = searchQuery.toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query)),
  );

  const handleSaveProject = async (itemData: Partial<ProjectItemUI>) => {
    try {
      if (projectModalState.item) {
        const response = await api.patch<{ data: ProjectItemUI }>(
          `/api/projects?id=${projectModalState.item.id}`,
          itemData,
        );

        setItems((previous) =>
          previous.map((item) =>
            item.id === projectModalState.item?.id ? response.data.data : item,
          ),
        );
        return;
      }

      const response = await api.post<{ data: ProjectItemUI }>(
        "/api/projects",
        itemData,
      );

      setItems((previous) => [response.data.data, ...previous]);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to save project."));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/api/projects?id=${deleteTarget.id}`);
      setItems((previous) =>
        previous.filter((item) => item.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to delete project."));
    }
  };

  return {
    items,
    isLoading,
    loadError,
    refetch: fetchProjects,
    searchQuery,
    setSearchQuery,
    projectModalState,
    deleteTarget,
    filteredItems,
    handleSaveProject,
    handleDeleteConfirm,
    openAddProjectModal: () =>
      setProjectModalState({ isOpen: true, item: null }),
    openEditProjectModal: (item: ProjectItemUI) =>
      setProjectModalState({ isOpen: true, item }),
    closeProjectModal: () =>
      setProjectModalState({ isOpen: false, item: null }),
    openDeleteProjectModal: (item: ProjectItemUI) =>
      setDeleteTarget({ id: item.id, title: item.title }),
    closeDeleteModal: () => setDeleteTarget(null),
  };
}
