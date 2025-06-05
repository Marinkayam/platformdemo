import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Settings, Download } from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";
import { TableCustomizationDialog } from "@/components/invoices/TableCustomizationDialog";
import { EmailExportModal } from "@/components/invoices/EmailExportModal";

export function InvoiceActions({ invoiceCount = 0 }) {
  const [customizeTableOpen, setCustomizeTableOpen] = useState(false);
  const [emailExportOpen, setEmailExportOpen] = useState(false);

  const handleCustomizeTable = (columns: any[]) => {
    showSuccessToast({
      title: "Table customized",
      description: `${columns.filter(c => c.selected).length} columns selected`,
    });
  };

  const handleExportInvoices = () => {
    // If more than 1000 invoices, show error toast
    if (invoiceCount > 1000) {
      showErrorToast({
        title: "Export limit exceeded",
        description: "You can only export up to 1000 invoices at a time.",
        variant: "destructive",
      });
      return;
    }

    // If 10 or fewer invoices, download directly
    if (invoiceCount <= 10) {
      downloadInvoices();
      return;
    }

    // If between 11 and 1000 invoices, open email modal
    setEmailExportOpen(true);
  };

  const downloadInvoices = () => {
    // Generate mock CSV data
    const csvContent = "Invoice Number,Buyer,Due Date,Status,Total\nINV-001,Apple,2025-01-01,Paid,$1000.00\nINV-002,Microsoft,2025-02-01,Pending,$2000.00";
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoices-export.csv";
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccessToast({
      title: "Export completed",
      description: "Your invoices have been downloaded as CSV.",
    });
  };

  const handleEmailExport = (email: string) => {
    // Simulate email sending
    showSuccessToast({
      title: "Export sent",
      description: `Your invoices have been sent to ${email}`,
    });

    // Close the modal
    setEmailExportOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2 h-9 bg-white flex items-center">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem onClick={() => setCustomizeTableOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            <span className="text-[14px]">Customise Table</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportInvoices}>
            <Download className="mr-2 h-4 w-4" />
            <span className="text-[14px]">Export All</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TableCustomizationDialog 
        open={customizeTableOpen}
        onOpenChange={setCustomizeTableOpen}
        onApplyChanges={handleCustomizeTable}
      />
      
      <EmailExportModal
        open={emailExportOpen}
        onOpenChange={setEmailExportOpen}
        onExport={handleEmailExport}
      />
    </>
  );
}
