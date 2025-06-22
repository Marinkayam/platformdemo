
import { FileText, MessageSquareText } from "lucide-react";
import { TabsNav } from "@/components/common/TabsNav";

interface PortalRecordTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  activityCount?: number;
}

export function PortalRecordTabs({ activeTab, onTabChange, activityCount = 0 }: PortalRecordTabsProps) {
  const tabs = [
    { id: "record-data", icon: <FileText className="h-4 w-4" />, label: "Record Data", tooltip: null },
    { id: "activity-log", icon: <MessageSquareText className="h-4 w-4" />, label: "Activity Log", count: activityCount, tooltip: null },
  ];

  return (
    <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
  );
}
