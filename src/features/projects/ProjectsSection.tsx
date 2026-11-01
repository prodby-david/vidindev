import { Project } from "./projects.types";
import ProjectHeader from "./components/showcase/ProjectHeader";
import ProjectsContainer from "./components/showcase/ProjectsContainer";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 flex flex-col gap-10"
    >
      <ProjectHeader />
      {projects.length > 0 ? (
        <ProjectsContainer projects={projects} />
      ) : (
        <p className="rounded-md border border-dashed border-deep-ocean/20 p-8 text-center text-sm text-ocean dark:border-horizon/30">
          Projects are being updated. Check back soon.
        </p>
      )}
    </section>
  );
}
