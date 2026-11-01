import { ExperienceItem as ExperienceItemType } from "../../experience.types";
import ExperienceItem from "./ExperienceItem";

interface ExperienceTimelineProps {
  items: ExperienceItemType[];
}

export default function ExperienceTimeline({
  items,
}: ExperienceTimelineProps) {
  return (
    <div className="relative w-full max-w-5xl 2xl:max-w-6xl mx-auto py-2">
      {/* Continuous Timeline Spine */}
      <div
        className="absolute left-5 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-mint via-horizon to-deep-ocean/20"
        aria-hidden="true"
      />

      {/* Decorative top and bottom spine endpoints */}
      <div
        className="absolute left-5 md:left-1/2 -translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-md bg-mint rotate-45 shadow-xs"
        aria-hidden="true"
      />
      <div
        className="absolute left-5 md:left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 rounded-md bg-horizon rotate-45 shadow-xs"
        aria-hidden="true"
      />

      <ol
        className="relative flex flex-col gap-10 md:gap-14 w-full list-none p-0 m-0"
        aria-label="Career experience timeline"
      >
        {items.map((item, index) => (
          <ExperienceItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
