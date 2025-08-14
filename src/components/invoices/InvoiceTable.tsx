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
  prefixOrderStatuses?: string[];
}

export function InvoiceTable({ invoices, isPendingTab = false, isLoading = false, prefixOrderStatuses = [] }: InvoiceTableProps) {
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
    if (prefixOrderStatuses && prefixOrderStatuses.length > 0) {
      const used = new Set<string>();
      const result: Invoice[] = [];
      // Add first occurrence of each requested status in order
      prefixOrderStatuses.forEach((status) => {
        const found = sortedInvoices.find(inv => inv.status === status && !used.has(inv.id));
        if (found) {
          result.push(found);
          used.add(found.id);
        }
      });
      // Append the rest preserving current order
      sortedInvoices.forEach(inv => {
        if (!used.has(inv.id)) result.push(inv);
      });
      return result;
    }

    // Default prioritization: Pending Action top, Paid bottom
    return [...sortedInvoices].sort((a, b) => {
      if (a.status === "Pending Action" && b.status !== "Pending Action") return -1;
      if (b.status === "Pending Action" && a.status !== "Pending Action") return 1;
      if (a.status === "Paid" && b.status !== "Paid") return 1;
      if (b.status === "Paid" && a.status !== "Paid") return -1;
      return 0;
    });
  }, [sortedInvoices, prefixOrderStatuses]);
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
              
              <InvoiceTableFooter 
                invoices={invoices}
                columnsCount={columnsCount}
              />
            </>
          )}
          </Table>
        </div>
      </div>
      
      {!isLoading && (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, prioritizedInvoices.length)} of {prioritizedInvoices.length} requests
            </div>
            <div className="text-sm font-semibold text-gray-900">
              Total: {(() => {
                const currencyTotals = invoices.reduce((acc, invoice) => {
                  const currency = invoice.currency || "USD";
                  if (!acc[currency]) {
                    acc[currency] = 0;
                  }
                  acc[currency] += invoice.total || 0;
                  return acc;
                }, {} as Record<string, number>);
                
                const entries = Object.entries(currencyTotals);
                if (entries.length === 0) return "$0.00";
                
                return entries
                  .map(([currency, amount]) => new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency
                  }).format(amount))
                  .join(" + ");
              })()}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
