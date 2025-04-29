
import { useState, useEffect } from "react";
import { TableBody as UITableBody, TableRow, TableCell } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { InvoiceTableRow } from "./InvoiceTableRow";

interface InvoiceTableBodyProps {
  invoices: Invoice[];
  selected: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelectSingle: (invoice: Invoice) => void;
  onContactSupport?: (invoice: Invoice) => void;
  formatDate: (dateString: string) => string;
}

export function InvoiceTableBody({ 
  invoices,
  selected,
  onToggle,
  onSelectSingle,
  onContactSupport,
  formatDate
}: InvoiceTableBodyProps) {
  // Sort invoices by creation date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });
  
  // Find the newest invoice
  const newestInvoiceId = sortedInvoices.length > 0 ? sortedInvoices[0].id : '';

  return (
    <UITableBody>
      {sortedInvoices.length === 0 ? (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center text-[14px] text-gray-600">
            No invoices found.
          </TableCell>
        </TableRow>
      ) : (
        sortedInvoices.map((invoice) => (
          <InvoiceTableRow
            key={invoice.id}
            invoice={invoice}
            isSelected={!!selected[invoice.id]}
            isNewest={invoice.id === newestInvoiceId}
            onToggle={onToggle}
            onSelectSingle={onSelectSingle}
            onContactSupport={onContactSupport}
            formatDate={formatDate}
          />
        ))
      )}
    </UITableBody>
  );
}
