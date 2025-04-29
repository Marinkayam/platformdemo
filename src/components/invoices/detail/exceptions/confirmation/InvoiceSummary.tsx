
import { Invoice } from "@/types/invoice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Check, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { formatDate, isRecommendedInvoice } from "./utils";

interface InvoiceSummaryProps {
  invoice: Invoice;
}

export function InvoiceSummary({ invoice }: InvoiceSummaryProps) {
  const exceptionCount = invoice.exceptions?.length || 0;
  const hasExceptions = exceptionCount > 0;
  const isRecommended = isRecommendedInvoice(invoice);
  
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead>Issue Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Exceptions</TableHead>
          <TableHead>Recommendation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-primary-50/40">
          <TableCell className="font-medium">
            {formatDate(invoice.creationDate)}
          </TableCell>
          <TableCell>{formatCurrency(invoice.total, invoice.currency || 'USD')}</TableCell>
          <TableCell>
            <span className={`px-2.5 py-0.5 rounded-full text-sm ${
              invoice.status === 'Approved by Buyer' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {invoice.status}
            </span>
          </TableCell>
          <TableCell>
            {hasExceptions ? (
              <div className="flex items-center text-amber-700">
                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                <span>{exceptionCount} Exceptions</span>
              </div>
            ) : (
              <div className="flex items-center text-green-700">
                <Check className="h-4 w-4 mr-1 text-green-600" />
                <span>None</span>
              </div>
            )}
          </TableCell>
          <TableCell>
            {isRecommended && (
              <span className="bg-primary-100 text-primary px-2 py-0.5 rounded-full text-sm">
                Recommended
              </span>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
