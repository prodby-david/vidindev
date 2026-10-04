"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  GitBranch,
} from "lucide-react";
import {
  ProjectItemUI,
  ProjectPracticeUI,
  ProjectPracticeIconUI,
} from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import ProjectModal from "../modals/ProjectModal";
import ProjectPracticeModal from "../modals/ProjectPracticeModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardProjectsTabProps {
  initialItems?: ProjectItemUI[];
  initialPractices?: ProjectPracticeUI[];
  onAdd?: (item: Partial<ProjectItemUI>) => void;
  onUpdate?: (item: Partial<ProjectItemUI>) => void;
  onDelete?: (id: string) => void;
  onAddPractice?: (practice: Partial<ProjectPracticeUI>) => void;
  onUpdatePractice?: (practice: Partial<ProjectPracticeUI>) => void;
  onDeletePractice?: (id: string) => void;
  searchQuery?: string;
}

const renderPracticeIcon = (icon: ProjectPracticeIconUI) => {
  switch (icon) {
    case "ShieldCheck":
      return <ShieldCheck size={18} className="text-horizon" />;
    case "Smartphone":
      return <Smartphone size={18} className="text-horizon" />;
    case "GitBranch":
      return <GitBranch size={18} className="text-horizon" />;
    default:
      return <ShieldCheck size={18} className="text-horizon" />;
  }
};

export default function DashboardProjectsTab({
  initialItems = [],
  initialPractices = [],
  onAdd,
  onUpdate,
  onDelete,
  onAddPractice,
  onUpdatePractice,
  onDeletePractice,
  searchQuery: initialSearch = "",
}: DashboardProjectsTabProps) {
  const [items, setItems] = useState<ProjectItemUI[]>(initialItems);
  const [practices, setPractices] =
    useState<ProjectPracticeUI[]>(initialPractices);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [projectModalState, setProjectModalState] = useState<{
    isOpen: boolean;
    item: ProjectItemUI | null;
  }>({ isOpen: false, item: null });

  const [practiceModalState, setPracticeModalState] = useState<{
    isOpen: boolean;
    item: ProjectPracticeUI | null;
  }>({ isOpen: false, item: null });

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
    type: "project" | "practice";
  } | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveProject = (itemData: Partial<ProjectItemUI>) => {
    if (projectModalState.item) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === projectModalState.item?.id
            ? ({ ...i, ...itemData } as ProjectItemUI)
            : i
        )
      );
      onUpdate?.(itemData);
    } else {
      const newItem: ProjectItemUI = {
        id: `p-${Date.now()}`,
        number: itemData.number || "01",
        title: itemData.title || "",
        description: itemData.description || "",
        tags: itemData.tags || [],
        link: itemData.link || "https://github.com",
        imageSrc: itemData.imageSrc || "/images/mis.jpg",
      };
      setItems((prev) => [newItem, ...prev]);
      onAdd?.(newItem);
    }
  };

  const handleSavePractice = (practiceData: Partial<ProjectPracticeUI>) => {
    if (practiceModalState.item) {
      setPractices((prev) =>
        prev.map((p) =>
          p.id === practiceModalState.item?.id
            ? ({ ...p, ...practiceData } as ProjectPracticeUI)
            : p
        )
      );
      onUpdatePractice?.(practiceData);
    } else {
      const newPractice: ProjectPracticeUI = {
        id: `prac-${Date.now()}`,
        title: practiceData.title || "",
        description: practiceData.description || "",
        guardrail: practiceData.guardrail || "",
        icon: practiceData.icon || "ShieldCheck",
      };
      setPractices((prev) => [...prev, newPractice]);
      onAddPractice?.(newPractice);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "project") {
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      onDelete?.(deleteTarget.id);
    } else {
      setPractices((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      onDeletePractice?.(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
              Portfolio Projects
            </h2>
            <p className="text-xs sm:text-sm text-ocean">
              Manage your showcased case studies, work samples, and repository links
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DashboardSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter projects..."
            />
            <button
              type="button"
              onClick={() =>
                setProjectModalState({ isOpen: true, item: null })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
            >
              <Plus size={16} />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <DashboardEmptyState
            title="No projects found"
            description="Create your first featured engineering project"
            actionLabel="Add Project"
            onAction={() =>
              setProjectModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <DashboardCard
                key={item.id}
                title={item.title}
                badge={`#${item.number}`}
                onEdit={() =>
                  setProjectModalState({ isOpen: true, item })
                }
                onDelete={() =>
                  setDeleteTarget({
                    id: item.id,
                    title: item.title,
                    type: "project",
                  })
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="relative w-full h-36 rounded-sm overflow-hidden bg-sand/30 dark:bg-sand/60">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>

                  <p className="text-xs text-ocean leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-horizon hover:underline"
                    >
                      <span>Visit Project</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 pt-6 border-t border-deep-ocean/10 dark:border-horizon/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg sm:text-xl font-bold font-display text-deep-ocean">
              Engineering Practices & Standards
            </h3>
            <p className="text-xs sm:text-sm text-ocean">
              Core architectural principles and guardrails maintained across projects
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setPracticeModalState({ isOpen: true, item: null })
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add Practice</span>
          </button>
        </div>

        {practices.length === 0 ? (
          <DashboardEmptyState
            title="No engineering practices found"
            description="Document your quality guardrails and architectural standards"
            actionLabel="Add Practice"
            onAction={() =>
              setPracticeModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {practices.map((practice) => (
              <DashboardCard
                key={practice.id}
                title={practice.title}
                onEdit={() =>
                  setPracticeModalState({ isOpen: true, item: practice })
                }
                onDelete={() =>
                  setDeleteTarget({
                    id: practice.id,
                    title: practice.title,
                    type: "practice",
                  })
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-md bg-sand/30 dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15">
                    {renderPracticeIcon(practice.icon)}
                    <span className="text-xs font-semibold text-deep-ocean">
                      {practice.icon}
                    </span>
                  </div>

                  <p className="text-xs text-ocean leading-relaxed">
                    {practice.description}
                  </p>

                  <div className="pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    <span className="text-[11px] font-medium text-horizon font-mono">
                      Rule: {practice.guardrail}
                    </span>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <ProjectModal
        isOpen={projectModalState.isOpen}
        item={projectModalState.item}
        onClose={() =>
          setProjectModalState({ isOpen: false, item: null })
        }
        onSave={handleSaveProject}
      />

      <ProjectPracticeModal
        isOpen={practiceModalState.isOpen}
        item={practiceModalState.item}
        onClose={() =>
          setPracticeModalState({ isOpen: false, item: null })
        }
        onSave={handleSavePractice}
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
