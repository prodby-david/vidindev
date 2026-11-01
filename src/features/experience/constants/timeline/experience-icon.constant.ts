import { Code2, Terminal, GraduationCap } from "lucide-react";
import { ExperienceItem } from "../../experience.types";

export const EXPERIENCE_ICON_MAP: Record<
  ExperienceItem["icon"],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Code2,
  Terminal,
  GraduationCap,
};
