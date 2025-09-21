
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PortalRecordTab {
  id: string;
  label: string;
  count: number;
}

interface PortalRecordsTabsProps {
  tabs: PortalRecordTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PortalRecordsTabs({ tabs, activeTab, onTabChange }: PortalRecordsTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tabId: string) => {
    // Update URL based on tab selection
    let newUrl = '/portal-records';
    if (tabId === 'unmatched') {
      newUrl = '/portal-records?status=unmatched';
    } else if (tabId === 'conflict') {
      newUrl = '/portal-records?status=conflicts';
    }
    
    navigate(newUrl);
    onTabChange(tabId);
  };

  return (
    <div className="border-b mb-6">
      <div className="flex space-x-8">
        <TooltipProvider>
          {tabs.map((tab) => {
            const buttonContent = (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "py-3 px-1 relative font-medium text-sm",
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <div className="flex items-center">
                  {tab.label}
                  <span className={cn(
                    "ml-2 px-2 py-0.5 rounded-full text-xs",
                    activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                  )}>
                    {tab.count}
                  </span>
                </div>
              </button>
            );

            // Add tooltip only for conflicts tab
            if (tab.id === 'conflict') {
              return (
                <Tooltip key={tab.id}>
                  <TooltipTrigger asChild>
                    {buttonContent}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Conflicts occur when multiple invoices are linked together. Review and select the correct one.</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return buttonContent;
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
