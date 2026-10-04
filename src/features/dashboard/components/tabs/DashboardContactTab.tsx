"use client";

import { useState } from "react";
import {
  Plus,
  ExternalLink,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  ContactInfoUI,
  ContactInfoIconUI,
  SocialItemUI,
  ContactFaqUI,
} from "../../dashboard.types";
import DashboardCard from "../ui/DashboardCard";
import DashboardEmptyState from "../ui/DashboardEmptyState";
import DashboardSearchInput from "../ui/DashboardSearchInput";
import ContactInfoModal from "../modals/ContactInfoModal";
import SocialModal from "../modals/SocialModal";
import ContactFaqModal from "../modals/ContactFaqModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

interface DashboardContactTabProps {
  initialContactInfo?: ContactInfoUI[];
  initialSocials?: SocialItemUI[];
  initialFaqs?: ContactFaqUI[];
  onAddContactInfo?: (info: Partial<ContactInfoUI>) => void;
  onUpdateContactInfo?: (info: Partial<ContactInfoUI>) => void;
  onDeleteContactInfo?: (id: string) => void;
  onAddSocial?: (social: Partial<SocialItemUI>) => void;
  onUpdateSocial?: (social: Partial<SocialItemUI>) => void;
  onDeleteSocial?: (id: string) => void;
  onAddFaq?: (faq: Partial<ContactFaqUI>) => void;
  onUpdateFaq?: (faq: Partial<ContactFaqUI>) => void;
  onDeleteFaq?: (id: string) => void;
  searchQuery?: string;
}

const renderContactIcon = (icon?: ContactInfoIconUI) => {
  switch (icon) {
    case "MapPin":
      return <MapPin size={16} className="text-horizon" />;
    case "Clock":
      return <Clock size={16} className="text-horizon" />;
    case "Mail":
    default:
      return <Mail size={16} className="text-horizon" />;
  }
};

export default function DashboardContactTab({
  initialContactInfo = [],
  initialSocials = [],
  initialFaqs = [],
  onAddContactInfo,
  onUpdateContactInfo,
  onDeleteContactInfo,
  onAddSocial,
  onUpdateSocial,
  onDeleteSocial,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  searchQuery: initialSearch = "",
}: DashboardContactTabProps) {
  const [contactInfo, setContactInfo] =
    useState<ContactInfoUI[]>(initialContactInfo);
  const [socials, setSocials] = useState<SocialItemUI[]>(initialSocials);
  const [faqs, setFaqs] = useState<ContactFaqUI[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [contactInfoModalState, setContactInfoModalState] = useState<{
    isOpen: boolean;
    item: ContactInfoUI | null;
  }>({ isOpen: false, item: null });

  const [socialModalState, setSocialModalState] = useState<{
    isOpen: boolean;
    item: SocialItemUI | null;
  }>({ isOpen: false, item: null });

  const [faqModalState, setFaqModalState] = useState<{
    isOpen: boolean;
    item: ContactFaqUI | null;
  }>({ isOpen: false, item: null });

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
    type: "contactInfo" | "social" | "faq";
  } | null>(null);

  const filteredSocials = socials.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveContactInfo = (infoData: Partial<ContactInfoUI>) => {
    if (contactInfoModalState.item) {
      setContactInfo((prev) =>
        prev.map((ci) =>
          ci.id === contactInfoModalState.item?.id
            ? ({ ...ci, ...infoData } as ContactInfoUI)
            : ci
        )
      );
      onUpdateContactInfo?.(infoData);
    } else {
      const newInfo: ContactInfoUI = {
        id: `ci-${Date.now()}`,
        label: infoData.label || "",
        value: infoData.value || "",
        href: infoData.href,
        icon: infoData.icon || "Mail",
      };
      setContactInfo((prev) => [...prev, newInfo]);
      onAddContactInfo?.(newInfo);
    }
  };

  const handleSaveSocial = (socialData: Partial<SocialItemUI>) => {
    if (socialModalState.item) {
      setSocials((prev) =>
        prev.map((s) =>
          s.id === socialModalState.item?.id
            ? ({ ...s, ...socialData } as SocialItemUI)
            : s
        )
      );
      onUpdateSocial?.(socialData);
    } else {
      const newSocial: SocialItemUI = {
        id: `soc-${Date.now()}`,
        name: socialData.name || "",
        handle: socialData.handle || "",
        url: socialData.url || "https://example.com",
      };
      setSocials((prev) => [...prev, newSocial]);
      onAddSocial?.(newSocial);
    }
  };

  const handleSaveFaq = (faqData: Partial<ContactFaqUI>) => {
    if (faqModalState.item) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === faqModalState.item?.id
            ? ({ ...f, ...faqData } as ContactFaqUI)
            : f
        )
      );
      onUpdateFaq?.(faqData);
    } else {
      const newFaq: ContactFaqUI = {
        id: `faq-${Date.now()}`,
        question: faqData.question || "",
        answer: faqData.answer || "",
      };
      setFaqs((prev) => [...prev, newFaq]);
      onAddFaq?.(newFaq);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "contactInfo") {
      setContactInfo((prev) =>
        prev.filter((ci) => ci.id !== deleteTarget.id)
      );
      onDeleteContactInfo?.(deleteTarget.id);
    } else if (deleteTarget.type === "social") {
      setSocials((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      onDeleteSocial?.(deleteTarget.id);
    } else {
      setFaqs((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      onDeleteFaq?.(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean">
              Direct Contact Information
            </h2>
            <p className="text-xs sm:text-sm text-ocean">
              Publicly displayed contact channels and availability details
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setContactInfoModalState({ isOpen: true, item: null })
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add Channel</span>
          </button>
        </div>

        {contactInfo.length === 0 ? (
          <DashboardEmptyState
            title="No direct contact channels"
            description="Add your official email, city, timezone, and communication details"
            actionLabel="Add Channel"
            onAction={() =>
              setContactInfoModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactInfo.map((ci) => (
              <div
                key={ci.id}
                className="flex items-center justify-between p-4 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-warm dark:bg-sand/60">
                    {renderContactIcon(ci.icon)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold text-ocean uppercase tracking-wider">
                      {ci.label}
                    </span>
                    <span className="text-sm font-bold text-deep-ocean">
                      {ci.value}
                    </span>
                    {ci.href && (
                      <span className="text-[11px] text-horizon truncate max-w-[180px]">
                        {ci.href}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setContactInfoModalState({ isOpen: true, item: ci })
                    }
                    className="p-1.5 rounded text-ocean hover:text-horizon cursor-pointer"
                    aria-label={`Edit ${ci.label}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget({
                        id: ci.id,
                        title: ci.label,
                        type: "contactInfo",
                      })
                    }
                    className="p-1.5 rounded text-ocean hover:text-red-500 cursor-pointer"
                    aria-label={`Delete ${ci.label}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 pt-6 border-t border-deep-ocean/10 dark:border-horizon/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg sm:text-xl font-bold font-display text-deep-ocean">
              Social Networks & Profiles
            </h3>
            <p className="text-xs sm:text-sm text-ocean">
              Manage your linked developer social accounts and portfolio badges
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DashboardSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter channels..."
            />
            <button
              type="button"
              onClick={() =>
                setSocialModalState({ isOpen: true, item: null })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
            >
              <Plus size={16} />
              <span>Add Social Channel</span>
            </button>
          </div>
        </div>

        {filteredSocials.length === 0 ? (
          <DashboardEmptyState
            title="No social channels found"
            description="Add linked developer social accounts to showcase your public profiles"
            actionLabel="Add Social Channel"
            onAction={() =>
              setSocialModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSocials.map((social) => (
              <DashboardCard
                key={social.id}
                title={social.name}
                subtitle={social.handle}
                onEdit={() =>
                  setSocialModalState({ isOpen: true, item: social })
                }
                onDelete={() =>
                  setDeleteTarget({
                    id: social.id,
                    title: social.name,
                    type: "social",
                  })
                }
              >
                <div className="pt-1">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-horizon hover:underline"
                  >
                    <span>Open Profile</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 pt-6 border-t border-deep-ocean/10 dark:border-horizon/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg sm:text-xl font-bold font-display text-deep-ocean">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-ocean">
              Common client and engineering queries displayed on the contact route
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFaqModalState({ isOpen: true, item: null })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-horizon text-white hover:bg-ocean transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add FAQ</span>
          </button>
        </div>

        {faqs.length === 0 ? (
          <DashboardEmptyState
            title="No FAQs created"
            description="Add frequently asked questions regarding availability, pricing, or stack"
            actionLabel="Add FAQ"
            onAction={() =>
              setFaqModalState({ isOpen: true, item: null })
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {faqs.map((faq) => (
              <DashboardCard
                key={faq.id}
                title={faq.question}
                onEdit={() =>
                  setFaqModalState({ isOpen: true, item: faq })
                }
                onDelete={() =>
                  setDeleteTarget({
                    id: faq.id,
                    title: faq.question,
                    type: "faq",
                  })
                }
              >
                <div className="flex items-start gap-2 pt-1">
                  <HelpCircle
                    size={16}
                    className="text-horizon shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-ocean leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>

      <ContactInfoModal
        isOpen={contactInfoModalState.isOpen}
        item={contactInfoModalState.item}
        onClose={() =>
          setContactInfoModalState({ isOpen: false, item: null })
        }
        onSave={handleSaveContactInfo}
      />

      <SocialModal
        isOpen={socialModalState.isOpen}
        item={socialModalState.item}
        onClose={() =>
          setSocialModalState({ isOpen: false, item: null })
        }
        onSave={handleSaveSocial}
      />

      <ContactFaqModal
        isOpen={faqModalState.isOpen}
        item={faqModalState.item}
        onClose={() => setFaqModalState({ isOpen: false, item: null })}
        onSave={handleSaveFaq}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        itemTitle={deleteTarget?.title}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
