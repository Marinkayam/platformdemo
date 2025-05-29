
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";
import { AssigneeComponent } from "@/components/invoices/AssigneeComponent";
import { InvoiceActionsMenu } from "./row/InvoiceActionsMenu";
import { UniversalStatusBadge } from "@/components/ui/universal-status-badge";
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
      className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
      onClick={handleClick}
    >
      <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold">
        <InvoiceNumber 
          number={invoice.number}
          hasWarning={invoice.hasWarning}
          isPending={isPendingTab || false}
          isCreditMemo={invoice.documentType === "Credit Memo"}
        />
      </TableCell>
      
      <TableCell className="truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate cursor-help">{invoice.buyer}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{invoice.buyer}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      
      {isPendingTab ? (
        <TableCell>
          <RejectionInfo 
            isRejectedByMonto={invoice.rejectedBy === 'Monto'}
            isRejectedByBuyer={invoice.rejectedBy === 'Buyer'}
          />
        </TableCell>
      ) : (
        <TableCell>
          {invoice.dueDate}
        </TableCell>
      )}
      
      <TableCell>
        <UniversalStatusBadge status={invoice.status} />
      </TableCell>
      
      <TableCell className="truncate">
        {getRandomPortalName()}
      </TableCell>
      
      <TableCell className="font-medium">
        {formatCurrency(invoice.total, invoice.currency)}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell>
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      ) : (
        <TableCell className="truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate cursor-help">{invoice.owner}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{invoice.owner}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
      
      <TableCell className="text-center">
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
