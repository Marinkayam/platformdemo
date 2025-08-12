import { useNavigate } from "react-router-dom";
import { Table, TableBody } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { useSortedInvoices } from "@/hooks/useSortedInvoices";
import { InvoiceTableHeader } from "./table/InvoiceTableHeader";
import { InvoiceTableRow } from "./table/InvoiceTableRow";
import { InvoiceTableFooter } from "./table/InvoiceTableFooter";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { InvoicesPagination } from "./components/InvoicesPagination";
import { useState, useMemo } from "react";

interface InvoiceTableProps {
  invoices: Invoice[];
  isPendingTab?: boolean;
  isLoading?: boolean;
}

export function InvoiceTable({ invoices, isPendingTab = false, isLoading = false }: InvoiceTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  
  const { 
    sortedInvoices, 
    sortField, 
    sortDirection, 
    handleSort, 
    setLocalInvoices 
  } = useSortedInvoices(invoices);

  // Pagination logic
  const prioritizedInvoices = useMemo(() => {
    // Always prioritize Pending Action at the top, and put Paid at the bottom
    return [...sortedInvoices].sort((a, b) => {
      // Pending Action comes first
      if (a.status === "Pending Action" && b.status !== "Pending Action") return -1;
      if (b.status === "Pending Action" && a.status !== "Pending Action") return 1;
      
      // Paid comes last
      if (a.status === "Paid" && b.status !== "Paid") return 1;
      if (b.status === "Paid" && a.status !== "Paid") return -1;
      
      // Keep original order for everything else
      return 0;
    });
  }, [sortedInvoices]);
  const totalPages = Math.ceil(prioritizedInvoices.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return prioritizedInvoices.slice(startIndex, startIndex + pageSize);
  }, [prioritizedInvoices, currentPage, pageSize]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Determine the number of columns based on isPendingTab
  const columnsCount = isPendingTab ? 10 : 11; // Updated for new columns: Invoice Number, Buyer, Due Date, Status, Portal, Total, PO Number, Invoice Date, Net Terms, Owner/Assignee, Actions

  return (
    <div className="space-y-4 w-full">
      <div className="rounded-xl border bg-white animate-fade-in w-full" style={{ maxWidth: '100%' }}>
        <div className="w-full" style={{ overflowX: 'auto' }}>
          <Table className="w-full" style={{ minWidth: '2200px' }}>
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
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columnsCount} className="h-[65px] text-center text-sm text-gray-600 py-2 align-middle bg-white">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((invoice) => (
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
      
      {!isLoading && (
        <InvoicesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalItems={sortedInvoices.length}
        />
      )}
    </div>
  );
}
