"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  error?: string | null;
  children: ReactNode;
  maxWidthClassName?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AdminModal({
  isOpen,
  onClose,
  title,
  error,
  children,
  maxWidthClassName = "max-w-md",
}: AdminModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const firstInput = dialog.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])'
      );
      if (firstInput) {
        firstInput.focus();
      } else {
        const focusable = dialog.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR,
        );
        (focusable[0] ?? dialog).focus();
      }
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            tabIndex={-1}
            className={`relative z-10 flex max-h-[90vh] w-full ${maxWidthClassName} flex-col gap-5 overflow-y-auto rounded-md border border-deep-ocean/15 bg-warm p-6 shadow-2xl dark:border-horizon/20 dark:bg-polaroid sm:p-7`}
          >
            <div className="flex items-center justify-between border-b border-deep-ocean/10 pb-3 dark:border-horizon/15">
              <h3
                id="admin-modal-title"
                className="font-display text-lg font-bold text-deep-ocean"
              >
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-md p-1 text-ocean hover:text-deep-ocean"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-md border border-red-500/20 bg-red-500/10 p-2.5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { AdminModal };
