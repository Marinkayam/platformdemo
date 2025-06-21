
import { PortalRecord } from "@/types/portalRecord";

interface ActivityLogTabProps {
  record: PortalRecord;
}

interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  user: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function ActivityLogTab({ record }: ActivityLogTabProps) {
  // Mock activity data - in real implementation, this would come from an API
  const activities: ActivityItem[] = [
    {
      id: "1",
      timestamp: record.lastSynced,
      action: "Record Synced",
      description: `Portal record synced successfully from ${record.portal}`,
      user: "System",
      status: "success"
    },
    {
      id: "2",
      timestamp: "Jun 14, 2025  09:15",
      action: "Status Updated",
      description: `Portal status changed to ${record.portalStatus}`,
      user: "System",
      status: "info"
    },
    {
      id: "3",
      timestamp: "Jun 13, 2025  16:30",
      action: "Record Created",
      description: "Portal record created and linked to invoice",
      user: "System",
      status: "success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
