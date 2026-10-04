import { ExperienceItem as ExperienceItemType } from "../experience.types";
import ExperienceItem from "./ExperienceItem";

interface ExperienceTimelineProps {
  items: ExperienceItemType[];
}

export default function ExperienceTimeline({
  items,
}: ExperienceTimelineProps) {
  return (
    <div className="flex flex-col w-full lg:w-7/12">
      {items.map((item, index) => (
        <ExperienceItem
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
