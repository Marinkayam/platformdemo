
import { Invoice } from "@/types/invoice";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvoiceColumnProps {
  invoice: Invoice;
  fields: Array<{ key: keyof Invoice, label: string }>;
  differences: Record<string, boolean>;
  isNewer: boolean;
  isSelected: boolean;
  invoices: Invoice[];
}

export function InvoiceColumn({ 
  invoice, 
  fields, 
  differences,
  isNewer,
  isSelected,
  invoices
}: InvoiceColumnProps) {
  // Function to determine if this invoice has the best/highest value for a numeric field
  const hasHighestValue = (field: keyof Invoice): boolean => {
    if (typeof invoice[field] !== 'number') return false;
    
    return invoices.every(inv => 
      typeof inv[field] === 'number' && 
      (inv[field] as number) <= (invoice[field] as number)
    );
  };
  
  // Function to determine if this invoice has the lowest value for a numeric field
  const hasLowestValue = (field: keyof Invoice): boolean => {
    if (typeof invoice[field] !== 'number') return false;
    
    return invoices.every(inv => 
      typeof inv[field] === 'number' && 
      (inv[field] as number) >= (invoice[field] as number)
    );
  };
  
  return (
    <div 
      className={`col-span-1 rounded-lg border transition-all duration-200 hover:border-primary-300 ${
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
        } else if ((field.key === 'creationDate' || field.key === 'dueDate') && typeof value === 'string') {
          displayValue = formatDate(value);
        }
        
        // Determine if this field has a notable value (highest, lowest, etc.)
        const isHighest = hasHighestValue(field.key);
        const isLowest = hasLowestValue(field.key);
        const showHighestBadge = hasDifference && isHighest && typeof value === 'number' && field.key !== 'creationDate' && field.key !== 'dueDate';
        const showLowestBadge = hasDifference && isLowest && typeof value === 'number' && field.key !== 'creationDate' && field.key !== 'dueDate';
        
        return (
          <div 
            key={field.key} 
            className={`h-12 flex items-center justify-between px-3 text-sm border-b last:border-b-0 ${
              hasDifference ? 'bg-amber-50 font-medium' : ''
            }`}
          >
            <span>{displayValue}</span>
            
            {(showHighestBadge || showLowestBadge) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span 
                      className={`flex items-center text-xs rounded-full px-1.5 py-0.5 ml-1 ${
                        showHighestBadge ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {showHighestBadge && (
                        <>
                          <ArrowUp className="h-3 w-3 mr-0.5" />
                          Highest
                        </>
                      )}
                      {showLowestBadge && (
                        <>
                          <ArrowDown className="h-3 w-3 mr-0.5" />
                          Lowest
                        </>
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showHighestBadge ? 'This invoice has the highest value' : 'This invoice has the lowest value'} for this field</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      })}
    </div>
  );
}
