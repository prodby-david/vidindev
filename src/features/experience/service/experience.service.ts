import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "../validator/experience.schema";
import { ExperienceRepository } from "../repository/experience.repository";

type ExperienceRow = NonNullable<
  Awaited<ReturnType<typeof ExperienceRepository.getExperienceById>>
>;

function toExperience(row: ExperienceRow) {
  return { ...row, skills: [...row.skills] };
}

export const ExperienceService = {
  async getAllExperience() {
    const rows = await ExperienceRepository.getAllExperience();
    return rows.map(toExperience);
  },

  async getExperienceById(id: string) {
    const row = await ExperienceRepository.getExperienceById(id);
    return row ? toExperience(row) : null;
  },

  async createExperience(data: CreateExperienceInput) {
    const row = await ExperienceRepository.createExperience(data);
    return toExperience(row);
  },

  async updateExperience(id: string, data: UpdateExperienceInput) {
    const row = await ExperienceRepository.updateExperience(id, data);
    return row ? toExperience(row) : null;
  },

  async deleteExperience(id: string) {
    return ExperienceRepository.deleteExperience(id);
  },
};
