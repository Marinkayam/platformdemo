
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

export function PortalRecordsActions({ recordCount = 0 }) {
  const handleExportRecords = () => {
    // If more than 1000 records, show error toast
    if (recordCount > 1000) {
      toast({
        title: "Export limit exceeded",
        description: "You can only export up to 1000 portal records at a time.",
        variant: "destructive",
      });
      return;
    }

    // Generate mock CSV data
    const csvContent = "Portal Record ID,Portal,Buyer,Portal Status,Invoice Number,Type,Total,PO Number,Supplier Name\nPR-001,SAP Ariba,Apple Inc,Approved,INV-12345,Primary,$1000.00,PO-001,Tech Supplier Ltd\nPR-002,Coupa,Microsoft Corp,Pending,INV-67890,Alternate,$2000.00,PO-002,Global Parts Inc";
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portal-records-export.csv";
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export completed",
      description: "Your portal records have been downloaded as CSV.",
    });
  };

  const handleCustomizeTable = () => {
    toast({
      title: "Customize Table",
      description: "Table customization feature coming soon.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 h-9 bg-white flex items-center">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] bg-white border shadow-lg z-50">
        <DropdownMenuItem onClick={handleExportRecords}>
          <Download className="mr-2 h-4 w-4" />
          <span className="text-[14px]">Export All</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
