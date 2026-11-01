import { HomeService } from "../../home.types";

export const HOME_SERVICES: HomeService[] = [
  {
    id: "web-development",
    title: "Web Development & Landing Pages",
    description:
      "Fast, responsive, and conversion-focused websites engineered with modern frameworks. Designed to elevate brand presence with smooth animations, accessible UI, and peak performance.",
    icon: "Globe",
    deliverables: [
      "Mobile-first, responsive layouts",
      "SEO & Core Web Vitals optimization",
      "Interactive motion & micro-animations",
      "Contact forms & analytics integration",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    contactSubject: "Project Collaboration",
  },
  {
    id: "custom-web-apps",
    title: "Custom Web Applications",
    description:
      "Bespoke full-stack web applications, SaaS dashboards, and client portals built to scale. Engineered with clean architecture, intuitive workflows, and production-grade reliability.",
    icon: "AppWindow",
    deliverables: [
      "End-to-end full-stack development",
      "Secure authentication & role management",
      "Interactive dashboard & analytics UI",
      "Real-time state & reactive data flow",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    contactSubject: "Project Collaboration",
  },
  {
    id: "backend-api",
    title: "API & Backend Architecture",
    description:
      "Robust server-side services and RESTful APIs engineered for high throughput, data integrity, and modular scalability. Structured following enterprise clean architecture patterns.",
    icon: "Server",
    deliverables: [
      "RESTful API design & documentation",
      "Relational database schema modeling",
      "JWT auth & fine-grained permissions",
      "Third-party service integrations",
    ],
    tags: ["Node.js", "NestJS", "PostgreSQL", "REST APIs"],
    contactSubject: "Technical Consultation",
  },
  {
    id: "cloud-optimization",
    title: "Cloud, Database & DevOps",
    description:
      "Reliable cloud infrastructure, containerization, and database performance tuning. Built to ensure automated CI/CD deployments, zero downtime, and fast query execution.",
    icon: "Cloud",
    deliverables: [
      "Database indexing & query tuning",
      "Docker containerization & staging",
      "Automated CI/CD deployment pipelines",
      "Cloud hosting setup on AWS & Vercel",
    ],
    tags: ["AWS", "Docker", "Prisma ORM", "CI/CD"],
    contactSubject: "Technical Consultation",
  },
];
