"use client";

import { useState } from "react";
import {
  Plus,
  Code2,
  Terminal,
  GraduationCap,
  Rocket,
  Code,
  Brain,
  MessageSquareCode,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import {
  ExperienceItemUI,
  ExperienceIconUI,
  ExperienceMilestoneUI,
  MilestoneIconUI,
  WorkPrincipleUI,
  PrincipleIconUI,
} from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import ExperienceModal from "../modals/ExperienceModal";
import MilestoneModal from "../modals/MilestoneModal";
import WorkPrincipleModal from "../modals/WorkPrincipleModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardExperienceTabProps {
  initialItems?: ExperienceItemUI[];
  initialMilestones?: ExperienceMilestoneUI[];
  initialPrinciples?: WorkPrincipleUI[];
  onAdd?: (item: Partial<ExperienceItemUI>) => void;
  onUpdate?: (item: Partial<ExperienceItemUI>) => void;
  onDelete?: (id: string) => void;
  onAddMilestone?: (milestone: Partial<ExperienceMilestoneUI>) => void;
  onUpdateMilestone?: (milestone: Partial<ExperienceMilestoneUI>) => void;
  onDeleteMilestone?: (id: string) => void;
  onAddPrinciple?: (principle: Partial<WorkPrincipleUI>) => void;
  onUpdatePrinciple?: (principle: Partial<WorkPrincipleUI>) => void;
  onDeletePrinciple?: (id: string) => void;
  searchQuery?: string;
}

const renderRoleIcon = (icon: ExperienceIconUI) => {
  switch (icon) {
    case "Terminal":
      return <Terminal size={16} className="text-horizon" />;
    case "GraduationCap":
      return <GraduationCap size={16} className="text-horizon" />;
    case "Code2":
    default:
      return <Code2 size={16} className="text-horizon" />;
  }
};

const renderMilestoneIcon = (icon: MilestoneIconUI) => {
  switch (icon) {
    case "GraduationCap":
      return <GraduationCap size={16} className="text-horizon" />;
    case "Code":
      return <Code size={16} className="text-horizon" />;
    case "Rocket":
    default:
      return <Rocket size={16} className="text-horizon" />;
  }
};

const renderPrincipleIcon = (icon: PrincipleIconUI) => {
  switch (icon) {
    case "MessageSquareCode":
      return <MessageSquareCode size={16} className="text-horizon" />;
    case "RefreshCw":
      return <RefreshCw size={16} className="text-horizon" />;
    case "Lightbulb":
      return <Lightbulb size={16} className="text-horizon" />;
    case "Brain":
    default:
      return <Brain size={16} className="text-horizon" />;
  }
};

export default function DashboardExperienceTab({
  initialItems = [],
  initialMilestones = [],
  initialPrinciples = [],
  onAdd,
  onUpdate,
  onDelete,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
  onAddPrinciple,
  onUpdatePrinciple,
  onDeletePrinciple,
  searchQuery: initialSearch = "",
}: DashboardExperienceTabProps) {
  const [items, setItems] = useState<ExperienceItemUI[]>(initialItems);
  const [milestones, setMilestones] =
    useState<ExperienceMilestoneUI[]>(initialMilestones);
  const [principles, setPrinciples] =
    useState<WorkPrincipleUI[]>(initialPrinciples);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [roleModalState, setRoleModalState] = useState<{
    isOpen: boolean;
    item: ExperienceItemUI | null;
  }>({ isOpen: false, item: null });

  const [milestoneModalState, setMilestoneModalState] = useState<{
    isOpen: boolean;
    item: ExperienceMilestoneUI | null;
  }>({ isOpen: false, item: null });

  const [principleModalState, setPrincipleModalState] = useState<{
    isOpen: boolean;
    item: WorkPrincipleUI | null;
  }>({ isOpen: false, item: null });

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
    type: "role" | "milestone" | "principle";
  } | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveRole = (itemData: Partial<ExperienceItemUI>) => {
    if (roleModalState.item) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === roleModalState.item?.id
            ? ({ ...i, ...itemData } as ExperienceItemUI)
            : i
        )
      );
      onUpdate?.(itemData);
    } else {
      const newItem: ExperienceItemUI = {
        id: `e-${Date.now()}`,
        role: itemData.role || "",
        company: itemData.company || "",
        period: itemData.period || "",
        icon: itemData.icon || "Code2",
        details: itemData.details || "",
        skills: itemData.skills || [],
      };
      setItems((prev) => [newItem, ...prev]);
      onAdd?.(newItem);
    }
  };

  const handleSaveMilestone = (
    milestoneData: Partial<ExperienceMilestoneUI>
  ) => {
    if (milestoneModalState.item) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneModalState.item?.id
            ? ({ ...m, ...milestoneData } as ExperienceMilestoneUI)
            : m
        )
      );
      onUpdateMilestone?.(milestoneData);
    } else {
      const newMilestone: ExperienceMilestoneUI = {
        id: `m-${Date.now()}`,
        year: milestoneData.year || "",
        title: milestoneData.title || "",
        organization: milestoneData.organization || "",
        summary: milestoneData.summary || "",
        icon: milestoneData.icon || "Rocket",
      };
      setMilestones((prev) => [...prev, newMilestone]);
      onAddMilestone?.(newMilestone);
    }
  };

  const handleSavePrinciple = (principleData: Partial<WorkPrincipleUI>) => {
    if (principleModalState.item) {
      setPrinciples((prev) =>
        prev.map((p) =>
          p.id === principleModalState.item?.id
            ? ({ ...p, ...principleData } as WorkPrincipleUI)
            : p
        )
      );
      onUpdatePrinciple?.(principleData);
    } else {
      const newPrinciple: WorkPrincipleUI = {
        id: `pr-${Date.now()}`,
        title: principleData.title || "",
        tagline: principleData.tagline || "",
        description: principleData.description || "",
        actionableHabit: principleData.actionableHabit || "",
        icon: principleData.icon || "Brain",
      };
      setPrinciples((prev) => [...prev, newPrinciple]);
      onAddPrinciple?.(newPrinciple);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "role") {
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      onDelete?.(deleteTarget.id);
    } else if (deleteTarget.type === "milestone") {
      setMilestones((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      onDeleteMilestone?.(deleteTarget.id);
    } else {
      setPrinciples((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      onDeletePrinciple?.(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
              Career & Experience
            </h2>
            <p className="text-xs sm:text-sm text-ocean">
              Manage your work history, engineering positions, and responsibilities
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DashboardSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter roles..."
            />
            <button
              type="button"
              onClick={() => setRoleModalState({ isOpen: true, item: null })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
            >
              <Plus size={16} />
              <span>Add Career Role</span>
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <DashboardEmptyState
            title="No career entries found"
            description="Create your first role in the career experience timeline"
            actionLabel="Add Career Role"
            onAction={() => setRoleModalState({ isOpen: true, item: null })}
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <DashboardCard
                key={item.id}
                title={item.role}
                subtitle={item.company}
                badge={item.period}
                onEdit={() => setRoleModalState({ isOpen: true, item })}
                onDelete={() =>
                  setDeleteTarget({
                    id: item.id,
                    title: item.role,
                    type: "role",
                  })
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-ocean">
                    {renderRoleIcon(item.icon)}
                    <span>Icon: {item.icon}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-ocean leading-relaxed">
                    {item.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sand/60 dark:bg-sand/40 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/15"
                      >
                        {skill}
                      </span>
                    ))}
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
              Career Milestones
            </h3>
            <p className="text-xs sm:text-sm text-ocean">
              Key professional breakthroughs, awards, and educational milestones
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setMilestoneModalState({ isOpen: true, item: null })
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add Milestone</span>
          </button>
        </div>

        {milestones.length === 0 ? (
          <DashboardEmptyState
            title="No career milestones found"
            description="Add graduation, major career jumps, and leadership achievements"
            actionLabel="Add Milestone"
            onAction={() =>
              setMilestoneModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {milestones.map((m) => (
              <DashboardCard
                key={m.id}
                title={m.title}
                subtitle={m.organization}
                badge={m.year}
                onEdit={() =>
                  setMilestoneModalState({ isOpen: true, item: m })
                }
                onDelete={() =>
                  setDeleteTarget({
                    id: m.id,
                    title: m.title,
                    type: "milestone",
                  })
                }
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-ocean">
                    {renderMilestoneIcon(m.icon)}
                    <span>{m.icon}</span>
                  </div>
                  <p className="text-xs text-ocean leading-relaxed">
                    {m.summary}
                  </p>
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
              Work Principles & Values
            </h3>
            <p className="text-xs sm:text-sm text-ocean">
              Philosophies and actionable habits governing your daily engineering work
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setPrincipleModalState({ isOpen: true, item: null })
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add Principle</span>
          </button>
        </div>

        {principles.length === 0 ? (
          <DashboardEmptyState
            title="No work principles found"
            description="Document your core philosophies and actionable engineering habits"
            actionLabel="Add Principle"
            onAction={() =>
              setPrincipleModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {principles.map((p) => (
              <DashboardCard
                key={p.id}
                title={p.title}
                subtitle={`"${p.tagline}"`}
                onEdit={() =>
                  setPrincipleModalState({ isOpen: true, item: p })
                }
                onDelete={() =>
                  setDeleteTarget({
                    id: p.id,
                    title: p.title,
                    type: "principle",
                  })
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-ocean">
                    {renderPrincipleIcon(p.icon)}
                    <span>{p.icon}</span>
                  </div>

                  <p className="text-xs text-ocean leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-2 border-t border-deep-ocean/10 dark:border-horizon/10">
                    <span className="text-[11px] font-semibold text-horizon">
                      Habit: {p.actionableHabit}
                    </span>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <ExperienceModal
        isOpen={roleModalState.isOpen}
        item={roleModalState.item}
        onClose={() => setRoleModalState({ isOpen: false, item: null })}
        onSave={handleSaveRole}
      />

      <MilestoneModal
        isOpen={milestoneModalState.isOpen}
        item={milestoneModalState.item}
        onClose={() =>
          setMilestoneModalState({ isOpen: false, item: null })
        }
        onSave={handleSaveMilestone}
      />

      <WorkPrincipleModal
        isOpen={principleModalState.isOpen}
        item={principleModalState.item}
        onClose={() =>
          setPrincipleModalState({ isOpen: false, item: null })
        }
        onSave={handleSavePrinciple}
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
