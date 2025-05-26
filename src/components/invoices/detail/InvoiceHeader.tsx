import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, File, UserRoundCheck, MoreVertical, ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
import { Invoice } from "@/types/invoice";
import { AssigneeComponent } from "../AssigneeComponent";
import { ExcludeInvoiceDialog } from "../ExcludeInvoiceDialog";
import { mockConnectionWithIssue } from "./rtp/mockData";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface InvoiceHeaderProps {
  invoice: Invoice;
}

export function InvoiceHeader({
  invoice
}: InvoiceHeaderProps) {
  const navigate = useNavigate();
  const [localInvoice, setLocalInvoice] = useState<Invoice>(invoice);
  const [showConfirm, setShowConfirm] = useState(false);
  const isPendingAction = localInvoice.status === "Pending Action";
  const isCreditMemo = localInvoice.documentType === "Credit Memo";

  const handleAssign = (email: string) => {
    setLocalInvoice({
      ...localInvoice,
      assignee: email
    });
  };

  const handleRemoveAssignee = () => {
    setLocalInvoice({
      ...localInvoice,
      assignee: undefined
    });
  };

  const handleExcludeInvoice = () => {
    console.log('Exclude invoice action triggered for:', localInvoice.id);
    setShowConfirm(false);
    // TODO: Implement actual exclude logic when backend is ready
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

  const handleBackNavigation = () => {
    const context = getBreadcrumbContext();
    let searchParams = "";
    
    if (context === "Pending Actions") {
      searchParams = "?status=pending";
    } else if (context === "Cleared") {
      searchParams = "?status=cleared";
    } else if (context === "Overdue") {
      searchParams = "?status=overdue";
    }
    
    navigate(`/invoices${searchParams}`);
  };

  return <>
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackNavigation}
            className="mr-3 p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </button>
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
        
        <Card className="p-6 rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="text-lg font-semibold text-[#01173E]">
                    {localInvoice.number}
                  </div>
                  <StatusBadge status={localInvoice.status} dueDate={localInvoice.dueDate} />
                </div>
                <div className="text-sm text-gray-400 font-normal px-2 py-1">
                  {mockConnectionWithIssue.buyer.name} → {mockConnectionWithIssue.supplier.name}
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hover:bg-muted p-1.5 rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4 text-[#01173E]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-md">
                  <DropdownMenuItem className="text-red-600 hover:text-red-700 cursor-pointer rounded-md" onClick={() => setShowConfirm(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                    Exclude Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="border-t border-[#E4E5E9] my-0"></div>
            
            <div className="flex items-center gap-6 text-[14px] text-[#01173E] font-normal">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" style={{
                stroke: "#01173E"
              }} />
                <span className="font-semibold text-[#01173E]">Owner:</span>
                <span>{localInvoice.owner}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" style={{
                stroke: "#01173E"
              }} />
                <span className="font-semibold text-[#01173E]">Transaction Type:</span>
                <span>{isCreditMemo ? "Credit Memo" : "Invoice"}</span>
              </div>
              
              {isPendingAction && <div className="flex items-center gap-2">
                  <UserRoundCheck className="h-4 w-4" style={{
                stroke: "#01173E"
              }} />
                  <span className="font-semibold text-[#01173E]">Assignee:</span>
                  <div onClick={e => e.stopPropagation()} className="inline-block">
                    <AssigneeComponent assignee={localInvoice.assignee} onAssign={handleAssign} onRemove={handleRemoveAssignee} />
                  </div>
                </div>}
            </div>
          </div>
        </Card>
      </div>

      <ExcludeInvoiceDialog open={showConfirm} onOpenChange={setShowConfirm} onConfirm={handleExcludeInvoice} invoiceNumber={localInvoice.number} />
    </>;
}
