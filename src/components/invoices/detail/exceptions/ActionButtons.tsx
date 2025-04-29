
import React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  attachmentsCount: number;
  onForceSubmit: () => void;
  onMarkAsResolved: () => void;
}

export function ActionButtons({ attachmentsCount, onForceSubmit, onMarkAsResolved }: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <Button variant="outline" onClick={onForceSubmit}>
        Force Submit
      </Button>
      <Button 
        disabled={attachmentsCount === 0}
        onClick={onMarkAsResolved}
        className={`${attachmentsCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Mark as Solved
      </Button>
    </div>
  );
}
