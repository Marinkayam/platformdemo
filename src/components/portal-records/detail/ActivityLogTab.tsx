
import { PortalRecord } from "@/types/portalRecord";
import { Notes } from "@/components/common/Notes";

interface ActivityLogTabProps {
  record: PortalRecord;
}

export function ActivityLogTab({ record }: ActivityLogTabProps) {
  return (
    <div className="space-y-6">
      {/* Activity Timeline - Coming Soon */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Coming Soon</p>
        </div>
      </div>
      
      {/* Notes Section */}
      <div>
        <Notes entityId={record.id} entityType="portal_record" />
      </div>
    </div>
  );
}
