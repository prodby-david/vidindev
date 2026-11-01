"use client";

import { useState } from "react";
import axios from "axios";
import { api } from "@/shared/lib/axios";
import { StorageEntity } from "../validator/storage.schema";
import { compressImageFile } from "../utils/image-compression";

export function useImageUpload(entity: StorageEntity) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const processedFile = await compressImageFile(file);

      const { data } = await api.post<{ uploadUrl: string; publicUrl: string }>(
        "/api/storage/presign",
        {
          entity,
          fileName: processedFile.name,
          fileType: processedFile.type,
          fileSize: processedFile.size,
        }
      );

      await axios.put(data.uploadUrl, processedFile, {
        headers: { "Content-Type": processedFile.type },
      });

      return data.publicUrl;
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.errors ||
          err.response?.data?.message ||
          "Upload failed"
        : "Upload failed";
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, error };
}
