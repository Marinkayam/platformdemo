
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortalRecordsTabsProps {
  tabs: {
    id: string;
    label: string;
    count: number;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PortalRecordsTabs({ tabs, activeTab, onTabChange }: PortalRecordsTabsProps) {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="relative px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <span className="flex items-center gap-2">
                {tab.label}
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full min-w-[20px] text-center data-[state=active]:bg-gray-100">
                  {tab.count}
                </span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
