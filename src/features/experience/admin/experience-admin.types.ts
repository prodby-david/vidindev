export type ExperienceIconUI = "Code2" | "Terminal" | "GraduationCap";

export interface ExperienceItemUI {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string;
  skills: string[];
  icon?: ExperienceIconUI;
}

export interface ExperienceAdminTabProps {
  initialItems?: ExperienceItemUI[];
  onAdd?: (item: Partial<ExperienceItemUI>) => void;
  onUpdate?: (item: Partial<ExperienceItemUI>) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
}

export interface ExperienceModalProps {
  isOpen: boolean;
  item?: ExperienceItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<ExperienceItemUI>) => Promise<void> | void;
}
