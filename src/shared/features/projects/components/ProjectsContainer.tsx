import { Project } from "../projects.types";
import ProjectCard from "./ProjectCard";

interface ProjectsContainerProps {
  projects: Project[];
}

export default function ProjectsContainer({
  projects,
}: ProjectsContainerProps) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 lg:gap-8 justify-between w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
