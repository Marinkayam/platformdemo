
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortalRecordTab {
  id: string;
  label: string;
}

interface PortalRecordTabsProps {
  tabs: PortalRecordTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PortalRecordTabs({ tabs, activeTab, onTabChange }: PortalRecordTabsProps) {
  return (
    <TabsList className="mb-4">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.id} value={tab.id}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
