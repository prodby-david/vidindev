import { Brain, MessageSquareCode, RefreshCw, Lightbulb } from "lucide-react";
import { PrincipleIconType } from "../experience.types";

export const PRINCIPLES_ICON_MAP: Record<
  PrincipleIconType,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Brain,
  MessageSquareCode,
  RefreshCw,
  Lightbulb,
};
