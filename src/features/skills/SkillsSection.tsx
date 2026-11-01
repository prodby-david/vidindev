import { SkillCategory } from "./skills.types";
import SkillsHeader from "./components/SkillsHeader";
import SkillsContainer from "./components/SkillsContainer";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pt-6 sm:pt-10 pb-12 sm:pb-16 flex flex-col gap-8 sm:gap-10 items-center"
    >
      <SkillsHeader />
      {categories.length > 0 ? (
        <SkillsContainer categories={categories} />
      ) : (
        <p className="text-sm text-ocean">Skills are being updated.</p>
      )}
    </section>
  );
}
