
import { TableCell, TableRow } from "@/components/ui/table";
import { AlertTriangle, UserCircle2 } from "lucide-react";
import { Invoice } from "@/types/invoice";
import { StatusBadge } from "@/components/ui/status-badge";
import { AssigneeComponent } from "../AssigneeComponent";

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
      <TableCell className="font-medium flex items-center gap-2 text-[14px]">
        {invoice.hasWarning && (
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        )}
        <span className={isPending ? "text-red-600 font-medium" : ""}>
          {invoice.number}
        </span>
      </TableCell>
      
      <TableCell className="text-[14px] text-gray-900">
        {invoice.buyer}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="text-[14px] text-gray-900">
          {(isRejectedByMonto || isRejectedByBuyer) && (
            <span className={`text-[12px] px-2 py-0.5 rounded-full ${
              isRejectedByMonto ? 'bg-[#D6BCFA] text-[#9b87f5]' : 'bg-red-50 text-[#ea384c]'
            }`}>
              {isRejectedByMonto ? 'By Monto' : 'By Buyer'}
            </span>
          )}
        </TableCell>
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
          invoice.owner && (
            <div className="flex items-center gap-2">
              <UserCircle2 className="h-4 w-4 text-gray-400" />
              <span>{invoice.owner}</span>
            </div>
          )
        )}
      </TableCell>
    </TableRow>
  );
}
