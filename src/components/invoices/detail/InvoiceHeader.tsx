
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Trash2, UserCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Invoice } from "@/types/invoice";
import { AssigneeComponent } from "../AssigneeComponent";
import { toast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface InvoiceHeaderProps {
  invoice: Invoice;
}

export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  const [localInvoice, setLocalInvoice] = useState<Invoice>(invoice);
  const isPendingAction = localInvoice.status === "Pending Action";
  const isCreditMemo = localInvoice.documentType === "Credit Memo";

  const handleAssign = (email: string) => {
    setLocalInvoice({...localInvoice, assignee: email});
  };

  const handleRemoveAssignee = () => {
    setLocalInvoice({...localInvoice, assignee: undefined});
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/invoices">Invoices</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{localInvoice.number}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">{localInvoice.number}</h1>
            <StatusBadge status={localInvoice.status} />
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-[14px] text-gray-600">
          <span>Owner: {localInvoice.owner}</span>
          <span>Transaction Type: {isCreditMemo ? "Credit Memo" : "Invoice"}</span>
          
          {isPendingAction && (
            <div className="flex items-center gap-2">
              <span>Assignee: </span>
              <div onClick={(e) => e.stopPropagation()} className="inline-block">
                <AssigneeComponent 
                  assignee={localInvoice.assignee}
                  onAssign={handleAssign}
                  onRemove={handleRemoveAssignee}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
