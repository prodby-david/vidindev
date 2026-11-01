import { z } from "zod";

export const CONTACT_SUBJECT_OPTIONS = [
  "PROJECT_COLLABORATION",
  "JOB_OPPORTUNITY",
  "TECHNICAL_CONSULTATION",
  "GENERAL_INQUIRY",
  "OTHER",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECT_OPTIONS)[number];

export const CONTACT_SUBJECT_LABELS: Record<ContactSubject, string> = {
  PROJECT_COLLABORATION: "Project collaboration",
  JOB_OPPORTUNITY: "Job opportunity",
  TECHNICAL_CONSULTATION: "Technical consultation",
  GENERAL_INQUIRY: "General inquiry",
  OTHER: "Other",
};

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().max(30).optional(),
  subject: z.enum(CONTACT_SUBJECT_OPTIONS),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
