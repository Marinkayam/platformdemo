import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Invoice } from "@/types/invoice";
import { formatCurrency, getPortalLogoUrl, formatOwnerName } from "@/lib/utils";
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
      className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
      onClick={handleClick}
    >
      <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold py-4 pl-4 pr-2 w-[180px]">
        <InvoiceNumber 
          number={invoice.number}
          hasWarning={invoice.hasWarning}
          status={invoice.status}
          isCreditMemo={invoice.documentType === "Credit Memo"}
          isDuplicate={invoice.isDuplicate}
        />
      </TableCell>
      
      <TableCell className="px-4 py-4 truncate w-[180px]">
              <span className="truncate cursor-help">{invoice.buyer}</span>
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="px-4 py-4 w-[150px]">
          <RejectionInfo 
            isRejectedByMonto={invoice.rejectedBy === 'Monto'}
            isRejectedByBuyer={invoice.rejectedBy === 'Buyer'}
          />
        </TableCell>
      ) : (
        <TableCell className="px-4 py-4 w-[150px]">
          {invoice.dueDate}
        </TableCell>
      )}
      
      <TableCell className="px-4 py-4 w-[120px] pr-4">
        <StatusBadge status={invoice.status} />
      </TableCell>
      
      <TableCell className="px-4 py-4 flex items-center gap-2 w-[200px]">
        {(() => {
          const resolvedPortalName = invoice.portal;
          const portalLogoUrl = getPortalLogoUrl(resolvedPortalName);

          return (
            <>
              <img 
                src={portalLogoUrl} 
                alt={`${resolvedPortalName} logo`}
                className="w-5 h-5 object-contain rounded-full"
                width={20}
                height={20}
                onError={(e) => {
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = '/portal-logos/placeholder.svg';
                }}
              />
              <span className="font-medium text-gray-700 cursor-help">{resolvedPortalName}</span>
            </>
          );
        })()}
      </TableCell>
      
      <TableCell className="px-4 py-4 font-medium w-[180px]">
        {formatCurrency(invoice.total, invoice.currency)}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="px-4 py-4 w-[150px]">
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      ) : (
        <TableCell className="px-4 py-4 truncate w-[150px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate cursor-help">{formatOwnerName(invoice.owner)}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatOwnerName(invoice.owner)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
      
      <TableCell className="text-center px-4 py-4 w-[80px]">
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
