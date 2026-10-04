import type { Metadata } from "next";
import AboutSection from "@/features/about/AboutSection";
import AboutValues from "@/features/about/components/AboutValues";
import SkillsSection from "@/features/skills/SkillsSection";
import AboutCertificationsSection from "@/features/about/components/AboutCertificationsSection";
import AboutGear from "@/features/about/components/AboutGear";

export const metadata: Metadata = {
  title: "About | John David Gaspar",
  description:
    "Learn more about John David Gaspar, software engineer based in the Philippines.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AboutSection />
      <AboutValues />
      <SkillsSection />
      <AboutCertificationsSection />
      <AboutGear />
    </div>
  );
}
