
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

interface FooterActionsProps {
  onBack: () => void;
  onExcludeAll: () => void;
  onContinue: () => void;
  isSelectionValid: boolean;
}

export function FooterActions({ onBack, onExcludeAll, onContinue, isSelectionValid }: FooterActionsProps) {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onExcludeAll}
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          Exclude All
        </Button>
        
        <Button 
          onClick={onContinue} 
          disabled={!isSelectionValid}
        >
          <Check className="mr-1 h-4 w-4" /> Select This Invoice
        </Button>
      </div>
    </div>
  );
}
