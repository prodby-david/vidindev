export interface FilterTabOption<T extends string = string> {
  id: T;
  label: string;
}

export interface DashboardFilterTabsProps<T extends string = string> {
  tabs: Array<FilterTabOption<T>>;
  activeTab: T;
  onTabChange: (tabId: T) => void;
  className?: string;
}

export default function DashboardFilterTabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: DashboardFilterTabsProps<T>) {
  return (
    <div
      className={`flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? "bg-ocean text-white shadow-xs"
                : "bg-sand/40 dark:bg-sand/30 text-ocean hover:text-deep-ocean hover:bg-sand/60"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export { DashboardFilterTabs };
