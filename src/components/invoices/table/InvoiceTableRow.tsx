
import { TableCell, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { StatusBadge } from "@/components/ui/status-badge";
import { AssigneeComponent } from "../AssigneeComponent";
import { InvoiceNumber } from "./row/InvoiceNumber";
import { RejectionInfo } from "./row/RejectionInfo";
import { OwnerInfo } from "./row/OwnerInfo";

interface InvoiceTableRowProps {
  invoice: Invoice;
  isPendingTab: boolean;
  onNavigate: (id: string) => void;
  onAssign: (invoiceId: string, email: string) => void;
  onRemoveAssignee: (invoiceId: string) => void;
}

export function InvoiceTableRow({ 
  invoice, 
  isPendingTab, 
  onNavigate,
  onAssign,
  onRemoveAssignee 
}: InvoiceTableRowProps) {
  const isPending = invoice.status === "Pending Action";
  const isRejectedByMonto = invoice.status === "Rejected by Monto";
  const isRejectedByBuyer = invoice.status === "Rejected by Buyer";

  return (
    <TableRow 
      className={`h-14 cursor-pointer hover:bg-gray-50 ${isPending ? 'bg-red-50/30' : ''}`}
      onClick={() => onNavigate(invoice.id)}
    >
      <InvoiceNumber 
        number={invoice.number}
        hasWarning={invoice.hasWarning}
        isPending={isPending}
      />
      
      <TableCell className="text-[14px] text-gray-900">
        {invoice.buyer}
      </TableCell>
      
      {isPendingTab ? (
        <RejectionInfo 
          isRejectedByMonto={isRejectedByMonto}
          isRejectedByBuyer={isRejectedByBuyer}
        />
      ) : (
        <TableCell className="text-[14px] text-gray-900">
          {invoice.dueDate}
        </TableCell>
      )}
      
      {isPendingTab ? (
        <TableCell className="text-[14px] text-gray-900">
          {invoice.creationDate}
        </TableCell>
      ) : (
        <TableCell className="text-[14px] text-gray-900">
          <StatusBadge status={invoice.status} />
        </TableCell>
      )}
      
      <TableCell className="text-[14px] text-gray-900">
        ${invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </TableCell>
      
      <TableCell 
        className="text-[14px] text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {isPendingTab ? (
          <AssigneeComponent 
            assignee={invoice.assignee}
            onAssign={(email) => onAssign(invoice.id, email)}
            onRemove={() => onRemoveAssignee(invoice.id)}
          />
        ) : (
          invoice.owner && <OwnerInfo owner={invoice.owner} />
        )}
      </TableCell>
    </TableRow>
  );
}
