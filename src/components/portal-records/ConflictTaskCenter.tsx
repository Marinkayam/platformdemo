import React from "react";
import { Clock } from "lucide-react";
import { ExceptionBanner } from "@/components/ui/exception-banner";

interface ConflictTaskCenterProps {
  conflictCount: number;
  lastReviewDays?: number;
}

export function ConflictTaskCenter({
  conflictCount,
  lastReviewDays = 3
}: ConflictTaskCenterProps) {
  if (conflictCount === 0) return null;

  return (
    <ExceptionBanner
      variant="info"
      icon="sparkles"
    >
      <div className="space-y-4">
        <div>
          <span className="font-medium">Recommended Action:</span>{" "}
          Review and resolve conflict records to maintain data accuracy
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Last review: {lastReviewDays} days ago</span>
        </div>
      </div>
    </ExceptionBanner>
  );
}