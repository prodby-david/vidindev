import { db } from "@/prisma/db";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validator/project.schema";

export const ProjectsRepository = {
  async getAllProjects() {
    return db.orm.public.Project.orderBy((project) =>
      project.number.asc()
    ).all();
  },

  async getProjectById(id: string) {
    return db.orm.public.Project.first({ id });
  },

  async createProject(data: CreateProjectInput) {
    return db.orm.public.Project.create(data);
  },

  async updateProject(id: string, data: UpdateProjectInput) {
    return db.orm.public.Project.where({ id }).update(data);
  },

  async deleteProject(id: string) {
    return db.orm.public.Project.where({ id }).delete();
  },
};
