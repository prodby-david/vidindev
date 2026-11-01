"use client";

import { Project } from "../../projects.types";
import ProjectCard from "./ProjectCard";

interface ProjectsContainerProps {
  projects: Project[];
}

export default function ProjectsContainer({
  projects,
}: ProjectsContainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
