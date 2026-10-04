interface DashboardBadgeProps {
  label: string;
  variant?: "default" | "horizon" | "mint";
}

export default function DashboardBadge({
  label,
  variant = "default",
}: DashboardBadgeProps) {
  const variantStyles = {
    default:
      "bg-sand/60 dark:bg-sand/30 text-deep-ocean border border-deep-ocean/10 dark:border-horizon/20",
    horizon:
      "bg-horizon/10 text-horizon border border-horizon/25",
    mint:
      "bg-mint/30 dark:bg-mint/15 text-deep-ocean border border-mint/40",
  };

  return (
    <span
      className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full select-none ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
