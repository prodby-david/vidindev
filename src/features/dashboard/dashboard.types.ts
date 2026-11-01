export type DashboardTab =
  | "marquee"
  | "skills"
  | "certifications"
  | "gear"
  | "projects"
  | "experience"
  | "inquiries";

export interface DashboardNavTab {
  id: DashboardTab;
  label: string;
  description: string;
  iconName: string;
}
