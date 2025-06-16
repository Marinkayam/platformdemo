
import { PortalRecordFilters } from "./filters/types";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ActiveFiltersList } from "./filters/ActiveFiltersList";
import { usePortalRecordFiltersState } from "@/hooks/usePortalRecordFiltersState";
import { Button } from "@/components/ui/button";

interface PortalRecordsFiltersProps {
  onFilterChange: (filters: PortalRecordFilters) => void;
  needsAttentionCount: number;
}

export function PortalRecordsFilters({ onFilterChange, needsAttentionCount }: PortalRecordsFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleSearchChange,
    handleRemoveFilter
  } = usePortalRecordFiltersState(onFilterChange);

  const portalOptions = ["All", "Ariba", "Coupa", "Bill", "Tipalti", "Oracle"];
  const buyerOptions = ["All", "Acme Corporation", "Global Enterprises", "European Partners GmbH", "Tech Solutions Ltd", "Retail Chain Inc", "Manufacturing Co"];
  const statusOptions = ["All", "Approved", "Paid", "Rejected", "Pending"];

  const handleNeedsAttentionToggle = () => {
    handleFilterChange("needsAttention", !filters.needsAttention);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <FilterDropdown
          label="Portal"
          value={filters.portal}
          options={portalOptions}
          onSelect={(value) => handleFilterChange("portal", value)}
          multiSelect
          searchable
        />
        
        <FilterDropdown
          label="Buyer"
          value={filters.buyer}
          options={buyerOptions}
          onSelect={(value) => handleFilterChange("buyer", value)}
          multiSelect
          searchable
        />
        
        <FilterDropdown
          label="Status"
          value={filters.status}
          options={statusOptions}
          onSelect={(value) => handleFilterChange("status", value)}
        />

        <Button
          variant={filters.needsAttention ? "default" : "outline"}
          onClick={handleNeedsAttentionToggle}
          className="flex items-center gap-2"
        >
          Needs Attention {needsAttentionCount > 0 && `(${needsAttentionCount})`}
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search records..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 w-64 h-9 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
      
      <ActiveFiltersList 
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />
    </div>
  );
}
