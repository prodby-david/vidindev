"use client";

import { useState } from "react";
import { X, Mail, MapPin, Clock } from "lucide-react";
import { ContactInfoUI, ContactInfoIconUI } from "../../dashboard.types";

interface ContactInfoModalProps {
  isOpen: boolean;
  item?: ContactInfoUI | null;
  onClose: () => void;
  onSave: (item: Partial<ContactInfoUI>) => void;
}

export default function ContactInfoModal({
  isOpen,
  item,
  onClose,
  onSave,
}: ContactInfoModalProps) {
  const [label, setLabel] = useState(item?.label || "");
  const [value, setValue] = useState(item?.value || "");
  const [href, setHref] = useState(item?.href || "");
  const [icon, setIcon] = useState<ContactInfoIconUI>(item?.icon || "Mail");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: item?.id,
      label,
      value,
      href: href.trim() || undefined,
      icon,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-warm dark:bg-polaroid rounded-md border border-deep-ocean/15 dark:border-horizon/20 shadow-2xl p-6 sm:p-7 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-deep-ocean/10 dark:border-horizon/15">
          <h3 className="text-lg font-bold font-display text-deep-ocean">
            {item ? "Edit Contact Channel" : "Add Contact Channel"}
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
              Channel Label
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Email Address, Location, Response Time"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Displayed Value
            </label>
            <input
              type="text"
              required
              placeholder="e.g. david@example.com, Metro Manila, Within 24 hours"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Icon Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "Mail" as ContactInfoIconUI, label: "Email", Icon: Mail },
                {
                  value: "MapPin" as ContactInfoIconUI,
                  label: "Location",
                  Icon: MapPin,
                },
                {
                  value: "Clock" as ContactInfoIconUI,
                  label: "Timezone",
                  Icon: Clock,
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setIcon(opt.value)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-md border text-xs font-semibold cursor-pointer transition-colors ${
                    icon === opt.value
                      ? "bg-horizon text-white border-horizon"
                      : "bg-polaroid dark:bg-sand/40 text-ocean border-deep-ocean/15 dark:border-horizon/20 hover:text-deep-ocean"
                  }`}
                >
                  <opt.Icon size={14} />
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-ocean uppercase tracking-wider">
              Direct Link URL / mailto: (optional)
            </label>
            <input
              type="text"
              placeholder="mailto:david@example.com"
              value={href}
              onChange={(e) => setHref(e.target.value)}
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
