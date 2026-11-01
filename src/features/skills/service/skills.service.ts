import { CreateSkillInput } from "../validator/skills.schema";
import {
  STACK_CATEGORY_LABELS,
  type StackCategory,
} from "../validator/skills.schema";
import type { SkillCategory } from "../skills.types";
import { SkillsRepository } from "../repository/skills.repository";

const CATEGORY_ORDER: StackCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "DEVTOOLS",
];

export const SkillsService = {
  async createSkill(data: CreateSkillInput) {
    const trimmedName = data.name.trim();
    const existing = await SkillsRepository.getAllSkills();
    const duplicate = existing.find(
      (s) =>
        s.category === data.category &&
        s.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) {
      return duplicate;
    }
    return SkillsRepository.createSkill({
      ...data,
      name: trimmedName,
    });
  },

  async getAllSkills() {
    return SkillsRepository.getAllSkills();
  },

  async getGroupedSkills(): Promise<SkillCategory[]> {
    const skills = await SkillsRepository.getAllSkills();

    return CATEGORY_ORDER.flatMap((category) => {
      const names = Array.from(
        new Set(
          skills
            .filter((skill) => skill.category === category)
            .map((skill) => skill.name.trim())
            .filter(Boolean)
        )
      );

      if (names.length === 0) return [];

      return [
        {
          id: category.toLowerCase(),
          title: STACK_CATEGORY_LABELS[category],
          skills: names,
        },
      ];
    });
  },

  async getSkillById(id: string) {
    return SkillsRepository.getSkillById(id);
  },

  async deleteSkill(id: string) {
    return SkillsRepository.deleteSkill(id);
  },
};
