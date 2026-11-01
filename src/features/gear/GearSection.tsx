import { GearCategory } from "./gear.types";
import GearHeader from "./components/GearHeader";
import GearContainer from "./components/GearContainer";

interface GearSectionProps {
  categories: GearCategory[];
}

export default function GearSection({ categories }: GearSectionProps) {
  return (
    <section
      id="gear"
      className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 pb-16 sm:pb-20 flex flex-col gap-10"
    >
      <GearHeader />
      {categories.length > 0 ? (
        <GearContainer categories={categories} />
      ) : (
        <p className="text-sm text-ocean">The toolbox is being updated.</p>
      )}
    </section>
  );
}
