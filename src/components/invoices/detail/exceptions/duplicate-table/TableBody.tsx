
import { TableBody as UITableBody } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { InvoiceTableRow } from "./InvoiceTableRow";

interface InvoiceTableBodyProps {
  invoices: Invoice[];
  selectedId: string | null;
  formatDate: (dateString: string) => string;
  onContactSupport?: (invoice: Invoice) => void;
}

export function InvoiceTableBody({ 
  invoices,
  selectedId,
  formatDate,
  onContactSupport,
}: InvoiceTableBodyProps) {
  // Sort invoices by creation date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });
  
  // Find the newest invoice
  const newestInvoiceId = sortedInvoices.length > 0 ? sortedInvoices[0].id : '';

  return (
    <UITableBody>
      {sortedInvoices.map((invoice) => (
        <InvoiceTableRow
          key={invoice.id}
          invoice={invoice}
          isSelected={invoice.id === selectedId}
          isNewest={invoice.id === newestInvoiceId}
          formatDate={formatDate}
          onContactSupport={onContactSupport}
        />
      ))}
    </UITableBody>
  );
}
