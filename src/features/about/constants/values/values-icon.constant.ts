import { Hammer, BookOpen, HeartHandshake } from "lucide-react";
import { AboutValueItem } from "../../about.types";

export const ABOUT_VALUES_ICON_MAP: Record<
  AboutValueItem["icon"],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Hammer,
  BookOpen,
  HeartHandshake,
};
