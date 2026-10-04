import type { Metadata } from "next";
import ExperienceSection from "@/features/experience/ExperienceSection";
import ExperiencePrinciplesSection from "@/features/experience/components/ExperiencePrinciplesSection";
import ExperienceMilestonesSection from "@/features/experience/components/ExperienceMilestonesSection";

export const metadata: Metadata = {
  title: "Experience | John David Gaspar",
  description:
    "Career journey, professional work experience, engineering mindset, and milestones of John David Gaspar.",
};

export default function ExperiencePage() {
  return (
    <div className="flex-1 flex flex-col">
      <ExperienceSection />
      <ExperiencePrinciplesSection />
      <ExperienceMilestonesSection />
    </div>
  );
}
