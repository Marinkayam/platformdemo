
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

export function PurchaseOrderActions({ purchaseOrderCount = 0 }) {
  const handleExportPurchaseOrders = () => {
    // If more than 1000 purchase orders, show error toast
    if (purchaseOrderCount > 1000) {
      toast({
        title: "Export limit exceeded",
        description: "You can only export up to 1000 purchase orders at a time.",
        variant: "destructive",
      });
      return;
    }

    // Generate mock CSV data
    const csvContent = "PO Number,Buyer,Status,Portal,Total\nPO-001,Apple,New,SAP Ariba,$1000.00\nPO-002,Microsoft,Open,Oracle iProcurement,$2000.00";
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "purchase-orders-export.csv";
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export completed",
      description: "Your purchase orders have been downloaded as CSV.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 h-9 bg-white flex items-center">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onClick={handleExportPurchaseOrders}>
          <Download className="mr-2 h-4 w-4" />
          <span className="text-[14px]">Export All</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
