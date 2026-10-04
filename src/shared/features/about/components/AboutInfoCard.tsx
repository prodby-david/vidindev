import { AboutInfoItem } from "../about.types";
import { ABOUT_INFO_ICON_MAP } from "../constants";

interface AboutInfoCardProps {
  item: AboutInfoItem;
}

export default function AboutInfoCard({ item }: AboutInfoCardProps) {
  const IconComponent = ABOUT_INFO_ICON_MAP[item.iconName];

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-1.5 text-deep-ocean">
        <IconComponent size={20} className="text-horizon" />
      </div>

      <span className="text-[11px] font-bold tracking-wider text-ocean uppercase mt-1">
        {item.label}
      </span>

      <span className="text-sm sm:text-base font-bold text-deep-ocean">
        {item.value}
      </span>
    </div>
  );
}
