
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, File, UserRoundCheck } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
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

  // Determine breadcrumb context based on invoice status
  const getBreadcrumbContext = () => {
    if (localInvoice.status === "Pending Action") return "Pending Actions";
    if (["Paid", "Settled"].includes(localInvoice.status)) return "Cleared";
    // Check if overdue (simplified logic)
    try {
      const dueDate = new Date(localInvoice.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) return "Overdue";
    } catch {
      // fallback
    }
    return "All Invoices";
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
              <BreadcrumbPage>{getBreadcrumbContext()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-gray-900">{localInvoice.number}</h1>
              <StatusBadge status={localInvoice.status} />
            </div>
          </div>
          
          {/* Divider between title and metadata */}
          <div className="border-t border-[#E4E5E9] mt-4 mb-2"></div>
          
          <div className="flex items-center gap-6 text-[14px] text-[#01173E] font-normal">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" style={{ stroke: "#01173E" }} />
              <span>Owner: {localInvoice.owner}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <File className="h-4 w-4" style={{ stroke: "#01173E" }} />
              <span>Transaction Type: {isCreditMemo ? "Credit Memo" : "Invoice"}</span>
            </div>
            
            {isPendingAction && (
              <div className="flex items-center gap-2">
                <UserRoundCheck className="h-4 w-4" style={{ stroke: "#01173E" }} />
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
      </Card>
    </div>
  );
}
