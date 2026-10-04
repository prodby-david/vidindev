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
  note: string;
  imageSrc: string;
  infoItems: AboutInfoItem[];
  currentlyExploring?: string[];
}

export interface AboutValueItem {
  id: string;
  title: string;
  description: string;
  icon: "Hammer" | "BookOpen" | "HeartHandshake";
}

export interface AboutGearCategory {
  id: string;
  category: string;
  items: string[];
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
  credentialId: string;
  verificationUrl?: string;
}

export interface AboutMarqueeItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}
