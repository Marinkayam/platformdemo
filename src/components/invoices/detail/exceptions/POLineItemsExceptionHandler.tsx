import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { Exception } from "@/types/exception";
import { Invoice } from "@/types/invoice";

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

  const handleMarkAsResolved = () => {
    exceptions.forEach(exception => {
      onResolveException(exception.id, 'MARK_RESOLVED');
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

      {/* Red Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">
              ⚠️ PO Line Items: Monto Could not find or select PO line items that matches the invoice details
            </p>
          </div>
        </div>
      </div>

      {/* Resolution Instructions Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-blue-800">
          <p className="font-medium mb-2">Resolution Instructions from Back Office:</p>
          <p>To resolve these issues select PO line items that matches the invoice details</p>
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
              <h3 className="text-sm font-medium text-gray-700 mb-4">Other Resolution Options</h3>
              <Button 
                onClick={handleMarkAsResolved}
                className="bg-monto-purple hover:bg-purple-700 text-white"
              >
                Mark as Resolved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
