
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface InvoiceTableFooterProps {
  invoices: Invoice[];
  columnsCount: number;
}

export function InvoiceTableFooter({ invoices, columnsCount }: InvoiceTableFooterProps) {
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
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableCell colSpan={2} className="font-semibold text-gray-700 sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">Total Invoices:</span>
            <span className="font-bold text-gray-900 text-sm">{totalInvoices}</span>
          </div>
        </TableCell>
        <TableCell colSpan={3} className="bg-[#F6F7F9] px-4"></TableCell>
        <TableCell colSpan={3} className="font-semibold text-gray-700 bg-[#F6F7F9] whitespace-nowrap px-4 py-3 text-left">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm">Total Amount:</span>
            <span className="font-bold text-gray-900 whitespace-nowrap text-sm">{totalAmountDisplay}</span>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
