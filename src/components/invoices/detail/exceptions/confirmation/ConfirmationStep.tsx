
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { InvoiceSummary } from "./InvoiceSummary";
import { InfoPanel } from "./InfoPanel";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface ConfirmationStepProps {
  invoice: Invoice;
  onConfirm: () => void;
  onBack: () => void;
  onExcludeAll: () => void;
}

export function ConfirmationStep({ invoice, onConfirm, onBack, onExcludeAll }: ConfirmationStepProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
  const handleConfirmClick = () => {
    setIsConfirmDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Button 
          variant="ghost" 
          className="pl-0 text-primary hover:text-primary-600 hover:bg-primary-50"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Selection
        </Button>
      </div>
      
      <InvoiceSummary invoice={invoice} />
      
      <InfoPanel />
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={handleConfirmClick}
          className="bg-primary hover:bg-primary-700"
        >
          Confirm Selection
        </Button>
      </div>

      <ConfirmationDialog
        invoice={invoice}
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={onConfirm}
      />
    </div>
  );
}
