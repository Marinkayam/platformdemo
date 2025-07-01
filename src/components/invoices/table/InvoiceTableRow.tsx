
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
      <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold py-3 xl:py-4 pl-3 xl:pl-4 pr-2 w-[200px] xl:w-[220px] min-w-[180px] relative">
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
      
      <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[150px] xl:min-w-[180px] lg:min-w-[160px] md:min-w-[140px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate cursor-help block">{invoice.buyer}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{invoice.buyer}</p>
            </TooltipContent>
          </TooltipProvider>
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[120px] xl:min-w-[140px] lg:min-w-[130px] md:min-w-[120px]">
          <RejectionInfo 
            isRejectedByMonto={invoice.rejectedBy === 'Monto'}
            isRejectedByBuyer={invoice.rejectedBy === 'Buyer'}
          />
        </TableCell>
      ) : (
        <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[120px] xl:min-w-[140px] lg:min-w-[130px] md:min-w-[120px]">
          {invoice.dueDate}
        </TableCell>
      )}
      
      <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[100px] xl:min-w-[120px] lg:min-w-[110px] md:min-w-[100px] pr-2 xl:pr-4">
        <StatusBadge status={invoice.status} />
      </TableCell>
      
      <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[140px] xl:min-w-[180px] lg:min-w-[160px] md:min-w-[140px]">
        <div className="flex items-center gap-2">
          {(() => {
            const resolvedPortalName = invoice.portal;
            const portalLogoUrl = getPortalLogoUrl(resolvedPortalName);

            return (
              <>
                <img 
                  src={portalLogoUrl} 
                  alt={`${resolvedPortalName} logo`}
                  className="w-4 h-4 xl:w-5 xl:h-5 object-contain rounded-full flex-shrink-0"
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
                      <span className="font-medium text-gray-700 cursor-help truncate text-sm xl:text-base">
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
      
      <TableCell className="px-3 xl:px-4 py-3 xl:py-4 font-medium min-w-[120px] xl:min-w-[140px] lg:min-w-[130px] md:min-w-[120px] text-right">
        {formatCurrency(invoice.total, invoice.currency)}
      </TableCell>
      
      {isPendingTab ? (
        <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[120px] xl:min-w-[140px] lg:min-w-[130px] md:min-w-[120px]">
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeComponent 
              assignee={invoice.assignee}
              onAssign={(email) => onAssign(invoice.id, email)}
              onRemove={() => onRemoveAssignee(invoice.id)}
            />
          </div>
        </TableCell>
      ) : (
        <TableCell className="px-3 xl:px-4 py-3 xl:py-4 min-w-[120px] xl:min-w-[140px] lg:min-w-[130px] md:min-w-[120px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate cursor-help block">{formatOwnerName(invoice.owner)}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatOwnerName(invoice.owner)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
      
      <TableCell className="text-center px-3 xl:px-4 py-3 xl:py-4 w-[80px]">
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
