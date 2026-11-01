import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validator/project.schema";
import { ProjectsRepository } from "../repository/projects.repository";

type ProjectRow = NonNullable<
  Awaited<ReturnType<typeof ProjectsRepository.getProjectById>>
>;

function toProject(row: ProjectRow) {
  return { ...row, tags: [...row.tags] };
}

export const ProjectsService = {
  async getAllProjects() {
    const rows = await ProjectsRepository.getAllProjects();
    return rows.map(toProject);
  },

  async getProjectById(id: string) {
    const row = await ProjectsRepository.getProjectById(id);
    return row ? toProject(row) : null;
  },

  async createProject(data: CreateProjectInput) {
    const row = await ProjectsRepository.createProject(data);
    return toProject(row);
  },

  async updateProject(id: string, data: UpdateProjectInput) {
    const row = await ProjectsRepository.updateProject(id, data);
    return row ? toProject(row) : null;
  },

  async deleteProject(id: string) {
    return ProjectsRepository.deleteProject(id);
  },
};
