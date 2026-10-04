import { SKILLS_DATA } from "./constants";
import SkillsHeader from "./components/SkillsHeader";
import SkillsContainer from "./components/SkillsContainer";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-10 pb-12 sm:pb-16 flex flex-col gap-8 sm:gap-10 items-center"
    >
      <SkillsHeader
        category={SKILLS_DATA.category}
        title={SKILLS_DATA.title}
      />
      <SkillsContainer categories={SKILLS_DATA.categories} />
    </section>
  );
}
