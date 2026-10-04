import { ProcessStep } from "../home.types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Gather Data",
    description:
      "Understanding the core problem, user journey, and constraints before writing a single line of code.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Planning & Design",
    description:
      "Mapping schemas, designing interfaces in Figma, and validating user interactions with rapid prototypes.",
    icon: "Layers",
  },
  {
    step: "03",
    title: "Build & Test",
    description:
      "Implementing with clean type safety, unit testing, and rigorous performance benchmarking across all viewports.",
    icon: "Code2",
  },
  {
    step: "04",
    title: "Deploy & Monitor",
    description:
      "Automated CI/CD pipelines, production health monitoring, and iterative enhancements based on real data.",
    icon: "Rocket",
  },
];
