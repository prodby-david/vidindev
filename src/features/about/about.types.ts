export type AboutInfoIcon = "mapPin" | "laptop" | "heart" | "compass";

export interface AboutInfoItem {
  id: string;
  label: string;
  value: string;
  iconName: AboutInfoIcon;
}

export interface AboutData {
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  infoItems: AboutInfoItem[];
}

export interface AboutValueItem {
  id: string;
  title: string;
  description: string;
  icon: "Hammer" | "BookOpen" | "HeartHandshake";
}

export type AboutCertType = "degree" | "certification";

export interface AboutCertItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  details: string;
  type: AboutCertType;
  credentialImage: string;
  credentialId?: string | null;
  verificationUrl?: string | null;
}

export interface AboutMarqueeItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}
