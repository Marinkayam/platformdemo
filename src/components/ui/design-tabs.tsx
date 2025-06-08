
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface DesignTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function DesignTabs({ tabs, activeTab, onTabChange, className }: DesignTabsProps) {
  return (
    <div className={cn("border-b mb-6", className)}>
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-3 px-1 relative font-medium text-sm",
              activeTab === tab.id
                ? "text-primary-main border-b-2 border-primary-main"
                : "text-grey-600 hover:text-grey-900"
            )}
          >
            <div className="flex items-center">
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn(
                  "ml-2 px-2 py-0.5 rounded-full text-xs",
                  activeTab === tab.id ? "bg-primary-main/10 text-primary-main" : "bg-grey-100 text-grey-600"
                )}>
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
