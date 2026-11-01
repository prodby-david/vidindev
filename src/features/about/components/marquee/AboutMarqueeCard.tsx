import Image from "next/image";
import { AboutMarqueeItem } from "../../about.types";

interface AboutMarqueeCardProps {
  item: AboutMarqueeItem;
  onSelect: (item: AboutMarqueeItem) => void;
}

export default function AboutMarqueeCard({
  item,
  onSelect,
}: AboutMarqueeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="w-56 sm:w-64 md:w-72 h-72 sm:h-80 md:h-88 flex-shrink-0 flex flex-col p-2.5 sm:p-3 rounded-md bg-polaroid dark:bg-polaroid border border-deep-ocean/10 dark:border-horizon/15 shadow-sm hover:shadow-xl hover:border-horizon/30 hover:scale-[1.03] transition-all duration-400 ease-out transform-gpu will-change-transform origin-center group cursor-pointer text-left"
    >
      <div className="relative w-full flex-1 rounded-md overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 256px, 288px"
          className="object-contain"
        />
      </div>

      <div className="pt-2.5 pb-1 px-1 text-center">
        <p className="text-base sm:text-lg font-semibold font-handwritten text-deep-ocean/90 dark:text-deep-ocean leading-tight select-none truncate">
          {item.caption}
        </p>
      </div>
    </button>
  );
}
