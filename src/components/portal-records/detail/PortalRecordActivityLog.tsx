
import { PortalRecord } from "@/types/portalRecord";
import { ActivityLog } from "@/components/common/ActivityLog";

interface PortalRecordActivityLogProps {
  portalRecord: PortalRecord;
}

export function PortalRecordActivityLog({ portalRecord }: PortalRecordActivityLogProps) {
  return (
    <ActivityLog entityId={portalRecord.id} entityType="portal_record" />
  );
}
