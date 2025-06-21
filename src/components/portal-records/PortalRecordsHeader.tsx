
import { PageHeader } from "@/components/common/PageHeader";
import { PortalRecordsActions } from "./PortalRecordsActions";

interface PortalRecordsHeaderProps {
  recordCount: number;
}

export function PortalRecordsHeader({
  recordCount
}: PortalRecordsHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <PageHeader 
        title="Portal Records" 
        subtitle="Monto is actively syncing documents from your portals. Use this view to monitor account connections, status, and history."
      />
      <PortalRecordsActions recordCount={recordCount} />
    </div>
  );
}
