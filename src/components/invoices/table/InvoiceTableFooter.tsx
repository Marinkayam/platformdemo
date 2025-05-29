
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface InvoiceTableFooterProps {
  invoices: Invoice[];
}

export function InvoiceTableFooter({ invoices }: InvoiceTableFooterProps) {
  const totalInvoices = invoices.length;
  
  // Calculate totals by currency
  const totals = invoices.reduce((acc, invoice) => {
    const currency = invoice.currency || 'USD';
    if (!acc[currency]) {
      acc[currency] = 0;
    }
    acc[currency] += invoice.total;
    return acc;
  }, {} as Record<string, number>);

  // Format totals display
  const totalAmountDisplay = Object.entries(totals)
    .map(([currency, amount]) => formatCurrency(amount, currency))
    .join(' + ');

  return (
    <TableFooter>
      <TableRow className="h-14 bg-gray-50">
        <TableCell colSpan={2} className="text-[14px] font-medium text-gray-700 bg-neutral-100 px-4">
          <div className="flex items-center gap-2">
            <span>Total Invoices:</span>
            <span className="font-semibold text-gray-900">{totalInvoices}</span>
          </div>
        </TableCell>
        <TableCell colSpan={3} className="bg-neutral-100 px-4"></TableCell>
        <TableCell className="text-[14px] font-medium text-gray-700 bg-neutral-100 px-4">
          <div className="flex items-center gap-2">
            <span>Total Amount:</span>
            <span className="font-semibold text-gray-900">{totalAmountDisplay}</span>
          </div>
        </TableCell>
        <TableCell colSpan={2} className="bg-neutral-100 px-4"></TableCell>
      </TableRow>
    </TableFooter>
  );
}
