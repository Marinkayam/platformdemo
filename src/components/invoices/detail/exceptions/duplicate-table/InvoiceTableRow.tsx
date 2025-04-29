
import { Invoice } from "@/types/invoice";
import { TableCell, TableRow } from "@/components/ui/table";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Check, AlertTriangle, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvoiceTableRowProps {
  invoice: Invoice;
  isSelected: boolean;
  isNewest: boolean;
  formatDate: (dateString: string) => string;
  onContactSupport?: (invoice: Invoice) => void;
}

export function InvoiceTableRow({ 
  invoice, 
  isSelected, 
  isNewest, 
  formatDate,
  onContactSupport
}: InvoiceTableRowProps) {
  const exceptionCount = invoice.exceptions?.length || 0;
  const hasExceptions = exceptionCount > 0;
  const isRecommended = !hasExceptions && invoice.status === "Approved by Buyer";

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport(invoice);
    }
  };

  return (
    <TableRow className={`hover:bg-gray-50 ${isSelected ? 'bg-primary-50' : ''}`}>
      <TableCell className="text-center">
        <RadioGroupItem 
          value={invoice.id} 
          id={`invoice-${invoice.id}`}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
        />
      </TableCell>
      <TableCell>
        <div className="font-medium flex items-center">
          {formatDate(invoice.creationDate)}
          {isNewest && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Newest
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>{formatCurrency(invoice.total, invoice.currency || 'USD')}</TableCell>
      <TableCell>
        <span className={`px-2.5 py-0.5 rounded-full text-xs ${
          invoice.status === 'Approved by Buyer' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {invoice.status === 'Approved by Buyer' ? 'Approved by Buyer' : 'Pending Action'}
        </span>
      </TableCell>
      <TableCell>
        {hasExceptions ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-amber-700 cursor-help">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                  <span>{exceptionCount} Exceptions</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3">
                <h4 className="font-semibold mb-1">Exception Details:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {invoice.exceptions?.map(exception => (
                    <li key={exception.id} className="text-sm">
                      {exception.message}
                    </li>
                  )) || <li>No exception details available</li>}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center text-green-700">
            <Check className="h-4 w-4 mr-1 text-green-600" />
            <span>None</span>
          </div>
        )}
      </TableCell>
      <TableCell className="text-right">
        {isRecommended && (
          <span className="bg-primary-100 text-primary px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
            Recommended
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}
