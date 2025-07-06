
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExceptionBanner } from "@/components/ui/exception-banner";
import { WandSparkles } from "lucide-react";
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
        <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          PO
        </Badge>
      </div>

      <ExceptionBanner 
        variant="error" 
        icon="alert"
        title="PO Line Items"
      >
        Monto could not find or select PO line items that matches the invoice details
      </ExceptionBanner>

      {/* Resolution guidance without background container */}
      <div className="flex items-start gap-3">
        <WandSparkles className="mt-0.5 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
        <div>
          <p style={{ color: '#38415F' }} className="text-sm">
            To resolve these issues select PO line items that matches the invoice details
          </p>
        </div>
      </div>

      {/* Instructions Text Field */}
      <Card className="shadow-none">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
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

            {/* Action Buttons - Right aligned */}
            <div className="pt-4 flex justify-end gap-3">
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
