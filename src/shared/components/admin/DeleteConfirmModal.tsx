"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { getApiErrorMessage } from "@/shared/lib/api-error";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemTitle?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteConfirmModal({
  isOpen,
  itemTitle,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) {
        setError(null);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(
      () => cancelButtonRef.current?.focus(),
      0,
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, isDeleting, onClose]);

  async function handleConfirm() {
    try {
      setIsDeleting(true);
      setError(null);
      await onConfirm();
      setError(null);
      onClose();
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to delete this item."));
    } finally {
      setIsDeleting(false);
    }
  }

  function handleClose() {
    if (isDeleting) return;
    setError(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => {
              if (!isDeleting) handleClose();
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
            className="relative z-10 flex w-full max-w-sm flex-col items-center gap-4 rounded-md border border-deep-ocean/15 bg-warm p-6 text-center shadow-2xl dark:border-horizon/20 dark:bg-polaroid"
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={isDeleting}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-md p-1 text-ocean hover:text-deep-ocean disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="rounded-md bg-red-500/10 p-3 text-red-500">
              <AlertTriangle size={28} />
            </div>

            <div className="flex flex-col gap-1">
              <h3
                id="delete-modal-title"
                className="font-display text-lg font-bold text-deep-ocean"
              >
                Confirm Removal
              </h3>
              <p
                id="delete-modal-description"
                className="text-xs leading-relaxed text-ocean sm:text-sm"
              >
                Are you sure you want to delete{" "}
                {itemTitle ? (
                  <strong className="font-semibold text-deep-ocean">
                    &quot;{itemTitle}&quot;
                  </strong>
                ) : (
                  "this item"
                )}
                ? This action cannot be undone.
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="w-full rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            )}

            <div className="flex w-full items-center justify-center gap-2.5 pt-2">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={handleClose}
                disabled={isDeleting}
                className="flex-1 rounded-md border border-deep-ocean/15 px-4 py-2 text-xs font-semibold text-ocean hover:text-deep-ocean disabled:opacity-50 dark:border-horizon/20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting && <Loader2 size={13} className="animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
