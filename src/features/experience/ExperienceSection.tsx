import { ExperienceItem } from "./experience.types";
import ExperienceHeader from "./components/timeline/ExperienceHeader";
import ExperienceTimeline from "./components/timeline/ExperienceTimeline";

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

export default function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 flex flex-col items-center gap-12 sm:gap-16"
    >
      <ExperienceHeader />
      {items.length > 0 ? (
        <ExperienceTimeline items={items} />
      ) : (
        <p className="text-sm text-ocean">Experience is being updated.</p>
      )}
    </section>
  );
}
