
import { Invoice } from "@/types/invoice";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "./utils";

interface InvoiceColumnProps {
  invoice: Invoice;
  fields: Array<{ key: keyof Invoice, label: string }>;
  differences: Record<string, boolean>;
  isNewer: boolean;
  isSelected: boolean;
}

export function InvoiceColumn({ 
  invoice, 
  fields, 
  differences,
  isNewer,
  isSelected
}: InvoiceColumnProps) {
  return (
    <div 
      className={`col-span-1 rounded-lg border ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-200 bg-primary-50/70' : 'border-border'
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
                Created: {formatDate(invoice.creationDate)}
              </span>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value={invoice.id} id={`invoice-${invoice.id}`} className="h-5 w-5" />
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
        } else if (field.key === 'creationDate' && typeof value === 'string') {
          displayValue = formatDate(value);
        } else if (field.key === 'dueDate' && typeof value === 'string') {
          displayValue = formatDate(value);
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
}
