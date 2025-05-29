
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PortalRecordsTabs } from "./PortalRecordsTabs";
import { PortalRecordsFilters } from "./PortalRecordsFilters";
import { PortalRecordFilters } from "./filters/types";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface PortalRecordsHeaderProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onFilterChange: (filters: PortalRecordFilters) => void;
  recordCount: number;
}

export function PortalRecordsHeader({
  tabs,
  activeTab,
  onTabChange,
  onFilterChange,
  recordCount
}: PortalRecordsHeaderProps) {
  return (
    <div className="mb-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portal Records</h1>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      <PortalRecordsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <PortalRecordsFilters onFilterChange={onFilterChange} />
    </div>
  );
}
