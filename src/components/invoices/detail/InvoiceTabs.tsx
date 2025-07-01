
import { FileText, FileX, Database, FileSpreadsheet, MessageSquareText, Link } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";

interface InvoiceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  activityCount?: number;
  invoiceStatus?: string;
}

export function InvoiceTabsNav({ activeTab, onTabChange, activityCount = 0, invoiceStatus }: InvoiceTabsProps) {
  const baseTabs = [
    { id: "invoice-data", icon: <FileText className="h-4 w-4" />, label: "Invoice Data", tooltip: null },
    { id: "rtp-data", icon: <Database className="h-4 w-4" />, label: "RTP Data", 
      tooltip: "View the full payment request (RTP) data, including Smart Connection details, PO information, and payable/receivable fields, enriched by Monto for accurate processing in the portal." },
    { id: "portal-records", icon: <FileSpreadsheet className="h-4 w-4" />, label: "Portal Records", tooltip: null },
    { id: "smart-connection", icon: <Link className="h-4 w-4" />, label: "Smart Connection", tooltip: null },
    { id: "activity", icon: <MessageSquareText className="h-4 w-4" />, label: "Activity", count: activityCount, tooltip: null },
  ];
  
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
    <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
  );
}
