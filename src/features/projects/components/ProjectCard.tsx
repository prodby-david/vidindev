"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import Badge from "@/shared/components/ui/Badge";
import { Project } from "../projects.types";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="group flex flex-col justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:flex-1 min-w-[280px] bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 rounded-md p-5 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <div className="flex flex-col">
        <ProjectImage src={project.imageSrc} alt={project.title} />

        <div className="flex items-center justify-between mt-4">
          <h3 className="text-xl font-bold font-display text-deep-ocean">
            {project.title}
          </h3>
          <span className="text-sm font-semibold text-ocean/60">
            {project.number}
          </span>
        </div>

        <p className="text-ocean text-sm leading-relaxed mt-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="pt-5">
        <Link
          href={project.link}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-ocean hover:text-horizon transition-colors group/link"
        >
          <span>View Project</span>
          <MoveRight
            size={15}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}
