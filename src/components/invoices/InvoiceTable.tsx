
import { useNavigate } from "react-router-dom";
import { Table, TableBody } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { useSortedInvoices } from "@/hooks/useSortedInvoices";
import { InvoiceTableHeader } from "./table/InvoiceTableHeader";
import { InvoiceTableRow } from "./table/InvoiceTableRow";
import { InvoiceTableFooter } from "./table/InvoiceTableFooter";

interface InvoiceTableProps {
  invoices: Invoice[];
  isPendingTab?: boolean;
}

export function InvoiceTable({ invoices, isPendingTab = false }: InvoiceTableProps) {
  const navigate = useNavigate();
  const { 
    sortedInvoices, 
    sortField, 
    sortDirection, 
    handleSort, 
    setLocalInvoices 
  } = useSortedInvoices(
    // Filter invoices if we're on the pending tab to only show "Pending Action" status
    isPendingTab 
      ? invoices.filter(invoice => invoice.status === "Pending Action")
      : invoices
  );

  const handleAssign = (invoiceId: string, email: string) => {
    setLocalInvoices(prev => 
      prev.map(inv => 
        inv.id === invoiceId ? { ...inv, assignee: email } : inv
      )
    );
  };

  const handleRemoveAssignee = (invoiceId: string) => {
    setLocalInvoices(prev => 
      prev.map(inv => 
        inv.id === invoiceId ? { ...inv, assignee: undefined } : inv
      )
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <InvoiceTableHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          isPendingTab={isPendingTab}
        />
        
        <TableBody className="divide-y">
          {sortedInvoices.length === 0 ? (
            <tr>
              <td colSpan={6} className="h-24 text-center text-[14px] text-gray-600">
                No invoices found.
              </td>
            </tr>
          ) : (
            sortedInvoices.map((invoice) => (
              <InvoiceTableRow
                key={invoice.id}
                invoice={invoice}
                isPendingTab={isPendingTab}
                onNavigate={(id) => navigate(`/invoices/${id}`)}
                onAssign={handleAssign}
                onRemoveAssignee={handleRemoveAssignee}
              />
            ))
          )}
        </TableBody>
        
        <InvoiceTableFooter invoices={sortedInvoices} />
      </Table>
    </div>
  );
}
