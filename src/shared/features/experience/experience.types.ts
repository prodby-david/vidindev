export type ExperienceIconType = "Code2" | "Terminal" | "GraduationCap";

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  details: string;
  skills: string[];
  icon: ExperienceIconType;
}

export interface ExperienceData {
  category: string;
  title: string;
  description: string;
  resumeUrl: string;
  items: ExperienceItem[];
}

export type PrincipleIconType =
  | "Brain"
  | "MessageSquareCode"
  | "RefreshCw"
  | "Lightbulb";

export interface WorkPrinciple {
  id: string;
  title: string;
  tagline: string;
  description: string;
  actionableHabit: string;
  icon: PrincipleIconType;
}

export type MilestoneIcon = "GraduationCap" | "Rocket" | "Code";

export interface ExperienceMilestone {
  id: string;
  year: string;
  title: string;
  organization: string;
  summary: string;
  icon: MilestoneIcon;
}
