import { FileText, MessageSquareText } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";

interface PurchaseOrderTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  activityCount?: number;
}

export function PurchaseOrderTabs({ activeTab, onTabChange, activityCount = 0 }: PurchaseOrderTabsProps) {
  const tabs = [
    { id: "po-data", icon: <FileText className="h-4 w-4" />, label: "PO Data", tooltip: null },
    { id: "activity", icon: <MessageSquareText className="h-4 w-4" />, label: "Activity", count: activityCount, tooltip: null },
  ];

  return (
    <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
  );
}
