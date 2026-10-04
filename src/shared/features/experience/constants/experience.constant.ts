import { ExperienceData } from "../experience.types";

export const EXPERIENCE_DATA: ExperienceData = {
  category: "EXPERIENCE",
  title: "Where I’ve worked",
  description:
    "I’ve had the opportunity to work on different kinds of projects, from startups to remote teams, helping build products that make an impact.",
  resumeUrl: "#",
  items: [
    {
      id: "exp-1",
      period: "2023 – Present",
      role: "Software Engineer",
      company: "Freelance / Remote",
      details:
        "Building web applications and working with modern tech stacks.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      icon: "Code2",
    },
    {
      id: "exp-2",
      period: "2021 – 2023",
      role: "Junior Software Engineer",
      company: "Tech Startup",
      details:
        "Contributed to product features, collaborated with cross-functional teams, and improved system performance.",
      skills: ["JavaScript", "React", "Express", "REST APIs", "Git"],
      icon: "Terminal",
    },
    {
      id: "exp-3",
      period: "2019 – 2021",
      role: "BS Computer Science",
      company: "University",
      details:
        "Focused on software development, algorithms, and problem solving.",
      skills: ["Algorithms", "Data Structures", "Java", "C++", "SQL"],
      icon: "GraduationCap",
    },
  ],
};
