
import { Invoice } from "@/types/invoice";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, MoreVertical, Download, MessageSquare, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  onToggle: (id: string) => void;
  onSelectSingle: (invoice: Invoice) => void;
  onContactSupport?: (invoice: Invoice) => void;
  formatDate: (dateString: string) => string;
}

export function InvoiceTableRow({ 
  invoice, 
  isSelected, 
  isNewest, 
  onToggle, 
  onSelectSingle,
  onContactSupport,
  formatDate 
}: InvoiceTableRowProps) {
  const exceptionCount = invoice.exceptions?.length || 0;
  const hasExceptions = exceptionCount > 0;
  const isRecommended = !hasExceptions && invoice.status === "APPROVED";

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport(invoice);
    }
  };

  return (
    <TableRow className={`hover:bg-gray-50 ${isSelected ? 'bg-primary-50' : ''}`}>
      <TableCell className="text-center">
        <Checkbox
          id={`invoice-${invoice.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(invoice.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
        <span className={`px-2.5 py-0.5 rounded-full text-sm ${
          invoice.status === 'APPROVED' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {invoice.status === 'APPROVED' ? 'Approved by Buyer' : 'Pending Action'}
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
      <TableCell>
        {isRecommended && (
          <span className="bg-primary-100 text-primary px-2 py-0.5 rounded-full text-sm whitespace-nowrap">
            Recommended
          </span>
        )}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-primary border-primary hover:bg-primary-50 text-xs"
            onClick={() => onSelectSingle(invoice)}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Select
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={handleContactSupport}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
