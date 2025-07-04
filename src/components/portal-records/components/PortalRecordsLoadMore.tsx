import React from "react";
import { Button } from "@/components/ui/button";

interface PortalRecordsLoadMoreProps {
  hasMore: boolean;
  isLoadingMore: boolean;
  remainingCount: number;
  onLoadMore: () => void;
}

export function PortalRecordsLoadMore({
  hasMore,
  isLoadingMore,
  remainingCount,
  onLoadMore,
}: PortalRecordsLoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center py-4">
      <Button
        onClick={onLoadMore}
        disabled={isLoadingMore}
        variant="outline"
        className="animate-fade-in"
      >
        {isLoadingMore ? 'Loading...' : `Load ${Math.min(10, remainingCount)} more records`}
      </Button>
    </div>
  );
}