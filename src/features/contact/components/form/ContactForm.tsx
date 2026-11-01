"use client";

import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";
import { CONTACT_SUBJECT_CHOICES } from "../../constants/form/contact.constant";
import type { ContactSubject } from "../../contact.types";
import { Input, Select, Textarea } from "@/shared/components/ui";
import ContactSuccessMessage from "./ContactSuccessMessage";

export default function ContactForm() {
  const {
    formData,
    submitted,
    isSubmitting,
    error,
    updateField,
    handleSubmit,
    resetForm,
  } = useContactForm();

  if (submitted) {
    return <ContactSuccessMessage onReset={resetForm} />;
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-6 sm:p-8 rounded-md bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-md transition-shadow duration-300 ease-out"
    >
      <Input
        id="contact-name"
        label="Your Name"
        type="text"
        required
        placeholder="Jane Doe"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        inputSize="md"
        variant="warm"
      />

      <Input
        id="contact-email"
        label="Email Address"
        type="email"
        required
        placeholder="jane@example.com"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        inputSize="md"
        variant="warm"
      />

      <Input
        id="contact-phone"
        label="Contact Number (Optional)"
        type="tel"
        placeholder="+63 912 345 6789"
        value={formData.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        inputSize="md"
        variant="warm"
      />

      <Select
        id="contact-subject"
        label="Subject"
        required
        placeholder="Select a subject..."
        value={formData.subject}
        onChange={(e) =>
          updateField("subject", e.target.value as ContactSubject | "")
        }
        options={CONTACT_SUBJECT_CHOICES}
        inputSize="md"
        variant="warm"
      />

      <Textarea
        id="contact-message"
        label="Message"
        required
        rows={5}
        placeholder="Tell me about your project, timeline, and goals..."
        value={formData.message}
        onChange={(e) => updateField("message", e.target.value)}
        inputSize="md"
        variant="warm"
      />

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-500/25 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <motion.button
        whileHover={isSubmitting ? undefined : { scale: 1.02 }}
        whileTap={isSubmitting ? undefined : { scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-ocean text-sm text-white font-semibold hover:bg-deep-ocean dark:bg-horizon dark:text-deep-ocean dark:hover:bg-mint py-3.5 px-8 rounded-md cursor-pointer transition-colors duration-200 shadow-sm mt-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
        <Send size={16} />
      </motion.button>
    </motion.form>
  );
}
