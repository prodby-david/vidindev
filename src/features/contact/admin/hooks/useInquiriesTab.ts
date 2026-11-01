"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/api-error";
import type { ContactInquiry } from "../../contact.types";

export function useInquiriesTab() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await api.get<{ data: ContactInquiry[] }>("/api/contact");
      setInquiries(response.data.data ?? []);
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "Failed to load inquiries."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInquiries() {
      try {
        const response = await api.get<{ data: ContactInquiry[] }>(
          "/api/contact",
        );
        if (!ignore) setInquiries(response.data.data ?? []);
      } catch (error) {
        if (!ignore) {
          setLoadError(getApiErrorMessage(error, "Failed to load inquiries."));
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadInquiries();

    return () => {
      ignore = true;
    };
  }, []);

  const query = searchQuery.toLowerCase().trim();
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(query) ||
      inquiry.email.toLowerCase().includes(query) ||
      inquiry.subject.toLowerCase().includes(query) ||
      inquiry.message.toLowerCase().includes(query),
  );

  return {
    inquiries,
    isLoading,
    loadError,
    refetch: fetchInquiries,
    searchQuery,
    setSearchQuery,
    filteredInquiries,
  };
}
