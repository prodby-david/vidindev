"use client";

import { useState } from "react";
import { toast } from "@/shared/components/ui";
import { ContactFormData } from "../contact.types";

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <Key extends keyof ContactFormData>(
    field: Key,
    value: ContactFormData[Key],
  ) => {
    setError(null);
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.subject) {
      setError("Please choose a subject.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please write a message.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.trim() || undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
        errors?: string;
      } | null;

      if (!response.ok) {
        const errorMsg =
          payload?.errors ?? payload?.message ?? "Unable to send your message.";
        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      setSubmitted(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch {
      const errorMsg = "Unable to reach the server. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
    setFormData(INITIAL_FORM_DATA);
  };

  return {
    formData,
    submitted,
    isSubmitting,
    error,
    updateField,
    handleSubmit,
    resetForm,
  };
}
