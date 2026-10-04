import { PROJECTS_DATA } from "./constants";
import ProjectHeader from "./components/ProjectHeader";
import ProjectsContainer from "./components/ProjectsContainer";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 flex flex-col gap-10"
    >
      <ProjectHeader />
      <ProjectsContainer projects={PROJECTS_DATA} />
    </section>
  );
}
