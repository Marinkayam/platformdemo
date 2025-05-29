
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";
import { AssigneeComponent } from "@/components/invoices/AssigneeComponent";
import { InvoiceActionsMenu } from "./row/InvoiceActionsMenu";
import { StatusBadge } from "@/components/ui/status-badge";
import { RejectionInfo } from "./row/RejectionInfo";
import { InvoiceNumber } from "./row/InvoiceNumber";
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

  return (
    <TableRow 
      className="h-12 hover:bg-gray-50 cursor-pointer transition-colors bg-white relative"
      onClick={handleClick}
    >
      <InvoiceNumber 
        number={invoice.number}
        hasWarning={invoice.hasWarning}
        isPending={isPendingTab || false}
        isCreditMemo={invoice.documentType === "Credit Memo"}
      />
      
      <TableCell className="py-2 px-4 text-xs">
        {invoice.buyer}
      </TableCell>
      
      {isPendingTab ? (
        <RejectionInfo 
          isRejectedByMonto={invoice.rejectedBy === 'Monto'}
          isRejectedByBuyer={invoice.rejectedBy === 'Buyer'}
        />
      ) : (
        <TableCell className="py-2 px-4 text-xs">
          {invoice.dueDate}
        </TableCell>
      )}
      
      <TableCell className="py-2 px-4 text-xs">
        <StatusBadge status={invoice.status} dueDate={invoice.dueDate} />
      </TableCell>
      
      <TableCell className="py-2 px-4 text-xs">
        {getRandomPortalName()}
      </TableCell>
      
      <TableCell className="py-2 px-4 text-xs">
        {formatCurrency(invoice.total, invoice.currency)}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="py-2 px-4">
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      ) : (
        <TableCell className="py-2 px-4 text-xs">
          {invoice.owner}
        </TableCell>
      )}
      
      <TableCell className="py-2 px-4 text-center">
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
