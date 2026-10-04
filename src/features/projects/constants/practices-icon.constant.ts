import { ShieldCheck, Smartphone, GitBranch } from "lucide-react";
import { ProjectPracticeIcon } from "../projects.types";

export const PRACTICES_ICON_MAP: Record<
  ProjectPracticeIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  ShieldCheck,
  Smartphone,
  GitBranch,
};
