import { z } from "zod";

export const gearCategories = [
  "HARDWARE",
  "CODE_TERMINAL",
  "DESIGN_PROTOTYPE",
  "WORKFLOW",
] as const;

export const gearCategoryValueSchema = z.enum(gearCategories);

export const GEAR_CATEGORY_LABELS: Record<
  (typeof gearCategories)[number],
  string
> = {
  HARDWARE: "Hardware Setup",
  CODE_TERMINAL: "Code & Terminal",
  DESIGN_PROTOTYPE: "Design & Prototyping",
  WORKFLOW: "Workflow & Collaboration",
};

export const gearCategoryInputSchema = z.object({
  id: z.string().optional(),
  category: gearCategoryValueSchema,
  items: z
    .array(z.string().min(1))
    .min(1, "At least one tool or gear item is required"),
});

export const createGearCategorySchema = gearCategoryInputSchema.omit({
  id: true,
});
export const updateGearCategorySchema = createGearCategorySchema.partial();

export interface GearCategory {
  id: string;
  category: string;
  items: string[];
}
export type GearCategoryValue = z.infer<typeof gearCategoryValueSchema>;
export type GearCategoryInput = z.infer<typeof gearCategoryInputSchema>;
export type CreateGearCategoryInput = z.infer<
  typeof createGearCategorySchema
>;
export type UpdateGearCategoryInput = z.infer<
  typeof updateGearCategorySchema
>;

export const GEAR_CATEGORY_OPTIONS = gearCategories.map((value) => ({
  value,
  label: GEAR_CATEGORY_LABELS[value],
}));
