
import { cn } from "@/lib/utils";

interface PortalRecordTab {
  id: string;
  label: string;
}

interface PortalRecordTabsProps {
  tabs: PortalRecordTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PortalRecordTabs({ tabs, activeTab, onTabChange }: PortalRecordTabsProps) {
  return (
    <div className="border-b">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-3 px-1 relative font-medium text-sm transition-colors",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
