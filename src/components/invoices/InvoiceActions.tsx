
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Settings, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { TableCustomizationDialog } from "@/components/invoices/TableCustomizationDialog";

export function InvoiceActions() {
  const [customizeTableOpen, setCustomizeTableOpen] = useState(false);

  const handleCustomizeTable = (columns: any[]) => {
    toast({
      title: "Table customized",
      description: `${columns.filter(c => c.selected).length} columns selected`,
    });
  };

  const handleExportAll = () => {
    toast({
      title: "Export started",
      description: "Exporting all invoices to CSV...",
    });
    
    // Create a simple CSV string
    const csvContent = "Invoice Number,Buyer,Due Date,Status,Total\nINV-001,Apple,2025-01-01,Paid,$1000.00\nINV-002,Microsoft,2025-02-01,Pending,$2000.00";
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoices-export-dummy.csv";
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <DropdownMenuItem onClick={handleExportAll}>
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
    </>
  );
}
