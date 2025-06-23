
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InvoiceSearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPortal: string;
  selectedBuyer: string;
  filteredInvoicesCount: number;
}

export function InvoiceSearchSection({
  searchTerm,
  setSearchTerm,
  selectedPortal,
  selectedBuyer,
  filteredInvoicesCount,
}: InvoiceSearchSectionProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Search Invoices</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice ID, number, or buyer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Showing {filteredInvoicesCount} invoices from {selectedPortal} • {selectedBuyer === "all_buyers" ? "All Buyers" : selectedBuyer}
        </p>
      </div>
    </div>
  );
}
