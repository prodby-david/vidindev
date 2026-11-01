import { STACK_CATEGORY_LABELS, StackCategory } from "../../validator/skills.schema";
import { FilterTabOption } from "@/shared/components/admin/DashboardFilterTabs";
import { SelectOption } from "@/shared/components/ui/Select";

export type SkillCategoryTabId = "ALL" | StackCategory;

export const CATEGORY_TABS: Array<FilterTabOption<SkillCategoryTabId>> = [
  { id: "ALL", label: "All Stacks" },
  { id: "FRONTEND", label: "Frontend" },
  { id: "BACKEND", label: "Backend" },
  { id: "DATABASE", label: "Database" },
  { id: "DEVOPS", label: "Cloud & DevOps" },
  { id: "DEVTOOLS", label: "AI & Dev Tools" },
];

export const SKILL_CATEGORIES: StackCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "DEVTOOLS",
];

export const SKILL_FORM_CATEGORIES = SKILL_CATEGORIES;

export const SKILL_CATEGORY_OPTIONS: SelectOption[] = SKILL_CATEGORIES.map(
  (cat) => ({
    value: cat,
    label: STACK_CATEGORY_LABELS[cat],
  })
);

