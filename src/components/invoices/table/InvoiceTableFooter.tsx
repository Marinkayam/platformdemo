
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface InvoiceTableFooterProps {
  invoices: Invoice[];
}

export function InvoiceTableFooter({ invoices }: InvoiceTableFooterProps) {
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const pendingCount = invoices.filter(invoice => invoice.status === "Pending Action").length;

  return (
    <TableFooter>
      <TableRow className="h-14 bg-gray-50">
        <TableCell className="text-[14px] font-medium text-gray-600">
          Showing {invoices.length} invoices
        </TableCell>
        <TableCell className="text-[14px] font-medium text-gray-600">
          {pendingCount} pending
        </TableCell>
        <TableCell colSpan={2}></TableCell>
        <TableCell className="text-[14px] font-medium text-gray-900">
          {formatCurrency(totalAmount)}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableFooter>
  );
}
