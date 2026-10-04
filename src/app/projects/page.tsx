import type { Metadata } from "next";
import ProjectsSection from "@/features/projects/ProjectsSection";
import ProjectPracticesSection from "@/features/projects/components/ProjectPracticesSection";

export const metadata: Metadata = {
  title: "Projects | John David Gaspar",
  description:
    "Explore featured projects and engineering development standards by John David Gaspar.",
};

export default function ProjectsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <ProjectsSection />
      <ProjectPracticesSection />
    </div>
  );
}
