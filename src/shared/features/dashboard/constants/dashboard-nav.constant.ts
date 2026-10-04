import { DashboardNavTab } from "../dashboard.types";

export const DASHBOARD_NAV_TABS: DashboardNavTab[] = [
  {
    id: "analytics",
    label: "Visitor Analytics",
    description: "Monitor visitor traffic, user interactions, and real-time app telemetry",
    iconName: "Activity",
  },
  {
    id: "marquee",
    label: "Polaroid Snapshots",
    description: "Manage moments, polaroid images, and captions in the marquee conveyor",
    iconName: "Camera",
  },
  {
    id: "skills",
    label: "Skills & Technologies",
    description: "Manage engineering skill stacks and technical competencies",
    iconName: "Layers",
  },
  {
    id: "certifications",
    label: "Certifications",
    description: "Manage degrees, verified diplomas, and technical certifications",
    iconName: "Award",
  },
  {
    id: "gear",
    label: "Toolbox & Gear",
    description: "Manage everyday developer setup, hardware, and workflow software",
    iconName: "Laptop",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Manage featured projects, case studies, technologies, and live URLs",
    iconName: "FolderGit2",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Manage professional career journey, timeline roles, and achievements",
    iconName: "Briefcase",
  },
  {
    id: "contact",
    label: "Contact & Socials",
    description: "Manage direct contact information, availability status, and social channels",
    iconName: "Mail",
  },
];
