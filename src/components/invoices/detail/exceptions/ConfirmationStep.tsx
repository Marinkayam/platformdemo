
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ConfirmationStepProps {
  invoice: Invoice;
  onConfirm: () => void;
  onBack: () => void;
}

export function ConfirmationStep({ invoice, onConfirm, onBack }: ConfirmationStepProps) {
  const fields = [
    { key: 'number' as keyof Invoice, label: 'Invoice Number' },
    { key: 'buyer' as keyof Invoice, label: 'Buyer' },
    { key: 'creationDate' as keyof Invoice, label: 'Creation Date' },
    { key: 'dueDate' as keyof Invoice, label: 'Due Date' },
    { key: 'total' as keyof Invoice, label: 'Total' },
    { key: 'status' as keyof Invoice, label: 'Status' },
    { key: 'owner' as keyof Invoice, label: 'Owner' },
    { key: 'poNumber' as keyof Invoice, label: 'PO Number' },
    { key: 'paymentTerms' as keyof Invoice, label: 'Payment Terms' },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
          <Check className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-medium text-primary-700">Confirm your selection</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
          You've selected the following invoice to keep. All other duplicates will be marked as excluded and won't be tracked.
        </p>
      </div>
      
      <Card className="border-primary-200 bg-primary-50/50 shadow-sm">
        <CardContent className="pt-6 px-6">
          <div className="space-y-3">
            {fields.map((field) => {
              const value = invoice[field.key];
              
              // Format the total field as currency
              const displayValue = 
                field.key === 'total' && typeof value === 'number'
                  ? formatCurrency(value, invoice.currency || 'USD')
                  : value !== undefined ? String(value) : '-';
                  
              return (
                <div key={field.key} className="grid grid-cols-2 gap-2 py-2 border-b border-primary-100 last:border-b-0">
                  <div className="text-sm font-medium text-primary-800">{field.label}</div>
                  <div className="text-sm">{displayValue}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
        <h4 className="text-sm font-medium text-amber-700 mb-1">What happens next?</h4>
        <p className="text-sm text-amber-800">
          After confirmation, this invoice will be kept as the valid record and processing will continue.
          Other invoices with the same number will be marked as excluded and won't be tracked.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onConfirm} 
          className="bg-primary hover:bg-primary-700"
        >
          Confirm and Resolve Exception
        </Button>
      </div>
    </div>
  );
}
