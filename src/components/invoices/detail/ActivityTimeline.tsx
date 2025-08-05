
import React from "react";
import { ActivityItem } from "./ActivityItem";
import { useNotes } from "@/hooks/useNotes";

export function ActivityTimeline() {
  const { activities } = useNotes();

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-4">Activity Timeline</h2>
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/50 to-gray-200"></div>
        
        {/* Timeline events */}
        <div className="space-y-6">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
