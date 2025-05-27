
import { cn } from "@/lib/utils";

interface PurchaseOrderTab {
  id: string;
  label: string;
  count?: number;
}

interface PurchaseOrderTabsProps {
  tabs: PurchaseOrderTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PurchaseOrderTabs({ tabs, activeTab, onTabChange }: PurchaseOrderTabsProps) {
  return (
    <div className="border-b mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-3 px-1 relative font-medium text-sm",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <div className="flex items-center">
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn(
                  "ml-2 px-2 py-0.5 rounded-full text-xs",
                  activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
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
