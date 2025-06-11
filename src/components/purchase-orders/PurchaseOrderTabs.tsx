import { FileText, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PurchaseOrderTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  activityCount?: number;
}

export function PurchaseOrderTabs({ activeTab, onTabChange, activityCount = 0 }: PurchaseOrderTabsProps) {
  const tabs = [
    { id: "po-data", icon: <FileText className="h-4 w-4" />, label: "PO Data", tooltip: null },
    { id: "activity", icon: <MessageSquareText className="h-4 w-4" />, label: "Activity Log", tooltip: null },
  ];

  return (
    <TabsList>
      {tabs.map((tab) => (
        <TooltipProvider key={tab.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger
                value={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative font-medium text-sm flex items-center gap-2 transition-colors px-4 py-2",
                  "text-gray-600 hover:text-gray-900",
                  "data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
                )}
              >
                {tab.icon}
                {tab.label}
                {tab.id === "activity" && activityCount > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {activityCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TooltipTrigger>
            {tab.tooltip && (
              <TooltipContent className="max-w-sm">
                <p>{tab.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </TabsList>
  );
}
