import type { Metadata } from "next";
import ExperienceSection from "@/features/experience/ExperienceSection";
import ExperienceHiringCallout from "@/features/experience/components/timeline/ExperienceHiringCallout";
import { ExperienceService } from "@/features/experience/service/experience.service";
import type { ExperienceItem } from "@/features/experience/experience.types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Experience | John David Gaspar",
  description:
    "Career journey and professional work experience of John David Gaspar.",
};

async function loadExperience(): Promise<ExperienceItem[]> {
  try {
    return await ExperienceService.getAllExperience();
  } catch {
    return [];
  }
}

export default async function ExperiencePage() {
  const items = await loadExperience();

  return (
    <div className="flex-1 flex flex-col">
      <ExperienceSection items={items} />
      <ExperienceHiringCallout />
    </div>
  );
}
