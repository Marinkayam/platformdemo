
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Settings, Download, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PurchaseOrderActionsProps {
  purchaseOrderCount?: number;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function PurchaseOrderActions({ 
  purchaseOrderCount = 0, 
  searchValue = "",
  onSearchChange 
}: PurchaseOrderActionsProps) {
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

  const handleCustomizeTable = () => {
    toast({
      title: "Customize Table",
      description: "Table customization feature coming soon.",
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Search Input */}
      <div className="relative w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search PO number..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="h-8 pl-8"
        />
      </div>
      
      {/* Kebab Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 bg-white flex items-center">
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
    </div>
  );
}
