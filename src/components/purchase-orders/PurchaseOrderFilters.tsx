
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PurchaseOrderFilters as FilterType, PurchaseOrderStatus } from "@/types/purchaseOrder";
import { Search, X } from "lucide-react";

interface PurchaseOrderFiltersProps {
  onFilterChange: (filters: FilterType) => void;
  purchaseOrderCount: number;
}

const buyerNames = ["Acme Corporation", "TechStart Inc", "Global Manufacturing", "Retail Solutions LLC", "Healthcare Systems"];
const portals = ["SAP Ariba", "Oracle iProcurement", "Coupa", "Jaggaer"];
const statuses: PurchaseOrderStatus[] = ["New", "Open", "Closed", "Partially Invoiced", "Fully Invoiced"];

export function PurchaseOrderFilters({ onFilterChange, purchaseOrderCount }: PurchaseOrderFiltersProps) {
  const [filters, setFilters] = useState<FilterType>({});

  const updateFilter = (key: keyof FilterType, value: string | undefined) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value as any;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search PO Number
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by PO number..."
              value={filters.poNumber || ""}
              onChange={(e) => updateFilter("poNumber", e.target.value || undefined)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buyer Name
          </label>
          <Select value={filters.buyerName || ""} onValueChange={(value) => updateFilter("buyerName", value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All buyers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All buyers</SelectItem>
              {buyerNames.map((buyer) => (
                <SelectItem key={buyer} value={buyer}>{buyer}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portal
          </label>
          <Select value={filters.portal || ""} onValueChange={(value) => updateFilter("portal", value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All portals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All portals</SelectItem>
              {portals.map((portal) => (
                <SelectItem key={portal} value={portal}>{portal}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select value={filters.status || ""} onValueChange={(value) => updateFilter("status", value as PurchaseOrderStatus || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{purchaseOrderCount} purchase orders found</span>
      </div>
    </div>
  );
}
