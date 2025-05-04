
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
import { format } from "date-fns";

const tabs = [
  { id: "all", label: "All Invoices" },
  { id: "pending", label: "Pending Action", count: 5 },
  { id: "overdue", label: "Overdue" },
  { id: "cleared", label: "Cleared" },
];

export default function Invoices() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<InvoiceFiltersType>({
    status: [],
    total: "All",
    dueDate: {
      from: "",
      to: "",
    },
    buyer: [],
    portal: [],
    transactionType: "All",
    owner: [],
    search: "",
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
      setActiveTab("overdue");
    } else {
      setActiveTab("all");
    }
  }, [location.search]);
  
  // Check if a date is overdue
  const isOverdue = (dateString: string) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of today
      return dueDate < today;
    } catch {
      return false;
    }
  };
  
  // Filter invoices based on active tab and filters
  const filteredInvoices = invoiceData.filter((invoice: Invoice) => {
    // First apply tab filter
    if (activeTab === "pending" && invoice.status !== "Pending Action") return false;
    if (activeTab === "overdue" && !isOverdue(invoice.dueDate)) return false;
    if (activeTab === "cleared" && !["Paid", "Settled"].includes(invoice.status)) return false;
    
    // Then apply dropdown filters
    if (filters.status.length > 0 && !filters.status.includes(invoice.status)) return false;
    
    if (filters.buyer.length > 0 && !filters.buyer.includes(invoice.buyer)) return false;
    
    if (filters.portal.length > 0 && (!invoice.portal || !filters.portal.includes(invoice.portal))) return false;
    
    // Apply transaction type filter
    if (filters.transactionType !== "All") {
      if (filters.transactionType === "Invoice" && invoice.documentType === "Credit Memo") return false;
      if (filters.transactionType === "Credit Memo" && invoice.documentType !== "Credit Memo") return false;
    }
    
    // Apply owner filter
    if (filters.owner.length > 0 && !filters.owner.includes(invoice.owner)) return false;
    
    // Apply date range filter
    if (filters.dueDate.from || filters.dueDate.to) {
      try {
        const dueDate = new Date(invoice.dueDate);
        
        if (filters.dueDate.from) {
          const fromDate = new Date(filters.dueDate.from);
          if (dueDate < fromDate) return false;
        }
        
        if (filters.dueDate.to) {
          const toDate = new Date(filters.dueDate.to);
          toDate.setHours(23, 59, 59, 999); // End of the day
          if (dueDate > toDate) return false;
        }
      } catch {
        // Ignore invalid dates
      }
    }
    
    // Apply total filter
    if (filters.total !== "All") {
      const total = Math.abs(invoice.total); // Use absolute value for filtering
      if (filters.total === "Under $1000" && total >= 1000) return false;
      if (filters.total === "$1000-$10000" && (total < 1000 || total > 10000)) return false;
      if (filters.total === "Over $10000" && total <= 10000) return false;
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        invoice.number.toLowerCase().includes(searchLower) ||
        invoice.buyer.toLowerCase().includes(searchLower) ||
        invoice.owner.toLowerCase().includes(searchLower) ||
        (invoice.portal && invoice.portal.toLowerCase().includes(searchLower))
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

  // Calculate counts for tabs
  const pendingCount = invoiceData.filter(invoice => invoice.status === "Pending Action").length;
  const overdueCount = invoiceData.filter(invoice => isOverdue(invoice.dueDate)).length;
  const clearedCount = invoiceData.filter(invoice => ["Paid", "Settled"].includes(invoice.status)).length;
  
  // Update tabs with counts
  const tabsWithCounts = [
    { id: "all", label: "All Invoices", count: invoiceData.length },
    { id: "pending", label: "Pending Action", count: pendingCount },
    { id: "overdue", label: "Overdue", count: overdueCount },
    { id: "cleared", label: "Cleared", count: clearedCount },
  ];

  return (
    <div>
      <h1 className="text-[32px] font-semibold text-gray-900 mb-6">Invoices</h1>
      
      <InvoiceTabs
        tabs={tabsWithCounts}
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
