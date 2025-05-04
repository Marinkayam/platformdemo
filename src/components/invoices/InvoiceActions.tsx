
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
