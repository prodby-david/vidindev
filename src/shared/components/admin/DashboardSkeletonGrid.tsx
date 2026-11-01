export interface DashboardSkeletonGridProps {
  count?: number;
  columnsClassName?: string;
}

export default function DashboardSkeletonGrid({
  count = 3,
  columnsClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
}: DashboardSkeletonGridProps) {
  return (
    <div className={`grid ${columnsClassName} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-44 rounded-md border border-deep-ocean/10 dark:border-horizon/15 bg-sand/20 dark:bg-sand/30 animate-pulse p-5 flex flex-col justify-between"
        >
          <div className="h-5 w-1/3 bg-sand/40 rounded" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-sand/40 rounded" />
            <div className="h-6 w-20 bg-sand/40 rounded" />
            <div className="h-6 w-14 bg-sand/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { DashboardSkeletonGrid };
