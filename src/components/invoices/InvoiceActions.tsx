
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { MoreVertical, TableProperties, Download } from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";
import { TableCustomizationDialog } from "@/components/invoices/TableCustomizationDialog";
import { EmailExportModal } from "@/components/invoices/EmailExportModal";

export function InvoiceActions({ invoiceCount = 0 }) {
  const [customizeTableOpen, setCustomizeTableOpen] = useState(false);
  const [emailExportOpen, setEmailExportOpen] = useState(false);

  const handleCustomizeTable = (columns: any[]) => {
    const selectedColumns = columns.filter(c => c.selected);
    const columnNames = selectedColumns.map(c => c.name).join(', ');
    
    showSuccessToast(
      "Table customized successfully",
      `Showing ${selectedColumns.length} columns: ${columnNames.length > 50 ? columnNames.substring(0, 50) + '...' : columnNames}`
    );
    
    // Here you could implement actual column visibility logic
    console.log('Selected columns:', selectedColumns);
  };

  const handleExportInvoices = () => {
    if (invoiceCount > 1000) {
      showErrorToast(
        "Export limit exceeded",
        "You can only export up to 1000 invoices at a time."
      );
      return;
    }

    if (invoiceCount <= 10) {
      downloadInvoices();
      return;
    }

    setEmailExportOpen(true);
  };

  const downloadInvoices = () => {
    // Generate mock CSV data based on actual invoice count
    const csvContent = `Invoice Number,Buyer,Due Date,Status,Total,Portal,Owner
INV-001,Apple Inc.,2025-01-15,Paid,$1000.00,SAP Ariba,John Smith
INV-002,Microsoft Corp.,2025-02-01,Pending Action,$2000.00,Coupa,Jane Doe
INV-003,Amazon Inc.,2025-01-20,Settled,$1500.00,Oracle,$Bob Johnson`;
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoices-export-${new Date().toISOString().split('T')[0]}.csv`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccessToast(
      "Export completed",
      `${invoiceCount} invoices have been downloaded as CSV.`
    );
  };

  const handleEmailExport = (email: string) => {
    showSuccessToast(
      "Export sent",
      `${invoiceCount} invoices have been sent to ${email}`
    );
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
          <DropdownMenuItem onClick={() => setCustomizeTableOpen(true)} className="hidden">
            <TableProperties className="mr-2 h-4 w-4" />
            <span className="text-[14px]">Customize Table</span>
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
