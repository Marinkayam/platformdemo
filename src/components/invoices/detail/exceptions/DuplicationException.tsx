
import { useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/types/invoice";
import { DuplicationResolutionModal } from "./DuplicationResolutionModal";
import { ComparisonTable } from "./ComparisonTable";

interface DuplicationExceptionProps {
  currentInvoice: Invoice;
  duplicateInvoice: Invoice;
  onResolve: (action: 'REPLACE' | 'KEEP_CURRENT' | 'FORCE_SUBMIT') => void;
}

export function DuplicationException({ 
  currentInvoice, 
  duplicateInvoice, 
  onResolve 
}: DuplicationExceptionProps) {
  const [selectedAction, setSelectedAction] = useState<'REPLACE' | 'KEEP_CURRENT' | 'FORCE_SUBMIT'>('KEEP_CURRENT');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleResolve = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmResolve = () => {
    onResolve(selectedAction);
    setShowConfirmModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Resolve Exception title and Duplication chip */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Resolve Exception</h2>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          Duplication
        </Badge>
      </div>

      {/* Clean Alert Banner */}
      <Alert className="border-red-200 bg-white">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-gray-900">
          <strong>Duplication Detected:</strong> Invoice {currentInvoice.number} has been submitted multiple times with different details.
        </AlertDescription>
      </Alert>

      {/* Clean Info Box */}
      <Alert className="border-blue-200 bg-white">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-gray-700">
          <strong>Action Required:</strong> Compare both versions below and choose how to resolve this duplication. 
          Select the version you want to keep or force submit both if needed.
        </AlertDescription>
      </Alert>

      {/* Comparison Table using Lovable Table System */}
      <Card>
        <CardContent className="p-6">
          <ComparisonTable 
            currentInvoice={currentInvoice}
            duplicateInvoice={duplicateInvoice}
          />
        </CardContent>
      </Card>

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
                <RadioGroupItem value="FORCE_SUBMIT" id="force-submit" className="mt-1" />
                <div>
                  <Label htmlFor="force-submit" className="font-medium text-gray-900 cursor-pointer">
                    Submit this version anyway (Force Submit)
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Both invoices will be processed. Use only if you're certain they represent different transactions.
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
              Resolve Exception
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
