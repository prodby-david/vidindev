export interface ProjectItemUI {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageSrc: string;
}

export interface ProjectsAdminTabProps {
  initialItems?: ProjectItemUI[];
  onAdd?: (item: Partial<ProjectItemUI>) => void;
  onUpdate?: (item: Partial<ProjectItemUI>) => void;
  onDelete?: (id: string) => void;
  searchQuery?: string;
}

export interface ProjectModalProps {
  isOpen: boolean;
  item?: ProjectItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<ProjectItemUI>) => Promise<void> | void;
}

