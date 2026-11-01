import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "DEVTOOLS"]),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;

export type StackCategory = "FRONTEND" | "BACKEND" | "DATABASE" | "DEVOPS" | "DEVTOOLS";

export const STACK_CATEGORY_LABELS: Record<StackCategory, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Database",
  DEVOPS: "Cloud & DevOps",
  DEVTOOLS: "AI & Dev Tools",
};

export interface StackItem {
  id: string;
  name: string;
  category: StackCategory;
  createdAt: string;
  updatedAt: string;
}
