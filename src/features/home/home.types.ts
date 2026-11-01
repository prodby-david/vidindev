export type CapabilityIcon = "Layers" | "Server" | "Cloud";

export interface HomeCapability {
  id: string;
  title: string;
  description: string;
  icon: CapabilityIcon;
  tags: string[];
}

export type ServiceIcon = "Globe" | "AppWindow" | "Server" | "Cloud";

export interface HomeService {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  deliverables: string[];
  tags: string[];
  contactSubject: string;
}

export type ProcessStepIcon = "Search" | "Layers" | "Code2" | "Rocket";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: ProcessStepIcon;
}

export interface HomeBioHighlight {
  label: string;
  value: string;
}

export interface HomeBioPreview {
  badge: string;
  title: string;
  paragraphs: string[];
  highlights: HomeBioHighlight[];
  cta: {
    label: string;
    href: string;
  };
}
