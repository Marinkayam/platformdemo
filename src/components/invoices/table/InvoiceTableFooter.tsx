
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface InvoiceTableFooterProps {
  invoices: Invoice[];
  columnsCount: number;
}

export function InvoiceTableFooter({ invoices, columnsCount }: InvoiceTableFooterProps) {
  // Calculate totals by currency
  const currencyTotals = invoices.reduce((acc, invoice) => {
    const currency = invoice.currency || "USD";
    if (!acc[currency]) {
      acc[currency] = 0;
    }
    acc[currency] += invoice.total || 0;
    return acc;
  }, {} as Record<string, number>);

  // Format the total amounts display
  const formatTotalAmounts = () => {
    const entries = Object.entries(currencyTotals);
    if (entries.length === 0) return formatCurrency(0, "USD");
    
    return entries
      .map(([currency, amount]) => formatCurrency(amount, currency))
      .join(" + ");
  };

  return (
    <TableFooter>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px] sticky left-0 z-20 border-r border-gray-200"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="font-semibold text-gray-700 bg-[#F6F7F9] w-[200px] min-w-[200px]">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>Total:</span>
            <span className="font-bold text-gray-900 whitespace-nowrap">{formatTotalAmounts()}</span>
          </div>
        </TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[200px] min-w-[200px]"></TableCell>
        <TableCell className="bg-[#F6F7F9] w-[80px]"></TableCell>
      </TableRow>
    </TableFooter>
  );
}
