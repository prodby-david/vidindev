import { GraduationCap, Award } from "lucide-react";
import { AboutCertType } from "../about.types";

export const ABOUT_CERT_ICON_MAP: Record<
  AboutCertType,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  degree: GraduationCap,
  certification: Award,
};
