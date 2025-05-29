
import { PortalRecordsTabs } from "@/components/portal-records/PortalRecordsTabs";
import { PortalRecordsFilters } from "@/components/portal-records/PortalRecordsFilters";
import { PortalRecordFilters } from "@/components/portal-records/filters/types";
import { PageHeader } from "@/components/common/PageHeader";

interface PortalRecordsHeaderProps {
  tabs: {
    id: string;
    label: string;
    count: number;
  }[];
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
    <>
      <PageHeader 
        title="Portal Records" 
        subtitle="View and manage portal record matches and conflicts" 
      />
      
      <PortalRecordsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      
      <div className="flex justify-between items-center mb-6">
        <PortalRecordsFilters onFilterChange={onFilterChange} />
        <div className="text-sm text-gray-600">
          {recordCount} record{recordCount !== 1 ? 's' : ''}
        </div>
      </div>
    </>
  );
}
