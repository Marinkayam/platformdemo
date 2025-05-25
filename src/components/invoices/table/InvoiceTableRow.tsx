import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";
import { AssigneeComponent } from "@/components/invoices/AssigneeComponent";
import { InvoiceActionsMenu } from "./row/InvoiceActionsMenu";
import { StatusBadge } from "@/components/ui/status-badge";

interface InvoiceTableRowProps {
  invoice: Invoice;
  isPendingTab?: boolean;
  onNavigate: (id: string) => void;
  onAssign: (invoiceId: string, email: string) => void;
  onRemoveAssignee: (invoiceId: string) => void;
  onExclude: (invoiceId: string) => void;
}

export function InvoiceTableRow({
  invoice,
  isPendingTab,
  onNavigate,
  onAssign,
  onRemoveAssignee,
  onExclude
}: InvoiceTableRowProps) {
  const handleClick = () => {
    onNavigate(invoice.id);
  };

  return (
    <TableRow 
      className="h-14 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <TableCell className="py-3 px-4 text-sm">
        {invoice.number}
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm">
        {invoice.owner}
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm">
        {invoice.buyer}
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm">
        {invoice.dueDate}
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm">
        <StatusBadge status={invoice.status} dueDate={invoice.dueDate} />
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm">
        Monto Portal
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm text-right">
        {formatCurrency(invoice.total)}
      </TableCell>
      
      {isPendingTab && (
        <TableCell className="py-3 px-4">
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      )}
      
      <TableCell className="py-3 px-4 text-center">
        <div onClick={(e) => e.stopPropagation()}>
          <InvoiceActionsMenu 
            invoiceId={invoice.id} 
            invoiceNumber={invoice.number}
            onExclude={onExclude} 
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
