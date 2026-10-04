import { Globe, Smartphone, Server } from "lucide-react";
import { CapabilityIcon } from "../home.types";

export const CAPABILITIES_ICON_MAP: Record<
  CapabilityIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Globe,
  Smartphone,
  Server,
};
