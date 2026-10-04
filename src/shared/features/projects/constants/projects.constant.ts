import { Project } from "../projects.types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "siklo",
    number: "01",
    title: "Siklo",
    description:
      "A modern platform for creators to manage and share their content.",
    tags: ["Next.js", "TypeScript", "NestJS"],
    link: "#",
    imageSrc: "/images/hero-img.jpg",
  },
  {
    id: "hanapark",
    number: "02",
    title: "HanaPark",
    description:
      "A travel planning app that helps users discover and organize trips with ease.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
    imageSrc: "/images/hero.jpg",
  },
  {
    id: "flow",
    number: "03",
    title: "Flow",
    description:
      "A workflow management tool designed for small teams and freelancers.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    link: "#",
    imageSrc: "/images/hero-img.jpg",
  },
];
