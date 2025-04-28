
import React from "react";
import { Check, AlertTriangle, MessageSquare, File, RefreshCw } from "lucide-react";
import { formatDistance } from "date-fns";

// Mock activity data
const activityData = [
  {
    id: "a1",
    type: "status",
    title: "Status changed to Pending Action",
    user: "John Smith",
    timestamp: new Date(2024, 3, 25, 14, 30),
    description: "Invoice requires approval from finance department"
  },
  {
    id: "a2",
    type: "document",
    title: "Document uploaded",
    user: "Maria Garcia",
    timestamp: new Date(2024, 3, 24, 11, 15),
    description: "Supporting_Document.pdf"
  },
  {
    id: "a3",
    type: "note",
    title: "Note added",
    user: "Alex Wong",
    timestamp: new Date(2024, 3, 24, 9, 45),
    description: "Verified vendor details"
  },
  {
    id: "a4",
    type: "system",
    title: "Invoice created",
    user: "System",
    timestamp: new Date(2024, 3, 23, 16, 20),
    description: null
  }
];

// Activity icon by type
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "system":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
        <Check className="h-4 w-4 text-green-600" />
      </div>;
    case "status":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
        <RefreshCw className="h-4 w-4 text-orange-600" />
      </div>;
    case "document":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
        <File className="h-4 w-4 text-purple-600" />
      </div>;
    case "note":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
        <MessageSquare className="h-4 w-4 text-blue-600" />
      </div>;
    case "warning":
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
      </div>;
    default:
      return <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
        <Check className="h-4 w-4 text-gray-600" />
      </div>;
  }
};

export function ActivityTimeline() {
  const formatTimestamp = (date: Date): string => {
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-4">Activity Timeline</h2>
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200"></div>
        
        {/* Timeline events */}
        <div className="space-y-6">
          {activityData.map((activity) => (
            <div key={activity.id} className="relative">
              {/* Timeline icon */}
              <div className="absolute -left-6 mt-1 bg-white">
                <ActivityIcon type={activity.type} />
              </div>
              
              {/* Content */}
              <div>
                <div className="flex flex-col">
                  <h3 className="font-medium">{activity.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    By {activity.user} • {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
                {activity.description && (
                  <p className="mt-1 text-sm">{activity.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
