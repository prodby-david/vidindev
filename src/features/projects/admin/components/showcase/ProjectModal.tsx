"use client";

import Image from "next/image";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { ProjectModalProps } from "../../projects-admin.types";
import { useProjectModalForm } from "../../hooks/showcase/useProjectModalForm";
import { AdminModal } from "@/shared/components/admin";
import { Input, Textarea } from "@/shared/components/ui";

export default function ProjectModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ProjectModalProps) {
  const {
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
    displayImage,
    error,
    isUploading,
    isSubmitting,
    fileInputRef,
    handleFileChange,
    handleUploadFile,
    handleClose,
    handleSubmit,
  } = useProjectModalForm(item, onSave, onClose);

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={handleClose}
      title={item ? "Edit Project" : "Add Project"}
      error={error}
      maxWidthClassName="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-1">
            <Input
              label="Number"
              type="text"
              required
              maxLength={4}
              placeholder="01"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="font-mono text-center"
            />
          </div>

          <div className="sm:col-span-3">
            <Input
              label="Title"
              type="text"
              required
              placeholder="e.g. Real-Time Chat System"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <Textarea
          label="Description"
          rows={3}
          required
          placeholder="High-level engineering overview of the project..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Tags (comma-separated)"
          type="text"
          required
          placeholder="Next.js, TypeScript, Tailwind CSS"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
        />

        <Input
          label="Project / GitHub URL"
          type="text"
          required
          placeholder="https://github.com/..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-ocean uppercase tracking-wider">
            Hero Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />

          {displayImage ? (
            <div className="relative w-full aspect-video rounded-md border border-deep-ocean/15 dark:border-horizon/20 overflow-hidden bg-sand/30 flex items-center justify-center group">
              <Image
                src={displayImage}
                alt={title || "Project preview"}
                fill
                unoptimized={Boolean(previewUrl?.startsWith("blob:"))}
                className="object-cover"
              />
              {isUploading ? (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 text-white text-xs font-medium">
                  <Loader2 size={24} className="animate-spin text-white" />
                  <span>Uploading project image...</span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-md bg-white/95 hover:bg-white text-deep-ocean text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Upload size={14} />
                    <span>Change Image</span>
                  </button>
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={handleUploadFile}
                      className="px-3 py-1.5 rounded-md bg-horizon hover:bg-ocean text-white text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <Upload size={14} />
                      <span>Upload Now</span>
                    </button>
                  )}
                </div>
              )}
              {selectedFile && !isUploading && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-horizon text-white text-[10px] font-semibold tracking-wide shadow-sm">
                  Ready to upload on save
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full h-32 rounded-md border border-dashed border-deep-ocean/20 dark:border-horizon/30 hover:border-horizon bg-polaroid dark:bg-sand/20 flex flex-col items-center justify-center gap-2 text-ocean hover:text-deep-ocean cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 text-ocean">
                  <Loader2 size={22} className="animate-spin text-horizon" />
                  <span className="text-xs font-semibold">Uploading to storage...</span>
                </div>
              ) : (
                <>
                  <div className="p-2 rounded-md bg-sand/60 dark:bg-sand/40">
                    <ImageIcon size={20} className="text-horizon" />
                  </div>
                  <span className="text-xs font-semibold">Click to select project cover</span>
                  <span className="text-[10px] text-ocean/70">PNG, JPG, WebP up to 5MB</span>
                </>
              )}
            </button>
          )}

          <Input
            type="text"
            required
            placeholder="/images/project.jpg or storage URL"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            className="text-xs"
            containerClassName="mt-1"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-deep-ocean/10 dark:border-horizon/15">
          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading || isSubmitting}
            className="px-4 py-2 rounded-md text-xs font-semibold text-ocean hover:text-deep-ocean cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading || isSubmitting}
            className="px-5 py-2 rounded-md text-xs font-semibold bg-ocean text-white hover:bg-deep-ocean transition-colors cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-1.5"
          >
            {(isUploading || isSubmitting) && (
              <Loader2 size={14} className="animate-spin" />
            )}
            <span>
              {isUploading
                ? "Uploading & Saving..."
                : isSubmitting
                  ? "Saving..."
                  : item
                    ? "Update Project"
                    : "Save Project"}
            </span>
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
