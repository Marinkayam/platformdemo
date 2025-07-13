import { cn } from "@/lib/utils";
import { formatDistanceToNow, format } from "date-fns";
import { Notes } from "@/components/common/Notes";
import { CheckCircle2, FileText, FolderOpen, MessageSquareText, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

interface ActivityLogProps {
  entityId: string;
  entityType: string;
  className?: string;
}

// Mock data - in a real app, this would come from an API
interface Activity {
  id: string;
  type: string;
  icon: JSX.Element;
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const initialMockActivities: Activity[] = [
  {
    id: "act-1",
    type: "status_change",
    icon: <RefreshCcw className="h-4 w-4 text-orange-500" />,
    title: "Status changed to Pending Action",
    description: "Invoice requires approval from finance department",
    timestamp: new Date(2024, 3, 25, 14, 30).toISOString(), // Apr 25, 2024 02:30 PM
    user: "John Smith"
  },
  {
    id: "act-2",
    type: "document_upload",
    icon: <FolderOpen className="h-4 w-4 text-purple-500" />,
    title: "Document uploaded",
    description: "Supporting_Document.pdf",
    timestamp: new Date(2024, 3, 24, 11, 15).toISOString(), // Apr 24, 2024 11:15 AM
    user: "Maria Garcia"
  },
  {
    id: "act-3",
    type: "note_added",
    icon: <MessageSquareText className="h-4 w-4 text-blue-500" />,
    title: "Note added",
    description: "Verified vendor details",
    timestamp: new Date(2024, 3, 24, 9, 45).toISOString(), // Apr 24, 2024 09:45 AM
    user: "Alex Wong"
  },
  {
    id: "act-4",
    type: "invoice_created",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    title: "Invoice created",
    description: "", // No specific description given for this in the design
    timestamp: new Date(2024, 3, 23, 16, 20).toISOString(), // Apr 23, 2024 04:20 PM
    user: "System"
  },
];

export function ActivityLog({ entityId, entityType, className }: ActivityLogProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate fetching data based on entityId and entityType
    // In a real app, you'd make an API call here.
    // For now, we'll just use the initial mock data.
    setActivities(initialMockActivities);
  }, [entityId, entityType]);

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
        <Notes entityId={entityId} entityType={entityType} />
      </div>
    </div>
  );
} 