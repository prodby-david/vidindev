import { z } from "zod";

export const certificationTypes = ["degree", "certification"] as const;
export const certificationTypeSchema = z.enum(certificationTypes);

export const certificationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  institution: z.string().min(1, "Institution is required"),
  period: z.string().min(1, "Period is required"),
  details: z.string().min(1, "Details are required"),
  type: certificationTypeSchema.default("certification"),
  credentialImage: z.string().min(1, "Credential image is required"),
  credentialId: z.string().nullable().optional(),
  verificationUrl: z
    .string()
    .url("Must be a valid web link")
    .refine((url) => /^https?:\/\//i.test(url), "Must be an HTTP/HTTPS URL")
    .nullable()
    .optional(),
});

export const createCertificationSchema = certificationSchema.omit({ id: true });
export const updateCertificationSchema = createCertificationSchema.partial();

export type CertificationInput = z.infer<typeof certificationSchema>;
export type CertificationType = z.infer<typeof certificationTypeSchema>;
export type CreateCertificationInput = z.infer<typeof createCertificationSchema>;
export type UpdateCertificationInput = z.infer<typeof updateCertificationSchema>;
