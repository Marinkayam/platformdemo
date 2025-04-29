
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium">Confirm your selection</h3>
        <p className="text-sm text-muted-foreground mt-1">
          You've selected the following invoice to keep. All other duplicates will be marked as invalid.
        </p>
      </div>
      
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-4 px-4">
          <div className="space-y-2">
            {fields.map((field) => {
              const value = invoice[field.key];
              return (
                <div key={field.key} className="grid grid-cols-2 gap-2 py-1 border-b border-primary/10 last:border-b-0">
                  <div className="text-sm font-medium">{field.label}</div>
                  <div className="text-sm">{value !== undefined ? String(value) : '-'}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onConfirm}>
          Confirm and Resolve Exception
        </Button>
      </div>
    </div>
  );
}
