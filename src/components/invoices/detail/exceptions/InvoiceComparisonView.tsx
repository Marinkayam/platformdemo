
import { useState, useMemo } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InvoiceComparisonViewProps {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
  onBack: () => void;
  onExcludeAll: () => void;
}

export function InvoiceComparisonView({ invoices, onSelect, onBack, onExcludeAll }: InvoiceComparisonViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Auto-select the newest invoice
  useMemo(() => {
    if (invoices.length > 0 && !selectedId) {
      // Find newest invoice by creation date
      const newest = [...invoices].sort((a, b) => 
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      )[0];
      setSelectedId(newest.id);
    }
  }, [invoices, selectedId]);
  
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
  
  // Find differences between the invoices
  const differences = useMemo(() => {
    const result: Record<string, boolean> = {};
    
    if (invoices.length < 2) return result;
    
    // Compare all invoices against the first one
    const first = invoices[0];
    
    fields.forEach(field => {
      const firstValue = first[field.key];
      
      // Check if any invoice has a different value for this field
      const hasDifference = invoices.slice(1).some(invoice => {
        const value = invoice[field.key];
        return firstValue !== value;
      });
      
      if (hasDifference) {
        result[field.key as string] = true;
      }
    });
    
    return result;
  }, [invoices, fields]);
  
  const handleRadioChange = (id: string) => {
    setSelectedId(id);
  };
  
  const handleContinue = () => {
    if (selectedId) {
      const invoice = invoices.find(inv => inv.id === selectedId);
      if (invoice) {
        onSelect(invoice);
      }
    }
  };

  // Show which invoice is newer
  const newerInvoice = useMemo(() => {
    if (invoices.length < 2) return invoices[0];
    return invoices.reduce((newest, current) => 
      new Date(current.creationDate) > new Date(newest.creationDate) ? current : newest
    , invoices[0]);
  }, [invoices]);
  
  return (
    <div className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-md border border-primary-200 mb-6">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary-700">Compare differences</h4>
            <p className="text-sm text-primary-800 mt-1">
              We've highlighted fields that differ between these invoices. Select the invoice you want to keep.
            </p>
          </div>
        </div>
      </div>

      <RadioGroup value={selectedId || ""} onValueChange={handleRadioChange}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="h-14 flex items-center font-medium text-sm">Field</div>
            {fields.map((field) => (
              <div key={field.key} className={`h-12 flex items-center font-medium text-sm ${differences[field.key as string] ? 'text-primary-700' : ''}`}>
                {field.label}
                {differences[field.key as string] && (
                  <AlertTriangle className="h-4 w-4 text-amber-500 ml-2" />
                )}
              </div>
            ))}
          </div>
          
          {invoices.map((invoice) => {
            const isNewer = invoice.id === newerInvoice.id;
            const isSelected = selectedId === invoice.id;
            
            return (
              <div 
                key={invoice.id} 
                className={`col-span-1 rounded-lg border ${
                  isSelected ? 'border-primary-400 ring-1 ring-primary-400 bg-primary-50/50' : 'border-border'
                }`}
              >
                <div className="h-14 flex items-center justify-center bg-muted/30 rounded-t-lg border-b">
                  <div className="h-full w-full flex flex-col justify-center px-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {isNewer && (
                          <span className="text-green-700 text-xs flex items-center gap-1 mr-2">
                            <Check className="h-3.5 w-3.5" />
                            Newest
                          </span>
                        )}
                        <span className="text-sm font-medium">
                          Created: {invoice.creationDate}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value={invoice.id} id={`invoice-${invoice.id}`} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {fields.map((field) => {
                  const value = invoice[field.key];
                  const hasDifference = differences[field.key as string];
                  
                  // Format specific fields
                  let displayValue = value !== undefined ? String(value) : '-';
                  if (field.key === 'total' && typeof value === 'number') {
                    displayValue = formatCurrency(value, invoice.currency || 'USD');
                  }
                  
                  return (
                    <div 
                      key={field.key} 
                      className={`h-12 flex items-center px-3 text-sm border-b last:border-b-0 ${
                        hasDifference ? 'bg-amber-50 font-medium' : ''
                      }`}
                    >
                      {displayValue}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </RadioGroup>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onExcludeAll}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Exclude All
          </Button>
          
          <Button 
            onClick={handleContinue} 
            disabled={!selectedId}
            className="bg-primary hover:bg-primary-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
