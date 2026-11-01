import { ContactSubject } from "./validator/contact.schema";

export type { ContactSubject };

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: ContactSubject | "";
  message: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: ContactSubject;
  message: string;
  createdAt: string;
}

export interface ContactCta {
  label: string;
  href: string;
}

export interface ContactData {
  badge: string;
  title: string;
  description: string;
  cta: ContactCta;
  statusText: string;
  statusAvailable: boolean;
}

export interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: "Mail" | "MapPin" | "Clock";
}

export interface SocialLinkItem {
  name: string;
  url: string;
  handle: string;
}

export type SocialLink = SocialLinkItem;

export interface ContactFaqItem {
  question: string;
  answer: string;
}
