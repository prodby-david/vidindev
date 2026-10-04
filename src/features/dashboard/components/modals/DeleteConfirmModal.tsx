"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemTitle?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  itemTitle,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 flex flex-col gap-4 text-center items-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-ocean hover:text-deep-ocean cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-3 rounded-full bg-red-500/10 text-red-500">
          <AlertTriangle size={28} />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            Confirm Removal
          </h3>
          <p className="text-xs sm:text-sm text-ocean leading-relaxed">
            Are you sure you want to delete{" "}
            {itemTitle ? <strong className="text-deep-ocean font-semibold">"{itemTitle}"</strong> : "this item"}? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2.5 pt-2 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-full text-xs font-semibold text-ocean hover:text-deep-ocean border border-deep-ocean/15 dark:border-horizon/20 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 rounded-full text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
