import { ProjectsService } from "@/features/projects/service/projects.service";
import { ExperienceService } from "@/features/experience/service/experience.service";
import { SkillsService } from "@/features/skills/service/skills.service";
import { CertificationsService } from "@/features/about/service/certifications.service";
import { GearService } from "@/features/gear/service/gear.service";

export const PERSONAL_CONTEXT = {
  name: "John David Gaspar",
  title: "Full-Stack Software Engineer",
  location: "Metro Manila, Philippines",
  email: "johndavidgaspar.dev@gmail.com",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/your-username",
  tagline: "I build software around problems worth solving.",
  bio: "I'm a full-stack software engineer who turns everyday challenges into simple, dependable web apps. I focus on clean design, fast performance, and building tools that make life easier for real people—not just writing code for the sake of it.",
  approach:
    "Pragmatic, clean architecture, strong type safety with TypeScript, resilient backend systems with PostgreSQL, and intuitive UI design without unnecessary complexity.",
  availability:
    "Actively open to full-time software engineering roles, freelance/contract projects, and remote opportunities.",
  interests: "Technology, AI, Music",
  exploring: "Modern Web Apps, Cloud Tools, AI",
};

export async function getPortfolioContext() {
  const [projects, experience, skills, certifications, gear] =
    await Promise.all([
      ProjectsService.getAllProjects().catch(() => []),
      ExperienceService.getAllExperience().catch(() => []),
      SkillsService.getGroupedSkills().catch(() => []),
      CertificationsService.getAllCertifications().catch(() => []),
      GearService.getDisplayCategories().catch(() => []),
    ]);

  return {
    personal: PERSONAL_CONTEXT,
    projects: projects.map((p) => ({
      title: p.title,
      description: p.description,
      tags: p.tags,
      link: p.link,
    })),
    experience: experience.map((e) => ({
      period: e.period,
      role: e.role,
      company: e.company,
      details: e.details,
      skills: e.skills,
    })),
    skills: skills.map((s) => ({
      category: s.title,
      items: s.skills,
    })),
    certifications: certifications.map((c) => ({
      title: c.title,
      institution: c.institution,
      period: c.period,
      type: c.type,
      details: c.details,
    })),
    gear: gear.map((g) => ({
      category: g.category,
      items: g.items,
    })),
  };
}
