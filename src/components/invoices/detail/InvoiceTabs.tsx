
import { FileText, FileX, Database, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";

interface InvoiceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  activityCount?: number;
  invoiceStatus?: string;
}

export function InvoiceTabsNav({ activeTab, onTabChange, activityCount = 0, invoiceStatus }: InvoiceTabsProps) {
  // Base tabs that should always show
  const baseTabs = [
    { id: "invoice-data", icon: <FileText className="h-4 w-4" />, label: "Invoice Data", tooltip: null },
    { id: "rtp-data", icon: <Database className="h-4 w-4" />, label: "RTP Data", 
      tooltip: "View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal." },
    { id: "portal-records", icon: <Database className="h-4 w-4" />, label: "Portal Records", tooltip: null },
    { id: "activity", icon: <Activity className="h-4 w-4" />, label: "Activity", tooltip: null },
  ];
  
  // Only add Exceptions tab for "Pending Action" status
  const tabs = [...baseTabs];
  if (invoiceStatus === "Pending Action") {
    tabs.splice(1, 0, { 
      id: "exceptions", 
      icon: <FileX className="h-4 w-4" />, 
      label: "Exceptions", 
      tooltip: null 
    });
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
                  {tab.id === "activity" && activityCount > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {activityCount}
                    </Badge>
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
