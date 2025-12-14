import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Invoice } from "@/types/invoice";
import { AssigneeComponent } from "../AssigneeComponent";
import { ExcludeInvoiceDialog } from "../ExcludeInvoiceDialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    return "All Request-to-Pay";
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return <>
    {/* Breadcrumb */}
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={handleBackNavigation}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/invoices">Request-to-Pay</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/invoices${getBreadcrumbContext() === "Pending Actions" ? "?status=pending" : getBreadcrumbContext() === "Cleared" ? "?status=cleared" : ""}`}>
                  {getBreadcrumbContext()}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{localInvoice.number}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>

    {/* Header Card */}
    <Card className="p-6 rounded-xl mb-6">
      <div className="flex flex-col gap-6">
        {/* Top Tier: Invoice Number (left) and Status + Actions (right) */}
        <div className="flex items-start justify-between">
          {/* Primary Focus: Invoice Number */}
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground font-light">Invoice:</span>
            <span
              className="text-xl font-bold text-[#01173E] cursor-pointer select-all hover:text-[#7B59FF] transition-colors"
              onClick={() => copyToClipboard(localInvoice.number.replace(/^INV-/i, ''))}
              title="Click to copy"
            >
              {localInvoice.number.replace(/^INV-/i, '')}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Status */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <StatusBadge status={localInvoice.status} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Invoice status</p>
              </TooltipContent>
            </Tooltip>

            {/* Actions Menu */}
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
        </div>

        <Separator className="border-[#E4E5E9]" />

        {/* Bottom Tier: Metadata Grid - Original Data */}
        <div className="flex gap-8 flex-wrap">
          {/* Buyer */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-light">Buyer:</span>
            <span className="text-sm font-medium text-[#01173E]">{localInvoice.buyer}</span>
          </div>

          {/* Transaction Type */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-light">Transaction Type:</span>
            <span className="text-sm font-medium text-[#01173E]">{isCreditMemo ? "Credit Memo" : "Invoice"}</span>
          </div>

          {/* Assignee - only show if pending action */}
          {isPendingAction && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-light">Assignee:</span>
              <div onClick={e => e.stopPropagation()} className="inline-block">
                <AssigneeComponent assignee={localInvoice.assignee} onAssign={handleAssign} onRemove={handleRemoveAssignee} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>

    <ExcludeInvoiceDialog open={showConfirm} onOpenChange={setShowConfirm} onConfirm={handleExcludeInvoice} invoiceNumber={localInvoice.number} />
  </>;
}
