import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  tooltip?: string | null;
}

interface TabsNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabsNav({ tabs, activeTab, onTabChange }: TabsNavProps) {
  return (
    <div className="border-b mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <TooltipProvider key={tab.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "py-3 px-1 relative font-medium text-sm flex items-center gap-2 transition-colors",
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs",
                      activeTab === tab.id ? "bg-[#EFEBFF] font-normal" : "bg-gray-100 font-normal"
                    )}>
                      {tab.count}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              {tab.tooltip && (
                <TooltipContent className="max-w-sm">
                  <p>{tab.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
} 