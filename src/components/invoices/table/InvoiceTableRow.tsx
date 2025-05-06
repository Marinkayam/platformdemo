
import { TableCell, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { StatusBadge } from "@/components/ui/status-badge";
import { AssigneeComponent } from "../AssigneeComponent";
import { InvoiceNumber } from "./row/InvoiceNumber";
import { RejectionInfo } from "./row/RejectionInfo";
import { OwnerInfo } from "./row/OwnerInfo";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

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
  const isRejectedByMonto = invoice.rejectedBy === "Monto";
  const isRejectedByBuyer = invoice.rejectedBy === "Buyer";
  const isCreditMemo = invoice.documentType === "Credit Memo";
  const isAwaitingSC = invoice.status === "Awaiting SC";
  
  // Format the due date to MM/DD/YYYY if it's a valid date
  const formatDueDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return format(date, "MM/dd/yyyy");
      }
      return dateString;
    } catch {
      return dateString;
    }
  };

  // Get portal display value based on buyer name
  const getPortalDisplay = () => {
    if (isAwaitingSC) {
      return "—"; // Show dash only for "Awaiting SC" status
    }
    
    if (invoice.portal) {
      return invoice.portal;
    }
    
    // Generate a portal name based on buyer
    const companyName = invoice.buyer.split(' ')[0];
    return `${companyName} Portal`;
  };

  return (
    <TableRow 
      className={`cursor-pointer hover:bg-gray-50 ${isPending ? 'bg-red-50/30' : ''} h-[56px]`}
      onClick={() => onNavigate(invoice.id)}
    >
      <InvoiceNumber 
        number={invoice.number}
        hasWarning={invoice.hasWarning}
        isPending={isPending}
        isCreditMemo={isCreditMemo}
      />
      
      <TableCell className="text-[14px] text-gray-900 py-2 align-middle truncate max-w-[180px]">
        {invoice.buyer}
      </TableCell>
      
      {isPendingTab ? (
        <RejectionInfo 
          isRejectedByMonto={isRejectedByMonto}
          isRejectedByBuyer={isRejectedByBuyer}
        />
      ) : (
        <TableCell className="text-[14px] text-gray-900 py-2 align-middle">
          {formatDueDate(invoice.dueDate)}
        </TableCell>
      )}
      
      <TableCell className="text-[14px] text-gray-900 py-2 align-middle">
        <StatusBadge status={invoice.status} />
      </TableCell>
      
      <TableCell className="text-[14px] text-gray-900 py-2 align-middle">
        {formatCurrency(invoice.total)}
      </TableCell>
      
      <TableCell className="text-[14px] text-gray-900 py-2 align-middle truncate max-w-[120px]">
        {getPortalDisplay()}
      </TableCell>
      
      <TableCell 
        className="text-[14px] text-gray-900 py-2 align-middle"
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
