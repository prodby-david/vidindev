import { HomeCapability } from "../home.types";

export const HOME_CAPABILITIES: HomeCapability[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Modern, performant web applications and platforms engineered with React, Next.js, and TypeScript. Optimized for sub-second load times, accessible UX, and fluid responsiveness across all viewports.",
    icon: "Globe",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications crafted with React Native and modern mobile-first design patterns. Built for native responsiveness, offline-first reliability, and seamless iOS & Android experiences.",
    icon: "Smartphone",
    tags: ["React Native", "Expo", "iOS & Android"],
  },
  {
    id: "backend-api",
    title: "Backend & API Systems",
    description:
      "Scalable RESTful services, database architecture, and microservices powered by Node.js, Express, and PostgreSQL. Focused on high throughput, robust authentication, and rock-solid data integrity.",
    icon: "Server",
    tags: ["Node.js", "Express", "NestJS", "REST APIs"],
  },
];
