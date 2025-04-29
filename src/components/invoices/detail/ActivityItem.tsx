
import React from "react";
import { Check, AlertTriangle, MessageSquare, File, RefreshCw } from "lucide-react";

interface ActivityItemProps {
  activity: {
    id: string;
    type: string;
    title: string;
    user: string;
    timestamp: Date;
    description: string | null;
  }
}

// Activity icon by type
export const ActivityIcon = ({ type }: { type: string }) => {
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

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const formatTimestamp = (date: Date): string => {
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="relative">
      {/* Timeline icon */}
      <div className="absolute -left-6 mt-1 bg-white">
        <ActivityIcon type={activity.type} />
      </div>
      
      {/* Content - Added more margin-left for better spacing */}
      <div className="ml-4">
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
  );
};
