import { z } from "zod";

export const marqueeSchema = z.object({
  id: z.string().optional(),
  src: z.string().min(1, "Snapshot image is required"),
  caption: z.string().min(1, "Caption is required"),
  alt: z.string().min(1, "Alt text is required"),
});

export const createMarqueeSchema = marqueeSchema.omit({ id: true });
export const updateMarqueeSchema = createMarqueeSchema.partial();

export type MarqueeInput = z.infer<typeof marqueeSchema>;
export type CreateMarqueeInput = z.infer<typeof createMarqueeSchema>;
export type UpdateMarqueeInput = z.infer<typeof updateMarqueeSchema>;
