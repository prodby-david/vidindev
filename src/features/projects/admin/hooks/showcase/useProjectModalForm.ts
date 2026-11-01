import { useState, useRef, useEffect } from "react";
import { ProjectItemUI } from "../../projects-admin.types";
import { projectSchema } from "../../../validator/project.schema";
import { useImageUpload } from "@/features/storage/hooks/useImageUpload";

export function useProjectModalForm(
  item: ProjectItemUI | null | undefined,
  onSave: (item: Partial<ProjectItemUI>) => Promise<void> | void,
  onClose: () => void
) {
  const [number, setNumber] = useState(item?.number || "01");
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [tagsText, setTagsText] = useState(item?.tags?.join(", ") || "");
  const [link, setLink] = useState(item?.link || "");
  const [imageSrc, setImageSrc] = useState(item?.imageSrc || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadFile,
    isUploading,
    error: uploadError,
  } = useImageUpload("projects");

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
      setImageSrc(publicUrl);
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

    let finalImageSrc = imageSrc;

    // Trigger presign and upload only upon button click
    if (selectedFile) {
      const publicUrl = await uploadFile(selectedFile);
      if (!publicUrl) {
        return;
      }
      finalImageSrc = publicUrl;
      setImageSrc(publicUrl);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
    }

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const result = projectSchema.safeParse({
      id: item?.id,
      number,
      title,
      description,
      tags,
      link,
      imageSrc: finalImageSrc,
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
        error instanceof Error ? error.message : "Failed to save project.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    number,
    setNumber,
    title,
    setTitle,
    description,
    setDescription,
    tagsText,
    setTagsText,
    link,
    setLink,
    imageSrc,
    setImageSrc,
    selectedFile,
    previewUrl,
    displayImage: previewUrl || imageSrc,
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
