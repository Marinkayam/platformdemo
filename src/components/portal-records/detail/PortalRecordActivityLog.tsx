
import { PortalRecord } from "@/types/portalRecord";
import { Notes } from "@/components/common/Notes";

interface PortalRecordActivityLogProps {
  portalRecord: PortalRecord;
}

export function PortalRecordActivityLog({ portalRecord }: PortalRecordActivityLogProps) {
  return (
    <div className="space-y-6">
      {/* Activity Timeline - Coming Soon */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Coming Soon</p>
        </div>
      </div>
      
      {/* Notes Section */}
      <div>
        <Notes entityId={portalRecord.id} entityType="portal_record" />
      </div>
    </div>
  );
}
