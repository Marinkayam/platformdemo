
import { PageHeader } from "@/components/common/PageHeader";

interface PortalRecordsHeaderProps {
  recordCount: number;
}

export function PortalRecordsHeader({
  recordCount
}: PortalRecordsHeaderProps) {
  return (
    <PageHeader 
      title="Portal Records" 
      subtitle="Monto is actively syncing documents from your portals. Use this view to monitor account connections, status, and history."
    />
  );
}
