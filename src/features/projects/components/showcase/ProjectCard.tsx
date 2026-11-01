"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import Badge from "@/shared/components/ui/Badge";
import { Project } from "../../projects.types";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isExternal = project.link.startsWith("http");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -6 }}
      className="group flex flex-col bg-polaroid dark:bg-sand/40 border border-deep-ocean/10 dark:border-horizon/15 rounded-md p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-horizon/30 transition-[box-shadow,border-color] duration-300 ease-out"
    >
      <ProjectImage
        src={project.imageSrc}
        alt={project.title}
        priority={index < 2}
      />

      <div className="flex flex-col flex-1 pt-4 sm:pt-5 gap-3">
        {project.link && project.link !== "#" ? (
          <div className="flex items-center justify-end gap-2">
            <Link
              href={project.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean dark:text-horizon hover:text-deep-ocean dark:hover:text-mint transition-colors duration-200"
            >
              <span>View Project</span>
              <MoveRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        ) : null}

        <h3 className="text-xl sm:text-2xl font-bold font-display text-deep-ocean tracking-tight group-hover:text-ocean dark:group-hover:text-horizon transition-colors duration-200">
          {project.link && project.link !== "#" ? (
            <Link
              href={project.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="text-sm font-body text-ocean dark:text-ocean/90 leading-relaxed">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
