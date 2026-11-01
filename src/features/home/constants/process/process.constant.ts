import { ProcessStep } from "../../home.types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Understand",
    description:
      "Clarifying requirements, user needs, and architectural goals before writing code to ensure we solve the right problem.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Planning & Architecture",
    description:
      "Designing responsive layouts in Figma, modeling database schemas, and validating user flows early.",
    icon: "Layers",
  },
  {
    step: "03",
    title: "Build & Test",
    description:
      "Writing clean, maintainable TypeScript code with responsive design and rigorous testing across devices.",
    icon: "Code2",
  },
  {
    step: "04",
    title: "Deploy & Deliver",
    description:
      "Deploying to production on modern cloud infrastructure with clean documentation and post-launch support.",
    icon: "Rocket",
  },
];
