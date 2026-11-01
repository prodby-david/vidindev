import { CreateSkillInput, StackCategory, StackItem } from "../validator/skills.schema";

export interface SkillCategoryGroup {
  category: StackCategory;
  title: string;
  items: StackItem[];
}

export interface SkillsAdminTabProps {
  initialSkills?: StackItem[];
}

export interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateSkillInput) => Promise<void>;
}
