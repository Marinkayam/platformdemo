
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";

interface InvoiceComparisonViewProps {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
  onBack: () => void;
}

export function InvoiceComparisonView({ invoices, onSelect, onBack }: InvoiceComparisonViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  if (invoices.length !== 2) {
    return <div>Please select exactly 2 invoices to compare.</div>;
  }
  
  const fields = [
    { key: 'number' as keyof Invoice, label: 'Invoice Number' },
    { key: 'buyer' as keyof Invoice, label: 'Buyer' },
    { key: 'creationDate' as keyof Invoice, label: 'Creation Date' },
    { key: 'dueDate' as keyof Invoice, label: 'Due Date' },
    { key: 'total' as keyof Invoice, label: 'Total Amount' },
    { key: 'status' as keyof Invoice, label: 'Status' },
    { key: 'owner' as keyof Invoice, label: 'Owner' },
    { key: 'poNumber' as keyof Invoice, label: 'PO Number' },
    { key: 'paymentTerms' as keyof Invoice, label: 'Payment Terms' },
  ];
  
  const handleSelect = (invoice: Invoice) => {
    setSelectedId(invoice.id);
  };
  
  const handleContinue = () => {
    if (selectedId) {
      const invoice = invoices.find(inv => inv.id === selectedId);
      if (invoice) {
        onSelect(invoice);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="h-10"></div>
          {fields.map((field) => (
            <div key={field.key} className="h-10 flex items-center font-medium text-sm">
              {field.label}
            </div>
          ))}
        </div>
        
        {invoices.map((invoice) => (
          <div 
            key={invoice.id} 
            className={`col-span-1 rounded-lg border ${selectedId === invoice.id ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
          >
            <div className="h-10 flex items-center justify-center bg-muted/30 rounded-t-lg border-b">
              <Button 
                variant={selectedId === invoice.id ? "default" : "outline"} 
                size="sm" 
                onClick={() => handleSelect(invoice)}
                className="w-full h-full rounded-none rounded-t-lg flex items-center justify-center gap-2"
              >
                {selectedId === invoice.id && <Check className="h-4 w-4" />}
                {selectedId === invoice.id ? "Selected" : "Select This Invoice"}
              </Button>
            </div>
            
            {fields.map((field) => {
              const value = invoice[field.key];
              return (
                <div key={field.key} className="h-10 flex items-center px-3 text-sm border-b last:border-b-0">
                  {value !== undefined ? String(value) : '-'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!selectedId}>
          Continue
        </Button>
      </div>
    </div>
  );
}
