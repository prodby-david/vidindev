import { Mail, MapPin, Clock } from "lucide-react";
import { ContactInfoItem } from "../../contact.types";

export const CONTACT_DIRECT_ICON_MAP: Record<
  ContactInfoItem["icon"],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Mail,
  MapPin,
  Clock,
};
