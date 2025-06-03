
import { useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

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

  const getButtonText = () => {
    switch (selectedAction) {
      case 'REPLACE':
        return 'Replace Invoice';
      case 'KEEP_CURRENT':
        return 'Keep Current';
      case 'FORCE_SUBMIT':
        return 'Force Submit';
      default:
        return 'Resolve';
    }
  };

  const comparisonFields = [
    { label: 'Invoice Number', current: currentInvoice.number, duplicate: duplicateInvoice.number },
    { label: 'Buyer', current: currentInvoice.buyer, duplicate: duplicateInvoice.buyer },
    { label: 'Amount', current: formatCurrency(currentInvoice.total, currentInvoice.currency), duplicate: formatCurrency(duplicateInvoice.total, duplicateInvoice.currency) },
    { label: 'Due Date', current: currentInvoice.dueDate, duplicate: duplicateInvoice.dueDate },
    { label: 'PO Number', current: currentInvoice.poNumber || 'N/A', duplicate: duplicateInvoice.poNumber || 'N/A' },
    { label: 'Portal', current: currentInvoice.portal || 'N/A', duplicate: duplicateInvoice.portal || 'N/A' },
    { label: 'Submit Method', current: currentInvoice.submitMethod || 'N/A', duplicate: duplicateInvoice.submitMethod || 'N/A' },
    { label: 'Submitted At', current: currentInvoice.submittedAt ? new Date(currentInvoice.submittedAt).toLocaleString() : 'N/A', duplicate: duplicateInvoice.submittedAt ? new Date(duplicateInvoice.submittedAt).toLocaleString() : 'N/A' },
  ];

  return (
    <div className="space-y-6">
      {/* Red Alert Banner */}
      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-gray-900 font-medium">
          <strong>Duplication Detected:</strong> Invoice {currentInvoice.number} has been submitted multiple times with different details.
        </AlertDescription>
      </Alert>

      {/* Purple Info Box */}
      <Alert className="border-purple-200 bg-purple-50">
        <Info className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>Action Required:</strong> Compare both versions below and choose how to resolve this duplication. 
          Select the version you want to keep or force submit both if needed.
        </AlertDescription>
      </Alert>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Field</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Current (Original)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Duplication (New)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field, index) => {
                  const isDifferent = field.current !== field.duplicate;
                  return (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{field.label}</td>
                      <td className={`py-3 px-4 ${isDifferent ? 'font-medium border-l-2 border-red-300' : 'text-gray-700'}`}>
                        {field.current}
                      </td>
                      <td className={`py-3 px-4 ${isDifferent ? 'font-medium border-l-2 border-red-300' : 'text-gray-700'}`}>
                        {field.duplicate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
              onClick={() => onResolve(selectedAction)}
              className="px-6"
            >
              {getButtonText()}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
