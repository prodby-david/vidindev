import { EXPERIENCE_DATA } from "./constants";
import ExperienceHeader from "./components/ExperienceHeader";
import ExperienceTimeline from "./components/ExperienceTimeline";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16"
    >
      <ExperienceHeader
        category={EXPERIENCE_DATA.category}
        title={EXPERIENCE_DATA.title}
        description={EXPERIENCE_DATA.description}
        resumeUrl={EXPERIENCE_DATA.resumeUrl}
      />
      <ExperienceTimeline items={EXPERIENCE_DATA.items} />
    </section>
  );
}
