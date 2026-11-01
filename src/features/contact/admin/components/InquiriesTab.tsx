"use client";

import { Mail, Phone } from "lucide-react";
import {
  DashboardCard,
  DashboardEmptyState,
  DashboardHeader,
  DashboardSkeletonGrid,
} from "@/shared/components/admin";
import {
  CONTACT_SUBJECT_LABELS,
  type ContactSubject,
} from "../../validator/contact.schema";
import { useInquiriesTab } from "../hooks/useInquiriesTab";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function InquiriesTab() {
  const {
    isLoading,
    loadError,
    refetch,
    searchQuery,
    setSearchQuery,
    filteredInquiries,
  } = useInquiriesTab();

  return (
    <div className="flex w-full flex-col gap-6">
      <DashboardHeader
        title="Inquiries"
        description="Read messages sent through the public contact form"
        badge={`${filteredInquiries.length} total`}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter inquiries..."
      />

      {loadError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-600 dark:text-red-400">
          <span>{loadError}</span>
          <button
            type="button"
            onClick={refetch}
            className="font-semibold underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <DashboardSkeletonGrid count={3} />
      ) : filteredInquiries.length === 0 ? (
        <DashboardEmptyState
          title="No inquiries yet"
          description="Messages submitted through the public contact form will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {filteredInquiries.map((inquiry) => (
            <DashboardCard
              key={inquiry.id}
              title={inquiry.name}
              subtitle={inquiry.email}
              badge={
                CONTACT_SUBJECT_LABELS[inquiry.subject as ContactSubject]
              }
            >
              <div className="flex flex-col gap-3">
                <p className="whitespace-pre-wrap text-xs leading-relaxed text-ocean sm:text-sm">
                  {inquiry.message}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-deep-ocean/10 pt-3 text-[11px] text-ocean dark:border-horizon/10">
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-horizon hover:underline"
                  >
                    <Mail size={12} />
                    Reply by email
                  </a>

                  {inquiry.phone && (
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="inline-flex items-center gap-1.5 hover:text-deep-ocean"
                    >
                      <Phone size={12} />
                      {inquiry.phone}
                    </a>
                  )}

                  <span className="ml-auto font-mono text-ocean/80">
                    {dateFormatter.format(new Date(inquiry.createdAt))}
                  </span>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </div>
  );
}
