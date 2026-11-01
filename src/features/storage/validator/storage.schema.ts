import { z } from "zod";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "../constants/storage.constant";

export const presignUploadSchema = z.object({
  entity: z.enum(["certifications", "projects", "snapshots"]),
  fileName: z.string().min(1).max(160),
  fileType: z.enum(ALLOWED_IMAGE_TYPES),
  fileSize: z.number().positive().max(MAX_FILE_SIZE_BYTES),
});

export type PresignUploadInput = z.infer<typeof presignUploadSchema>;
export type StorageEntity = PresignUploadInput["entity"];
