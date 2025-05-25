
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";
import { AssigneeComponent } from "@/components/invoices/AssigneeComponent";
import { InvoiceActionsMenu } from "./row/InvoiceActionsMenu";
import { StatusBadge } from "@/components/ui/status-badge";
import { RejectionInfo } from "./row/RejectionInfo";
import { getRandomPortalName } from "@/lib/portalUtils";

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

  const isPendingAction = invoice.status === "Pending Action";

  return (
    <TableRow 
      className={`h-14 hover:bg-gray-50 cursor-pointer transition-colors bg-white relative ${
        isPendingAction ? 'border-l-4 border-l-red-500' : ''
      }`}
      onClick={handleClick}
    >
      <TableCell className="py-3 px-4 text-sm font-bold bg-white">
        {invoice.number}
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm bg-white">
        {invoice.buyer}
      </TableCell>
      
      {isPendingTab ? (
        <RejectionInfo 
          isRejectedByMonto={invoice.rejectedBy === 'Monto'}
          isRejectedByBuyer={invoice.rejectedBy === 'Buyer'}
        />
      ) : (
        <TableCell className="py-3 px-4 text-sm bg-white">
          {invoice.dueDate}
        </TableCell>
      )}
      
      <TableCell className="py-3 px-4 text-sm bg-white">
        <StatusBadge status={invoice.status} dueDate={invoice.dueDate} />
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm bg-white">
        {getRandomPortalName()}
      </TableCell>
      
      <TableCell className="py-3 px-4 text-sm bg-white">
        {formatCurrency(invoice.total)}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="py-3 px-4 bg-white">
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      ) : (
        <TableCell className="py-3 px-4 text-sm bg-white">
          {invoice.owner}
        </TableCell>
      )}
      
      <TableCell className="py-3 px-4 text-center bg-white">
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
