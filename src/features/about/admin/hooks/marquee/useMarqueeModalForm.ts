import { useState, useRef, useEffect } from "react";
import { MarqueeItemUI } from "../../about-admin.types";
import { marqueeSchema } from "../../../validator/marquee.schema";
import { useImageUpload } from "@/features/storage/hooks/useImageUpload";

export function useMarqueeModalForm(
  item: MarqueeItemUI | null | undefined,
  onSave: (item: Partial<MarqueeItemUI>) => Promise<void> | void,
  onClose: () => void
) {
  const [src, setSrc] = useState(item?.src || "");
  const [caption, setCaption] = useState(item?.caption || "");
  const [alt, setAlt] = useState(item?.alt || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadFile,
    isUploading,
    error: uploadError,
  } = useImageUpload("snapshots");

  // Clean up object URL when unmounting
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError(null);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;

    const publicUrl = await uploadFile(selectedFile);
    if (publicUrl) {
      setSrc(publicUrl);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
      setError(null);
    }
  };

  const handleClose = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;

    let finalSrc = src;

    // Trigger presign and upload only upon button click
    if (selectedFile) {
      const publicUrl = await uploadFile(selectedFile);
      if (!publicUrl) {
        return;
      }
      finalSrc = publicUrl;
      setSrc(publicUrl);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
    }

    const result = marqueeSchema.safeParse({
      id: item?.id,
      src: finalSrc,
      caption,
      alt: alt || caption,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Validation failed");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({ ...result.data, id: item?.id });
      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save snapshot.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    src,
    setSrc,
    caption,
    setCaption,
    alt,
    setAlt,
    selectedFile,
    previewUrl,
    displayImage: previewUrl || src,
    error: error || uploadError,
    setError,
    isUploading,
    isSubmitting,
    fileInputRef,
    handleFileChange,
    handleUploadFile,
    handleClose,
    handleSubmit,
  };
}
