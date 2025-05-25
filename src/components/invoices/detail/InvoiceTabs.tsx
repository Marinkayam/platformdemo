
import { FileText, FileX, File, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";

// Custom icons for RTP Data and Portal Records
const FileQuestionIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 17h.01"/>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
    <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/>
  </svg>
);

const FileStackIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 7h-3a2 2 0 0 1-2-2V2"/>
    <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z"/>
    <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15"/>
    <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"/>
  </svg>
);

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
    { id: "rtp-data", icon: <FileQuestionIcon className="h-4 w-4" />, label: "RTP Data", 
      tooltip: "View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal." },
    { id: "portal-records", icon: <FileStackIcon className="h-4 w-4" />, label: "Portal Records", tooltip: null },
    { id: "activity", icon: <MessageSquareText className="h-4 w-4" />, label: "Activity", tooltip: null },
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
