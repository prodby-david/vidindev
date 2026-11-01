"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Smartphone } from "lucide-react";
import QRCode from "qrcode";
import { CALENDLY_CONFIG } from "../../constants/calendly.constant";

interface CalendlyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyBookingModal({
  isOpen,
  onClose,
}: CalendlyBookingModalProps) {
  const [qrSvg, setQrSvg] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    QRCode.toString(CALENDLY_CONFIG.url, {
      type: "svg",
      margin: 1,
      color: {
        dark: "#164c63",
        light: "#ffffff",
      },
    })
      .then((svg) => {
        if (isMounted) setQrSvg(svg);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative w-full max-w-5xl bg-polaroid dark:bg-[#132030] rounded-md shadow-2xl border border-deep-ocean/15 dark:border-horizon/20 flex flex-col overflow-hidden max-h-[92vh]"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-deep-ocean/10 dark:border-horizon/15 bg-warm/50 dark:bg-sand/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-mint/30 dark:bg-mint/15 text-deep-ocean">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3
                    id="booking-modal-title"
                    className="text-base sm:text-lg font-bold font-display text-deep-ocean tracking-tight"
                  >
                    {CALENDLY_CONFIG.title}
                  </h3>
                  <p className="text-xs text-ocean hidden sm:block">
                    {CALENDLY_CONFIG.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={CALENDLY_CONFIG.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ocean dark:text-horizon hover:text-deep-ocean dark:hover:text-mint rounded-md transition-colors"
                >
                  <span className="hidden sm:inline">Open in Tab</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close booking modal"
                  className="p-1.5 rounded-md text-ocean hover:text-deep-ocean hover:bg-deep-ocean/10 dark:hover:bg-horizon/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              <div className="w-full lg:w-2/3 h-[520px] sm:h-[580px] bg-white">
                <iframe
                  src={`${CALENDLY_CONFIG.url}?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
                  width="100%"
                  height="100%"
                  title="Schedule a Call"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="hidden lg:flex lg:w-1/3 flex-col items-center justify-center p-6 border-l border-deep-ocean/10 dark:border-horizon/15 bg-sand/20 dark:bg-sand/30 text-center gap-4">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-ocean uppercase">
                  <Smartphone size={14} />
                  <span>Scan to Book on Mobile</span>
                </div>

                <div className="p-3 bg-white rounded-md shadow-md border border-deep-ocean/10 w-48 h-48 flex items-center justify-center">
                  {qrSvg ? (
                    <div
                      className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                  ) : (
                    <div className="w-full h-full bg-sand/30 animate-pulse rounded" />
                  )}
                </div>

                <p className="text-xs text-ocean leading-relaxed max-w-xs">
                  Scan this code with your phone camera to pick a time and sync
                  the meeting directly with your mobile calendar.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
