import type { Metadata } from "next";
import ContactSection from "@/features/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact | John David Gaspar",
  description:
    "Get in touch with John David Gaspar for collaborations, projects, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col">
      <ContactSection />
    </div>
  );
}
