import { MapPin, Laptop, Heart, Compass } from "lucide-react";
import { AboutInfoIcon } from "../about.types";

export const ABOUT_INFO_ICON_MAP: Record<
  AboutInfoIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  mapPin: MapPin,
  laptop: Laptop,
  heart: Heart,
  compass: Compass,
};
