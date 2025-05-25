
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExcludeInvoiceDialog } from "@/components/invoices/ExcludeInvoiceDialog";

interface InvoiceActionsMenuProps {
  invoiceId: string;
  invoiceNumber?: string;
  onExclude: (invoiceId: string) => void;
}

export function InvoiceActionsMenu({ invoiceId, invoiceNumber, onExclude }: InvoiceActionsMenuProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExclude = () => {
    onExclude(invoiceId);
    setShowConfirm(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:bg-muted p-1.5 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4 text-[#01173E]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-md">
          <DropdownMenuItem 
            className="text-red-600 hover:text-red-700 cursor-pointer rounded-md"
            onClick={() => setShowConfirm(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
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

      <ExcludeInvoiceDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={handleExclude}
        invoiceNumber={invoiceNumber}
      />
    </>
  );
}
