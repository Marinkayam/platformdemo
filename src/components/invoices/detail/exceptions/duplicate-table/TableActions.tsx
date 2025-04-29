
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TableActionsProps {
  onClearSelection: () => void;
  onExcludeAll: () => void;
  onConfirmSelection: () => void;
}

export function TableActions({ onClearSelection, onExcludeAll, onConfirmSelection }: TableActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <Button 
        onClick={onExcludeAll}
        variant="outline"
        className="border-red-300 text-red-700 hover:bg-red-50"
      >
        Exclude All
      </Button>
      
      <Button 
        onClick={onConfirmSelection}
        variant="default"
        className="bg-primary hover:bg-primary-600"
      >
        <Check className="h-4 w-4 mr-1" />
        Confirm Selection
      </Button>
    </div>
  );
}
