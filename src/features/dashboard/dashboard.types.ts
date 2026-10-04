export type DashboardTab =
  | "analytics"
  | "marquee"
  | "skills"
  | "certifications"
  | "gear"
  | "projects"
  | "experience"
  | "contact";

export interface VisitorMetricUI {
  totalViews: number;
  uniqueVisitors: number;
  avgDuration: string;
  activeNow: number;
  viewsTrend?: string;
  visitorsTrend?: string;
}

export interface TrafficDataPointUI {
  label: string;
  views: number;
  visitors: number;
}

export interface VisitorActivityUI {
  id: string;
  visitorId: string;
  location: string;
  device: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface TopRouteUI {
  path: string;
  views: number;
  percentage: number;
}

export interface DeviceStatUI {
  device: string;
  percentage: number;
  count: number;
}

export interface MarqueeItemUI {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

export interface SkillCategoryUI {
  id: string;
  title: string;
  skills: string[];
}

export interface CertificationItemUI {
  id: string;
  title: string;
  institution: string;
  period: string;
  details: string;
  type: "degree" | "certification";
  credentialImage: string;
  credentialId: string;
  verificationUrl?: string;
}

export interface GearCategoryUI {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItemUI {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageSrc: string;
}

export type ProjectPracticeIconUI = "ShieldCheck" | "Smartphone" | "GitBranch";

export interface ProjectPracticeUI {
  id: string;
  title: string;
  description: string;
  guardrail: string;
  icon: ProjectPracticeIconUI;
}

export type ExperienceIconUI = "Code2" | "Terminal" | "GraduationCap";

export interface ExperienceItemUI {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string;
  skills: string[];
  icon: ExperienceIconUI;
}

export type MilestoneIconUI = "GraduationCap" | "Rocket" | "Code";

export interface ExperienceMilestoneUI {
  id: string;
  year: string;
  title: string;
  organization: string;
  summary: string;
  icon: MilestoneIconUI;
}

export type PrincipleIconUI =
  | "Brain"
  | "MessageSquareCode"
  | "RefreshCw"
  | "Lightbulb";

export interface WorkPrincipleUI {
  id: string;
  title: string;
  tagline: string;
  description: string;
  actionableHabit: string;
  icon: PrincipleIconUI;
}

export type ContactInfoIconUI = "Mail" | "MapPin" | "Clock";

export interface ContactInfoUI {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon?: ContactInfoIconUI;
}

export interface SocialItemUI {
  id: string;
  name: string;
  handle: string;
  url: string;
}

export interface ContactFaqUI {
  id: string;
  question: string;
  answer: string;
}

export interface DashboardNavTab {
  id: DashboardTab;
  label: string;
  description: string;
  iconName: string;
}
