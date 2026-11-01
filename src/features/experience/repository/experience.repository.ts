import { db } from "@/prisma/db";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "../validator/experience.schema";

export const ExperienceRepository = {
  async getAllExperience() {
    return db.orm.public.Experience.orderBy((experience) =>
      experience.createdAt.asc()
    ).all();
  },

  async getExperienceById(id: string) {
    return db.orm.public.Experience.first({ id });
  },

  async createExperience(data: CreateExperienceInput) {
    return db.orm.public.Experience.create(data);
  },

  async updateExperience(id: string, data: UpdateExperienceInput) {
    return db.orm.public.Experience.where({ id }).update(data);
  },

  async deleteExperience(id: string) {
    return db.orm.public.Experience.where({ id }).delete();
  },
};
