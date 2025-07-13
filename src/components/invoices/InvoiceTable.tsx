import { useNavigate } from "react-router-dom";
import { Table, TableBody } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { useSortedInvoices } from "@/hooks/useSortedInvoices";
import { InvoiceTableHeader } from "./table/InvoiceTableHeader";
import { InvoiceTableRow } from "./table/InvoiceTableRow";
import { InvoiceTableFooter } from "./table/InvoiceTableFooter";
import { TableSkeleton } from "@/components/ui/table-skeleton";

interface InvoiceTableProps {
  invoices: Invoice[];
  isPendingTab?: boolean;
  isLoading?: boolean;
}

export function InvoiceTable({ invoices, isPendingTab = false, isLoading = false }: InvoiceTableProps) {
  const navigate = useNavigate();
  
  const { 
    sortedInvoices, 
    sortField, 
    sortDirection, 
    handleSort, 
    setLocalInvoices 
  } = useSortedInvoices(invoices);

  const handleAssign = (invoiceId: string, email: string) => {
    setLocalInvoices(prev => {
      const updated = prev.map(inv => 
        inv.id === invoiceId ? { ...inv, assignee: email } : inv
      );
      return updated;
    });
  };

  const handleRemoveAssignee = (invoiceId: string) => {
    setLocalInvoices(prev => {
      const updated = prev.map(inv => 
        inv.id === invoiceId ? { ...inv, assignee: undefined } : inv
      );
      return updated;
    });
  };

  const handleExcludeInvoice = (invoiceId: string) => {
    console.log('Exclude invoice action triggered for:', invoiceId);
    // TODO: Implement actual exclude logic when backend is ready
  };

  // Determine the number of columns based on isPendingTab
  const columnsCount = isPendingTab ? 10 : 11; // Updated for new columns: Invoice Number, Buyer, Due Date, Status, Portal, Total, PO Number, Invoice Date, Net Terms, Owner/Assignee, Actions

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <InvoiceTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            isPendingTab={isPendingTab}
          />
          
          {isLoading ? (
            <TableSkeleton rows={8} columns={columnsCount} showFooter />
          ) : (
            <>
              <TableBody className="divide-y divide-gray-100">
                {sortedInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={columnsCount} className="h-[65px] text-center text-sm text-gray-600 py-2 align-middle bg-white">
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
                      onExclude={handleExcludeInvoice}
                    />
                  ))
                )}
              </TableBody>
              
              <InvoiceTableFooter invoices={sortedInvoices} columnsCount={columnsCount} />
            </>
          )}
        </Table>
      </div>
    </div>
  );
}
