
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
  variant?: "horizontal" | "sidebar";
}

export function TabsNav({ tabs, activeTab, onTabChange, variant = "horizontal" }: TabsNavProps) {
  if (variant === "sidebar") {
    return (
      <nav className="px-6">
        <div className="space-y-1">
          {tabs.map((tab) => (
            <TooltipProvider key={tab.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                      "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left",
                      activeTab === tab.id
                        ? "bg-white text-[#7b61ff] shadow-sm border border-gray-200"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {tab.icon}
                    <span className="flex-1">{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={cn(
                        "ml-2 px-2 py-0.5 rounded-full text-xs",
                        activeTab === tab.id ? "bg-[#EFEBFF] text-[#7b61ff]" : "bg-gray-100 text-gray-600"
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
      </nav>
    );
  }

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
