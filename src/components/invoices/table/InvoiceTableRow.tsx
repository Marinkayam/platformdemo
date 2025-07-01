
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

  const isPendingAction = invoice.status === "Pending Action";

  return (
    <TableRow 
      className={`hover:bg-gray-50 cursor-pointer transition-colors bg-white ${isPendingAction ? 'pending-action-row' : ''}`}
      onClick={handleClick}
    >
      <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold py-4 pl-4 pr-3 min-w-[220px] flex-shrink-0 relative">
        {isPendingAction && (
          <div className="absolute left-0 top-0 w-0.5 h-full bg-red-500" />
        )}
        <div className="text-left">
          <InvoiceNumber 
            number={invoice.number}
            hasWarning={invoice.hasWarning}
            status={invoice.status}
            isCreditMemo={invoice.documentType === "Credit Memo"}
            isDuplicate={invoice.isDuplicate}
          />
        </div>
      </TableCell>
      
      <TableCell className="px-4 py-4 min-w-[180px] flex-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate cursor-help block text-sm">{invoice.buyer}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{invoice.buyer}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="px-4 py-4 min-w-[140px] flex-shrink-0">
          <RejectionInfo 
            isRejectedByMonto={invoice.rejectedBy === 'Monto'}
            isRejectedByBuyer={invoice.rejectedBy === 'Buyer'}
          />
        </TableCell>
      ) : (
        <TableCell className="px-4 py-4 min-w-[140px] flex-shrink-0 text-sm">
          {invoice.dueDate}
        </TableCell>
      )}
      
      <TableCell className="px-4 py-4 min-w-[120px] flex-shrink-0">
        <StatusBadge status={invoice.status} />
      </TableCell>
      
      <TableCell className="px-4 py-4 min-w-[180px] flex-1">
        <div className="flex items-center gap-2">
          {(() => {
            const resolvedPortalName = invoice.portal;
            const portalLogoUrl = getPortalLogoUrl(resolvedPortalName);

            return (
              <>
                <img 
                  src={portalLogoUrl} 
                  alt={`${resolvedPortalName} logo`}
                  className="w-5 h-5 object-contain rounded-full flex-shrink-0"
                  width={20}
                  height={20}
                  onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = '/portal-logos/placeholder.svg';
                  }}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-medium text-gray-700 cursor-help truncate text-sm">
                        {resolvedPortalName}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{resolvedPortalName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            );
          })()}
        </div>
      </TableCell>
      
      <TableCell className="px-4 py-4 font-medium min-w-[150px] flex-shrink-0 text-right text-sm">
        {formatCurrency(invoice.total, invoice.currency)}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="px-4 py-4 min-w-[160px] flex-1">
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      ) : (
        <TableCell className="px-4 py-4 min-w-[160px] flex-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate cursor-help block text-sm">{formatOwnerName(invoice.owner)}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatOwnerName(invoice.owner)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
      
      <TableCell className="text-center px-4 py-4 w-[80px] flex-shrink-0">
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
