import { WorkPrinciple } from "../experience.types";

export const WORK_PRINCIPLES: WorkPrinciple[] = [
  {
    id: "problem-solving",
    title: "Problem-First Decomposition",
    tagline: "Deep Understanding Before Code",
    description:
      "Deconstructing ambiguous goals into verifiable sub-problems and edge cases before writing implementation details.",
    actionableHabit:
      "Diagramming data flows and outlining logic before starting code execution.",
    icon: "Brain",
  },
  {
    id: "communication",
    title: "Proactive Communication",
    tagline: "Clear Context, Zero Surprises",
    description:
      "Sharing progress, technical blockers, and trade-offs early and often with teammates, ensuring high async alignment.",
    actionableHabit:
      "Documenting pull requests thoroughly and providing clear daily updates.",
    icon: "MessageSquareCode",
  },
  {
    id: "iteration",
    title: "Adaptability & Rapid Feedback",
    tagline: "Embracing Constructive Critique",
    description:
      "Quickly incorporating review feedback, refining architectures, and breaking large changes into bite-sized milestones.",
    actionableHabit:
      "Submitting small, testable pull requests that make code review seamless.",
    icon: "RefreshCw",
  },
  {
    id: "curiosity",
    title: "Continuous Curiosity & Craft",
    tagline: "Beyond 'It Just Works'",
    description:
      "Relentlessly investigating how tools work under the hood—from React render lifecycles to database indexing strategies.",
    actionableHabit:
      "Proactively exploring modern web primitives and profiling runtime performance.",
    icon: "Lightbulb",
  },
];
