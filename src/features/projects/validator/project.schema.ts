import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  number: z.string().min(1, "Project number is required"),
  title: z.string().min(1, "Project title is required").max(100),
  description: z.string().min(1, "Project description is required").max(500),
  tags: z
    .array(z.string().min(1))
    .min(1, "At least one technology tag is required"),
  link: z
    .string()
    .trim()
    .min(1, "Project link is required")
    .refine(
      (url) => url === "#" || /^https?:\/\//i.test(url),
      "Project link must be an HTTP/HTTPS URL or '#'",
    ),
  imageSrc: z.string().min(1, "Project image path is required"),
});

export const createProjectSchema = projectSchema.omit({ id: true });
export const updateProjectSchema = createProjectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
