"use client";

import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useContactForm } from "../hooks/useContactForm";
import ContactSuccessMessage from "./ContactSuccessMessage";

export default function ContactForm() {
  const { formData, submitted, updateField, handleSubmit, resetForm } =
    useContactForm();

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
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-ocean uppercase tracking-wider">
          Your Name
        </label>
        <input
          type="text"
          required
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-md bg-warm border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-ocean uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          required
          placeholder="jane@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-md bg-warm border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-ocean uppercase tracking-wider">
          Subject
        </label>
        <input
          type="text"
          placeholder="Project Inquiry / Opportunity"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-md bg-warm border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-ocean uppercase tracking-wider">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell me about your project, timeline, and goals..."
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-md bg-warm border border-deep-ocean/15 dark:border-horizon/20 text-deep-ocean placeholder:text-ocean/50 focus:outline-none focus:border-horizon transition-colors resize-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="inline-flex items-center justify-center gap-2 bg-horizon text-sm text-white dark:text-warm font-semibold hover:bg-ocean dark:hover:bg-mint py-3.5 px-8 rounded-full cursor-pointer transition-colors duration-200 shadow-sm mt-2"
      >
        <span>Send Message</span>
        <Send size={16} />
      </motion.button>
    </motion.form>
  );
}
