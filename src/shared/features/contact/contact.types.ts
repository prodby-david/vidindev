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
