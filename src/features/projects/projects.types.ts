export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  imageSrc: string;
}

export type ProjectPracticeIcon = "ShieldCheck" | "Smartphone" | "GitBranch";

export interface ProjectPractice {
  id: string;
  title: string;
  description: string;
  guardrail: string;
  icon: ProjectPracticeIcon;
}
