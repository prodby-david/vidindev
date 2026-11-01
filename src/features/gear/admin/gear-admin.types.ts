import type { GearCategoryValue } from "../validator/gear.schema";

export interface GearCategoryUI {
  id: string;
  category: GearCategoryValue;
  items: string[];
}

export interface GearAdminTabProps {
  initialCategories?: GearCategoryUI[];
  searchQuery?: string;
}

export interface GearModalProps {
  isOpen: boolean;
  item?: GearCategoryUI | null;
  onClose: () => void;
  onSave: (item: Partial<GearCategoryUI>) => Promise<void> | void;
}
