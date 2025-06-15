
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ForceSubmitModal } from "./ForceSubmitModal";

interface ActionButtonsProps {
  attachmentsCount: number;
  onForceSubmit: () => void;
  onMarkAsResolved: () => void;
}

export function ActionButtons({ attachmentsCount, onForceSubmit, onMarkAsResolved }: ActionButtonsProps) {
  const [isForceSubmitModalOpen, setIsForceSubmitModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={() => setIsForceSubmitModalOpen(true)}
        >
          Force Submit
        </Button>
        <Button 
          disabled={attachmentsCount === 0}
          onClick={onMarkAsResolved}
        >
          Mark as Solved
        </Button>
      </div>

      <ForceSubmitModal 
        isOpen={isForceSubmitModalOpen}
        onClose={() => setIsForceSubmitModalOpen(false)}
        onConfirm={onForceSubmit}
      />
    </>
  );
}
