import { useState, useRef, useEffect } from "react";
import { CertificationItemUI } from "../../about-admin.types";
import {
  certificationSchema,
  CertificationType,
} from "../../../validator/certification.schema";
import { useImageUpload } from "@/features/storage/hooks/useImageUpload";

export function useCertificationModalForm(
  item: CertificationItemUI | null | undefined,
  onSave: (item: Partial<CertificationItemUI>) => Promise<void> | void,
  onClose: () => void,
) {
  const [title, setTitle] = useState(item?.title || "");
  const [institution, setInstitution] = useState(item?.institution || "");
  const [period, setPeriod] = useState(item?.period || "");
  const [type, setType] = useState<CertificationType>(item?.type || "certification");
  const [credentialId, setCredentialId] = useState(item?.credentialId || "");
  const [verificationUrl, setVerificationUrl] = useState(
    item?.verificationUrl || "",
  );
  const [credentialImage, setCredentialImage] = useState(
    item?.credentialImage || "",
  );
  const [details, setDetails] = useState(item?.details || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadFile,
    isUploading,
    error: uploadError,
  } = useImageUpload("certifications");

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;

    const publicUrl = await uploadFile(selectedFile);
    if (publicUrl) {
      setCredentialImage(publicUrl);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isUploading || isSubmitting) return;

    let finalCredentialImage = credentialImage;

    if (selectedFile) {
      const publicUrl = await uploadFile(selectedFile);
      if (!publicUrl) return;
      finalCredentialImage = publicUrl;
      setCredentialImage(publicUrl);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setSelectedFile(null);
    }

    const result = certificationSchema.safeParse({
      id: item?.id,
      title,
      institution,
      period,
      type,
      credentialId: credentialId.trim() || null,
      credentialImage: finalCredentialImage,
      verificationUrl: verificationUrl.trim() || null,
      details,
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
        error instanceof Error
          ? error.message
          : "Failed to save certification.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    institution,
    period,
    type,
    credentialId,
    verificationUrl,
    credentialImage,
    details,
    selectedFile,
    previewUrl,
    displayImage: previewUrl || credentialImage,
    error: error || uploadError,
    isSubmitting,
    setError,
    isUploading,
    fileInputRef,
    setTitle,
    setInstitution,
    setPeriod,
    setType,
    setCredentialId,
    setVerificationUrl,
    setCredentialImage,
    setDetails,
    handleFileChange,
    handleUploadFile,
    handleClose,
    handleSubmit,
  };
}
