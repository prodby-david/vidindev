import { SkillCategory } from "../skills.types";
import SkillCard from "./SkillCard";

interface SkillsContainerProps {
  categories: SkillCategory[];
}

export default function SkillsContainer({ categories }: SkillsContainerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-8 xl:gap-0 w-full">
      {categories.map((category) => (
        <SkillCard key={category.id} category={category} />
      ))}
    </div>
  );
}
