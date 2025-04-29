
import { FileText, FileX, Database, Activity, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoiceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function InvoiceTabsNav({ activeTab, onTabChange }: InvoiceTabsProps) {
  const tabs = [
    { id: "invoice-data", icon: <FileText className="h-4 w-4" />, label: "Invoice Data" },
    { id: "exceptions", icon: <FileX className="h-4 w-4" />, label: "Exceptions" },
    { id: "rtp-data", icon: <Database className="h-4 w-4" />, label: "RTP Data" },
    { id: "smart-connection", icon: <Brain className="h-4 w-4" />, label: "Smart Connection" },
    { id: "portal-records", icon: <Database className="h-4 w-4" />, label: "Portal Records" },
    { id: "activity", icon: <Activity className="h-4 w-4" />, label: "Activity" },
  ];

  return (
    <div className="border-b mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
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
          </button>
        ))}
      </div>
    </div>
  );
}
