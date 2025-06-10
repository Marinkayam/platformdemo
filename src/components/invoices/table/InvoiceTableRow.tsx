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

// Helper to get portal logo URL, robustly handling undefined/null portal names
const getPortalLogoUrl = (portalNameInput: string | undefined | null): string => {
  const cleanedPortalName = String(portalNameInput || ''); // Ensure it's a string, default to empty

  if (!cleanedPortalName) {
    return '/portal-logos/default.png'; // Or a generic placeholder
  }

  const logoMap: { [key: string]: string } = {
    "SAP Ariba": "ariba.png",
    "Coupa": "coupa.png",
    "Oracle Procurement": "oracle.png",
    "Tipalti": "tipalti.png",
    "Amazon Payee": "Amazon Payee.png",
    "Apple": "apple.png",
    "AT&T": "AT&T.png",
    "Bill.com": "bill.png",
    "SAP": "default.png",
    "Facturaxion": "Facturaxion.png",
    "Fieldglass": "Fieldglass.png",
    "iSupplier": "iSupplier.png",
    "KissFlow": "KissFlow.png",
    "Qualcomm": "Qualcomm.png",
    "Sainsburys": "Sainsburys.png",
    "Segment": "Segment.png",
    "Shopify": "Shopify.png",
    "StoreNext": "StoreNext.png",
    "Taulia": "taulia.png",
    "Teradata": "Teradata.png",
    "Tungsten": "tungsten.png",
    "Walmart": "walmart.png",
  };

  const fileName = logoMap[cleanedPortalName];
  if (fileName) {
    return `/portal-logos/${fileName}`;
  } else {
    // Fallback if no specific logo is found, use the cleaned name
    // The typeof check is technically redundant here because cleanedPortalName is always a string,
    // but it adds an extra layer of explicit safety if the initial String() conversion were to fail unexpectedly.
    if (typeof cleanedPortalName === 'string' && cleanedPortalName.length > 0) {
      return `/portal-logos/${cleanedPortalName.toLowerCase().replace(/\s/g, '-')}.png`;
    } else {
      return '/portal-logos/default.png'; // Fallback for unexpected non-string or empty value
    }
  }
};

// Helper function to extract name from owner field
const formatOwnerName = (owner: string): string => {
  // If owner contains email format, extract name part
  if (owner.includes('@')) {
    const namePart = owner.split('@')[0];
    // Convert underscore/dot separated names to proper format
    return namePart.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  // Return as is if it's already a name
  return owner;
};

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
      <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold py-2 align-middle">
        <InvoiceNumber 
          number={invoice.number}
          hasWarning={invoice.hasWarning}
          status={invoice.status}
          isCreditMemo={invoice.documentType === "Credit Memo"}
          isDuplicate={invoice.isDuplicate}
        />
      </TableCell>
      
      <TableCell className="truncate">
          <span className="truncate cursor-help">{invoice.buyer}</span>
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
      
      <TableCell className="truncate flex items-center gap-2">
        {(() => {
          const resolvedPortalName = invoice.portal;
          return (
            <>
              <img 
                src={getPortalLogoUrl(resolvedPortalName)} 
                alt={`${resolvedPortalName} logo`}
                className="w-5 h-5 object-contain rounded-full"
                onError={(e) => {
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = '/portal-logos/default.png';
                }}
              />
              <span>{resolvedPortalName}</span>
            </>
          );
        })()}
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
                <span className="truncate cursor-help">{formatOwnerName(invoice.owner)}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatOwnerName(invoice.owner)}</p>
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
