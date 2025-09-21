import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Users } from "lucide-react";
import { ExceptionBanner } from "@/components/ui/exception-banner";

interface ConflictTaskCenterProps {
  conflictCount: number;
  onResolveAll?: () => void;
  lastReviewDays?: number;
}

export function ConflictTaskCenter({
  conflictCount,
  onResolveAll,
  lastReviewDays = 3
}: ConflictTaskCenterProps) {
  if (conflictCount === 0) return null;

  return (
    <ExceptionBanner
      variant="warning"
      icon="triangle-alert"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div>
            <span className="font-medium">Recommended Action:</span>{" "}
            Review and resolve conflict records to maintain data accuracy
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700">
            <Clock className="w-3 h-3" />
            <span>Last review: {lastReviewDays} days ago</span>
          </div>
        </div>
        {onResolveAll && (
          <Button
            onClick={onResolveAll}
            size="sm"
            variant="default"
            className="ml-4"
          >
            <Users className="w-4 h-4 mr-2" />
            Bulk Review
          </Button>
        )}
      </div>
    </ExceptionBanner>
  );
}