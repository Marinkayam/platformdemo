
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { Exception } from "@/types/exception";
import { Invoice } from "@/types/invoice";
import { ResolutionOptions } from "./extra-data/ResolutionOptions";

interface POLineItemsExceptionHandlerProps {
  exceptions: Exception[];
  invoice?: Invoice;
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
}

export function POLineItemsExceptionHandler({ 
  exceptions, 
  invoice, 
  onResolveException 
}: POLineItemsExceptionHandlerProps) {
  const [instructions, setInstructions] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const handleMarkAsResolved = () => {
    exceptions.forEach(exception => {
      onResolveException(exception.id, 'MARK_RESOLVED');
    });
  };

  const handleResolutionAction = () => {
    let resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED' = 'MARK_RESOLVED';
    
    switch(selectedAction) {
      case 'force_submit':
        resolution = 'FORCE_SUBMIT';
        break;
      case 'exclude':
        resolution = 'EXCLUDED';
        break;
      case 'resolve_outside':
        resolution = 'MARK_RESOLVED';
        break;
      default:
        resolution = 'MARK_RESOLVED';
    }
    
    exceptions.forEach(exception => {
      onResolveException(exception.id, resolution);
    });
  };

  return (
    <div className="space-y-6">
      {/* Exception Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Resolve Exception</h2>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          PO
        </Badge>
      </div>

      {/* Red Warning Banner - Updated styling to match INV-10032100 */}
      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
        <div className="flex items-start gap-3">
          <AlertTriangle 
            strokeWidth={1.25} 
            className="mt-1 flex-shrink-0 text-red-600" 
            size={18} 
          />
          <div>
            <p className="text-gray-900 text-sm">
              <span className="font-semibold">⚠️ PO Line Items:</span> Monto Could not find or select PO line items that matches the invoice details
            </p>
          </div>
        </div>
      </div>

      {/* Resolution Instructions Banner - Updated styling to match INV-10032100 */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div className="text-blue-800">
          <p className="text-gray-900 text-sm">
            <span className="font-semibold">Resolution Instructions from Back Office:</span> To resolve these issues select PO line items that matches the invoice details
          </p>
        </div>
      </div>

      {/* Instructions Text Field */}
      <Card className="shadow-none">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions for Resolution
              </label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Please write instructions for solving the exception"
                className="min-h-[100px]"
              />
            </div>

            {/* Other Resolution Options */}
            <div className="pt-4">
              <ResolutionOptions
                selectedAction={selectedAction}
                showOtherOptions={showOtherOptions}
                onSelectedActionChange={setSelectedAction}
                onShowOtherOptionsChange={setShowOtherOptions}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <Button 
                onClick={handleMarkAsResolved}
                className="bg-monto-purple hover:bg-purple-700 text-white"
              >
                Mark as Resolved
              </Button>
              {selectedAction && (
                <Button 
                  onClick={handleResolutionAction}
                  variant="outline"
                  className="border-gray-300"
                >
                  {selectedAction === 'force_submit' && 'Force Submit'}
                  {selectedAction === 'exclude' && 'Exclude'}
                  {selectedAction === 'resolve_outside' && 'Resolve Outside Monto'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
