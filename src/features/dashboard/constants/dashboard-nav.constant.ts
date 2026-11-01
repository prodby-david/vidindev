import { ComponentType } from "react";
import {
  Camera,
  Layers,
  Award,
  Laptop,
  FolderGit2,
  Briefcase,
  Inbox,
} from "lucide-react";
import { DashboardNavTab } from "../dashboard.types";

export const TAB_ICON_MAP: Record<
  string,
  ComponentType<{ size?: number; className?: string }>
> = {
  Camera,
  Layers,
  Award,
  Laptop,
  FolderGit2,
  Briefcase,
  Inbox,
};

export const DASHBOARD_NAV_TABS: DashboardNavTab[] = [
  {
    id: "marquee",
    label: "Polaroid Snapshots",
    description: "Manage moments, photos, and captions in the scrolling marquee",
    iconName: "Camera",
  },
  {
    id: "skills",
    label: "Skills & Technologies",
    description: "Manage technologies, programming languages, and tools",
    iconName: "Layers",
  },
  {
    id: "certifications",
    label: "Certifications",
    description: "Manage diplomas, certificates, and achievements",
    iconName: "Award",
  },
  {
    id: "gear",
    label: "Toolbox & Gear",
    description: "Manage hardware setup, developer tools, and workflow apps",
    iconName: "Laptop",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Manage featured projects, descriptions, tags, and links",
    iconName: "FolderGit2",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Manage work history, engineering positions, and responsibilities",
    iconName: "Briefcase",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    description: "Read messages received through the public contact form",
    iconName: "Inbox",
  },
];
