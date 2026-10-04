import { Search, Layers, Code2, Rocket } from "lucide-react";
import { ProcessStepIcon } from "../home.types";

export const PROCESS_ICON_MAP: Record<
  ProcessStepIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Search,
  Layers,
  Code2,
  Rocket,
};
