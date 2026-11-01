import { db } from "@/prisma/db";
import { CreateSkillInput } from "../validator/skills.schema";

export const SkillsRepository = {
  async createSkill(data: CreateSkillInput) {
    return db.orm.public.Stack.create({
      name: data.name,
      category: data.category,
    });
  },

  async getAllSkills() {
    return db.orm.public.Stack.orderBy((skill) => skill.createdAt.asc()).all();
  },

  async getSkillById(id: string) {
    return db.orm.public.Stack.first({ id });
  },

  async deleteSkill(id: string) {
    return db.orm.public.Stack.where({ id }).delete();
  },
};
