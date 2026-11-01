import type { Metadata } from "next";
import ProjectsSection from "@/features/projects/ProjectsSection";
import SkillsSection from "@/features/skills/SkillsSection";
import AboutValues from "@/features/about/components/values/AboutValues";
import GearSection from "@/features/gear/GearSection";
import { ProjectsService } from "@/features/projects/service/projects.service";
import { SkillsService } from "@/features/skills/service/skills.service";
import { GearService } from "@/features/gear/service/gear.service";
import type { Project } from "@/features/projects/projects.types";
import type { SkillCategory } from "@/features/skills/skills.types";
import type { GearCategory } from "@/features/gear/gear.types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | John David Gaspar",
  description:
    "Explore featured projects, core skills, engineering values, and developer tools by John David Gaspar.",
};

async function loadProjects(): Promise<Project[]> {
  try {
    return await ProjectsService.getAllProjects();
  } catch {
    return [];
  }
}

async function loadSkills(): Promise<SkillCategory[]> {
  try {
    return await SkillsService.getGroupedSkills();
  } catch {
    return [];
  }
}

async function loadGear(): Promise<GearCategory[]> {
  try {
    return await GearService.getDisplayCategories();
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const [projects, skillCategories, gearCategories] = await Promise.all([
    loadProjects(),
    loadSkills(),
    loadGear(),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <ProjectsSection projects={projects} />
      <SkillsSection categories={skillCategories} />
      <AboutValues />
      <GearSection categories={gearCategories} />
    </div>
  );
}
