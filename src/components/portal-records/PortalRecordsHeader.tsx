
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

interface PortalRecordsHeaderProps {
  recordCount: number;
}

export function PortalRecordsHeader({
  recordCount
}: PortalRecordsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <PageHeader 
        title="Portal Records" 
        subtitle={`Track synced records and their invoice statuses across portals (${recordCount} total records)`}
      />
      
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Record
      </Button>
    </div>
  );
}
