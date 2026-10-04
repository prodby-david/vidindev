import { GraduationCap, Rocket, Code } from "lucide-react";
import { MilestoneIcon } from "../experience.types";

export const MILESTONES_ICON_MAP: Record<
  MilestoneIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  GraduationCap,
  Rocket,
  Code,
};
