import { GearCategory } from "../gear.types";
import GearCard from "./GearCard";

interface GearContainerProps {
  categories: GearCategory[];
}

export default function GearContainer({ categories }: GearContainerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {categories.map((category, idx) => (
        <GearCard key={category.id} category={category} index={idx} />
      ))}
    </div>
  );
}
