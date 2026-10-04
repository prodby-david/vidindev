"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SocialItemUI } from "../../dashboard.types";

interface SocialModalProps {
  isOpen: boolean;
  item?: SocialItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<SocialItemUI>) => void;
}

export default function SocialModal({
  isOpen,
  item,
  onClose,
  onSave,
}: SocialModalProps) {
  const [name, setName] = useState(item?.name || "");
  const [handle, setHandle] = useState(item?.handle || "");
  const [url, setUrl] = useState(item?.url || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id,
      name,
      handle,
      url,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Social Channel" : "Add Social Channel"}
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
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Platform Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. GitHub, LinkedIn, X"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Profile Handle / Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. @prodby-david"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Profile URL
            </label>
            <input
              type="text"
              required
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
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
              {item ? "Update Channel" : "Save Channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
