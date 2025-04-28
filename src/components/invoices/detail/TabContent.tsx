
import { Activity } from "lucide-react";

interface TabContentProps {
  tab: string;
}

export function TabContent({ tab }: TabContentProps) {
  switch (tab) {
    case "exceptions":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No exceptions found for this invoice.</p>
        </div>
      );
    case "rtp-data":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No RTP data available.</p>
        </div>
      );
    case "portal-records":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No portal records found.</p>
        </div>
      );
    case "activity":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Activity size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Invoice created</span>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Activity size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Status updated to Pending Action</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
