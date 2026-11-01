import { z } from "zod";

export const experienceIconSchema = z.enum(["Code2", "Terminal", "GraduationCap"]);

export const experienceSchema = z.object({
  id: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  period: z.string().min(1, "Employment period is required"),
  details: z.string().min(1, "Responsibilities details are required"),
  skills: z.array(z.string().min(1)).default([]),
  icon: experienceIconSchema.optional(),
});

export const createExperienceSchema = experienceSchema.omit({ id: true });
export const updateExperienceSchema = createExperienceSchema.partial();

export type ExperienceIconType = z.infer<typeof experienceIconSchema>;
export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  details: string;
  skills: string[];
  icon: ExperienceIconType;
}
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;

