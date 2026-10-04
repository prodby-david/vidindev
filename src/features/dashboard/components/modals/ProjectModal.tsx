"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ProjectItemUI } from "../../dashboard.types";

interface ProjectModalProps {
  isOpen: boolean;
  item?: ProjectItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<ProjectItemUI>) => void;
}

export default function ProjectModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ProjectModalProps) {
  const [number, setNumber] = useState(item?.number || "01");
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [tagsText, setTagsText] = useState(item?.tags.join(", ") || "");
  const [link, setLink] = useState(item?.link || "https://github.com");
  const [imageSrc, setImageSrc] = useState(item?.imageSrc || "/images/mis.jpg");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      id: item?.id,
      number,
      title,
      description,
      tags,
      link,
      imageSrc,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Project" : "Add Project"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-ocean hover:text-deep-ocean cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-1">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Number
              </label>
              <input
                type="text"
                required
                placeholder="01"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-3">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Project Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Scalable SaaS Engine"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="High-level overview of the problem, solution, architecture..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Tech Stack Tags (comma separated)
            </label>
            <input
              type="text"
              required
              placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Project URL / GitHub Link
              </label>
              <input
                type="text"
                required
                placeholder="https://github.com/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Hero Image Path
              </label>
              <input
                type="text"
                required
                placeholder="/images/project.jpg"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-deep-ocean/10 dark:border-horizon/15">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-ocean hover:text-deep-ocean cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm"
            >
              {item ? "Update Project" : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
