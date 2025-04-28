
import React from "react";
import { ActivityItem } from "./ActivityItem";

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

export function ActivityTimeline() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-4">Activity Timeline</h2>
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200"></div>
        
        {/* Timeline events */}
        <div className="space-y-6">
          {activityData.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
