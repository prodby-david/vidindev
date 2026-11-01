import { useState, useEffect, useCallback } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import { SkillCategoryGroup, SkillsAdminTabProps } from "../skills-admin.types";
import {
  CreateSkillInput,
  STACK_CATEGORY_LABELS,
  StackCategory,
  StackItem,
} from "../../validator/skills.schema";

import { SKILL_CATEGORIES } from "../constants/skills-admin.constant";

const CATEGORY_ORDER = SKILL_CATEGORIES;

export function useSkillsAdminTab({ initialSkills = [] }: SkillsAdminTabProps = {}) {
  const [skills, setSkills] = useState<StackItem[]>(initialSkills);
  const [isLoading, setIsLoading] = useState(initialSkills.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | StackCategory>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<StackItem | null>(null);

  const fetchSkills = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get<{ data: StackItem[] }>("/api/skills");
      setSkills(res.data.data || []);
    } catch (error) {
      setError(getApiErrorMessage(error, "Failed to load skills"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialSkills() {
      try {
        const res = await api.get<{ data: StackItem[] }>("/api/skills");
        if (!ignore) {
          setSkills(res.data.data || []);
        }
      } catch (error) {
        if (!ignore) {
          setError(getApiErrorMessage(error, "Failed to load skills"));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialSkills();

    return () => {
      ignore = true;
    };
  }, []);

  const handleAddSkill = async (data: CreateSkillInput) => {
    const res = await api.post<{ data: StackItem }>("/api/skills", data);
    setSkills((prev) =>
      prev.some((s) => s.id === res.data.data.id)
        ? prev
        : [...prev, res.data.data],
    );
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await api.delete(`/api/skills?id=${deleteTarget.id}`);
      setSkills((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to delete skill"));
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    const matchesCategory =
      selectedCategory === "ALL" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryGroups: SkillCategoryGroup[] = CATEGORY_ORDER.map((category) => ({
    category,
    title: STACK_CATEGORY_LABELS[category],
    items: filteredSkills.filter((s) => s.category === category),
  })).filter(
    (group) =>
      selectedCategory === "ALL" || group.category === selectedCategory
  );

  return {
    skills,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isAddModalOpen,
    openAddModal: () => setIsAddModalOpen(true),
    closeAddModal: () => setIsAddModalOpen(false),
    deleteTarget,
    openDeleteModal: (item: StackItem) => setDeleteTarget(item),
    closeDeleteModal: () => setDeleteTarget(null),
    categoryGroups,
    totalCount: skills.length,
    filteredCount: filteredSkills.length,
    handleAddSkill,
    handleDeleteConfirm,
    refetch: fetchSkills,
  };
}
