
import { Button } from "@/components/ui/button";

interface TableActionsProps {
  onClearSelection: () => void;
  onExcludeAll: () => void;
  onCompare: () => void;
}

export function TableActions({ onClearSelection, onExcludeAll, onCompare }: TableActionsProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onClearSelection}
        className="text-gray-700"
      >
        Clear Selection
      </Button>
      
      <div className="flex gap-2">
        <Button 
          onClick={onExcludeAll}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          Exclude All
        </Button>
        
        <Button 
          onClick={onCompare}
          variant="default"
          className="bg-primary hover:bg-primary-600"
        >
          Compare Selected
        </Button>
      </div>
    </div>
  );
}
