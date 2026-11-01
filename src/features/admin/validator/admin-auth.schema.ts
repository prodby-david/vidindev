import { z } from "zod";

export const adminLoginSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .max(256, "Password is too long"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
