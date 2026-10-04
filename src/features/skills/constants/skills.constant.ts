import { SkillsData } from "../skills.types";

export const SKILLS_DATA: SkillsData = {
  category: "WHAT I WORK WITH",
  title: "Skills & Technologies",
  categories: [
    {
      id: "frontend",
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Vite",
      ],
    },
    {
      id: "backend",
      title: "Backend",
      skills: ["Node.js", "NestJS", "Express", "PHP"],
    },
    {
      id: "data",
      title: "Data",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Prisma",
        "Supabase",
      ],
    },
    {
      id: "devops",
      title: "Cloud & DevOps",
      skills: [
        "AWS",
        "GCP",
        "Docker",
        "Git",
        "GitHub",
        "GitHub Actions",
        "Vercel",
      ],
    },
    {
      id: "ai-tools",
      title: "AI & Dev Tools",
      skills: [
        "Antigravity",
        "Claude",
        "ChatGPT",
        "Gemini",
        "VS Code",
        "Postman",
      ],
    },
  ],
};
