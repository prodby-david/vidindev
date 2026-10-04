export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface SkillsData {
  category: string;
  title: string;
  categories: SkillCategory[];
}
