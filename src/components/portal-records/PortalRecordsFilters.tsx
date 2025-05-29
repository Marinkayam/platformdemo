
import { PortalRecordFilters } from "./filters/types";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePortalRecordFiltersState } from "@/hooks/usePortalRecordFiltersState";

interface PortalRecordsFiltersProps {
  onFilterChange: (filters: PortalRecordFilters) => void;
}

export function PortalRecordsFilters({ onFilterChange }: PortalRecordsFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleSearchChange
  } = usePortalRecordFiltersState(onFilterChange);

  const portalOptions = ["All", "Ariba", "Coupa", "Bill", "Tipalti", "Oracle"];
  const buyerOptions = ["All", "Acme Corporation", "Global Enterprises", "European Partners GmbH", "Tech Solutions Ltd", "Retail Chain Inc", "Manufacturing Co"];
  const statusOptions = ["All", "Approved", "Paid", "Rejected", "Pending"];

  return (
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
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search records..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
    </div>
  );
}
