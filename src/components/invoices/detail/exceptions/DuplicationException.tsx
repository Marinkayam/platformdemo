
import { useState } from "react";
import { TriangleAlert, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExceptionBanner } from "@/components/ui/exception-banner";
import { Invoice } from "@/types/invoice";
import { DuplicationResolutionModal } from "./DuplicationResolutionModal";
import { ComparisonTable } from "./ComparisonTable";
import { useNotes } from "@/hooks/useNotes";
import BadgePill from "@/components/ui/badge-pill";

interface DuplicationExceptionProps {
  currentInvoice: Invoice;
  duplicateInvoice: Invoice;
  onResolve: (action: 'REPLACE' | 'KEEP_CURRENT' | 'EXCLUDE_BOTH') => void;
}

export function DuplicationException({ 
  currentInvoice, 
  duplicateInvoice, 
  onResolve 
}: DuplicationExceptionProps) {
  const [selectedAction, setSelectedAction] = useState<'REPLACE' | 'KEEP_CURRENT' | 'EXCLUDE_BOTH'>('KEEP_CURRENT');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { addActivity } = useNotes();

  const handleResolve = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmResolve = () => {
    // Add resolution action to activity timeline
    let activityTitle = "";
    let activityDescription = "";
    
    switch(selectedAction) {
      case 'KEEP_CURRENT':
        activityTitle = "Duplicate Exception Resolved";
        activityDescription = `Kept current invoice ${currentInvoice.number} from ${currentInvoice.buyer} and excluded duplicate from ${duplicateInvoice.buyer}`;
        break;
      case 'REPLACE':
        activityTitle = "Duplicate Exception Resolved";
        activityDescription = `Replaced invoice ${currentInvoice.number} with version from ${duplicateInvoice.buyer}`;
        break;
      case 'EXCLUDE_BOTH':
        activityTitle = "Duplicate Exception Resolved";
        activityDescription = `Excluded both versions of invoice ${currentInvoice.number} from Monto processing`;
        break;
    }
    
    // Add the activity to the timeline
    addActivity("exception", activityTitle, activityDescription);
    
    // Call the original onResolve
    onResolve(selectedAction);
    setShowConfirmModal(false);
  };

  const getButtonText = () => {
    switch (selectedAction) {
      case 'KEEP_CURRENT':
        return 'Keep Current';
      case 'REPLACE':
        return 'Replace with New';
      case 'EXCLUDE_BOTH':
        return 'Exclude Both';
      default:
        return 'Resolve Exception';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Resolve Exception title and Duplication chip */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
          <BadgePill label="Duplication" color="error" variant="secondary" />
        </div>
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <p style={{ color: '#38415F' }} className="text-sm">
            Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
          </p>
        </div>
      </div>

      <ExceptionBanner 
        variant="error" 
        icon="alert"
        title="Duplication Detected"
      >
        Invoice {currentInvoice.number} has been submitted multiple times with different details.
      </ExceptionBanner>

      <ExceptionBanner 
        variant="info" 
        icon="sparkles"
        title="Action Required"
      >
        Compare both versions below and choose how to resolve this duplication. 
        Select the version you want to keep or exclude both if needed.
      </ExceptionBanner>

      {/* Comparison Table without inner box */}
      <ComparisonTable 
        currentInvoice={currentInvoice}
        duplicateInvoice={duplicateInvoice}
      />

      {/* Resolution Selector */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resolution Options</h3>
          <RadioGroup value={selectedAction} onValueChange={(value) => setSelectedAction(value as any)}>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="KEEP_CURRENT" id="keep-current" className="mt-1" />
                <div>
                  <Label htmlFor="keep-current" className="font-medium text-gray-900 cursor-pointer">
                    Keep the current invoice and discard this new one
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    The original invoice ({currentInvoice.buyer}) will be processed. The duplicate will be marked as resolved.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="REPLACE" id="replace" className="mt-1" />
                <div>
                  <Label htmlFor="replace" className="font-medium text-gray-900 cursor-pointer">
                    Replace the current invoice with this new version
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    The new invoice ({duplicateInvoice.buyer}) will replace the original and be processed instead.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="EXCLUDE_BOTH" id="exclude-both" className="mt-1" />
                <div>
                  <Label htmlFor="exclude-both" className="font-medium text-gray-900 cursor-pointer">
                    Exclude Both Invoices
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Both invoices will be Excluded from monto.
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleResolve}
              className="px-6"
            >
              {getButtonText()}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <DuplicationResolutionModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        onConfirm={handleConfirmResolve}
        action={selectedAction}
        invoiceNumber={currentInvoice.number}
      />
    </div>
  );
}
