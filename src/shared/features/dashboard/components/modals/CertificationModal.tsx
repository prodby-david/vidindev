"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CertificationItemUI } from "../../dashboard.types";

interface CertificationModalProps {
  isOpen: boolean;
  item?: CertificationItemUI | null;
  onClose: () => void;
  onSave: (item: Partial<CertificationItemUI>) => void;
}

export default function CertificationModal({
  isOpen,
  item,
  onClose,
  onSave,
}: CertificationModalProps) {
  const [title, setTitle] = useState(item?.title || "");
  const [institution, setInstitution] = useState(item?.institution || "");
  const [period, setPeriod] = useState(item?.period || "");
  const [type, setType] = useState<"degree" | "certification">(
    item?.type || "certification"
  );
  const [credentialId, setCredentialId] = useState(item?.credentialId || "");
  const [verificationUrl, setVerificationUrl] = useState(
    item?.verificationUrl || ""
  );
  const [credentialImage, setCredentialImage] = useState(
    item?.credentialImage || ""
  );
  const [details, setDetails] = useState(item?.details || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id,
      title,
      institution,
      period,
      type,
      credentialId,
      verificationUrl: verificationUrl.trim() || undefined,
      credentialImage,
      details,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Certification" : "Add Certification"}
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
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AWS Certified Developer - Associate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Issuing Institution
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amazon Web Services"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Year / Period
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2026"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Type
              </label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "degree" | "certification")
                }
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean focus:outline-none focus:border-horizon"
              >
                <option value="certification">Certification</option>
                <option value="degree">Degree / Diploma</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Credential ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AWS-CERT-2026-001"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Credential Image Path
              </label>
              <input
                type="text"
                required
                placeholder="/images/cert.jpg"
                value={credentialImage}
                onChange={(e) => setCredentialImage(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ocean uppercase tracking-wider">
                Verification URL (optional)
              </label>
              <input
                type="text"
                placeholder="https://credly.com/..."
                value={verificationUrl}
                onChange={(e) => setVerificationUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Description & Highlights
            </label>
            <textarea
              rows={3}
              required
              placeholder="Key skills demonstrated, architectural concepts covered..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon resize-none"
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
              {item ? "Update Certification" : "Save Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
