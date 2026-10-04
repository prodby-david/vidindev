import { ProjectPractice } from "../projects.types";

export const PROJECT_PRACTICES: ProjectPractice[] = [
  {
    id: "type-safety",
    title: "Strict Type Safety",
    description:
      "Defining explicit TypeScript interfaces for all API contracts, props, and database models to eliminate runtime bugs before deploy.",
    guardrail: "Zero 'any' policy with strict compiler checks enabled.",
    icon: "ShieldCheck",
  },
  {
    id: "responsive-ux",
    title: "Mobile-First Responsiveness",
    description:
      "Crafting fluid, accessible layouts with Tailwind CSS rigorously tested across mobile, tablet, and widescreen breakpoints.",
    guardrail: "Audited across 320px to 4K resolutions with touch ergonomics.",
    icon: "Smartphone",
  },
  {
    id: "git-hygiene",
    title: "Git & Version Control Hygiene",
    description:
      "Practicing atomic commits, structured feature branching, and clean pull request workflows with automated linting.",
    guardrail: "Conventional commits, scoped branches, and pre-commit checks.",
    icon: "GitBranch",
  },
];
