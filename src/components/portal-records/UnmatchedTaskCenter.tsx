import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Clock, Sparkles } from "lucide-react";
import { ExceptionBanner } from "@/components/ui/exception-banner";
import BadgePill from "@/components/ui/badge-pill";

interface UnmatchedTaskCenterProps {
  unmatchedCount: number;
  onUploadReport: () => void;
  lastUploadDays?: number;
}

export function UnmatchedTaskCenter({
  unmatchedCount,
  onUploadReport,
  lastUploadDays = 7
}: UnmatchedTaskCenterProps) {
  if (unmatchedCount === 0) return null;

  return (
    <ExceptionBanner
      variant="info"
      icon="sparkles"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div>
            <span className="font-medium">Recommended Action:</span>{" "}
            Upload latest AR/Payment Report to reduce unmatched records
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Last upload: {lastUploadDays} days ago</span>
          </div>
        </div>
        <Button
          onClick={onUploadReport}
          size="sm"
          variant="default"
          className="ml-4"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
      </div>
    </ExceptionBanner>
  );
}