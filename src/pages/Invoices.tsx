
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs";
import { InvoiceFilters, InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/InvoiceFilters";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { TableCustomizationDialog } from "@/components/invoices/TableCustomizationDialog";
import { invoiceData } from "@/data/invoices";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Settings, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const tabs = [
  { id: "all", label: "All Invoices" },
  { id: "pending", label: "Pending Action", count: 5 },
  { id: "cleared", label: "Cleared" },
];

export default function Invoices() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<InvoiceFiltersType>({
    status: "All",
    total: "All",
    dueDate: "All",
    buyer: "All",
    search: ""
  });
  const [customizeTableOpen, setCustomizeTableOpen] = useState(false);
  
  // Set active tab based on URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    
    if (status === "pending") {
      setActiveTab("pending");
    } else if (status === "cleared") {
      setActiveTab("cleared");
    } else if (status === "overdue") {
      // Handle overdue filter separately
      setActiveTab("all");
      setFilters(prev => ({ ...prev, dueDate: "Overdue" }));
    } else {
      setActiveTab("all");
    }
  }, [location.search]);
  
  // Filter invoices based on active tab and filters
  const filteredInvoices = invoiceData.filter((invoice: Invoice) => {
    // First apply tab filter - Updated to only show "Pending Action" status in pending tab
    if (activeTab === "pending" && invoice.status !== "Pending Action") return false;
    if (activeTab === "cleared" && !["Paid", "Settled"].includes(invoice.status)) return false;
    
    // Then apply dropdown filters
    if (filters.status !== "All" && invoice.status !== filters.status) return false;
    if (filters.buyer !== "All" && invoice.buyer !== filters.buyer) return false;
    
    // Apply total filter
    if (filters.total !== "All") {
      const total = invoice.total;
      if (filters.total === "Under $1000" && total >= 1000) return false;
      if (filters.total === "$1000-$10000" && (total < 1000 || total > 10000)) return false;
      if (filters.total === "Over $10000" && total <= 10000) return false;
    }
    
    // Apply due date filter
    if (filters.dueDate === "Overdue" && !invoice.isOverdue) return false;
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        invoice.number.toLowerCase().includes(searchLower) ||
        invoice.buyer.toLowerCase().includes(searchLower) ||
        invoice.owner.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

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
    <div>
      <h1 className="text-[32px] font-semibold text-gray-900 mb-6">Invoices</h1>
      
      <InvoiceTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex justify-between items-center mb-6">
        <InvoiceFilters onFilterChange={setFilters} />
        
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
      </div>
      
      <InvoiceTable 
        invoices={filteredInvoices} 
        isPendingTab={activeTab === "pending"}
      />
      
      <TableCustomizationDialog 
        open={customizeTableOpen}
        onOpenChange={setCustomizeTableOpen}
        onApplyChanges={handleCustomizeTable}
      />
    </div>
  );
}
