
import { PortalRecordFilters } from "./filters/types";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { DateRangePicker } from "@/components/invoices/filters/DateRangePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { ActiveFiltersList } from "./filters/ActiveFiltersList";
import { usePortalRecordFiltersState } from "@/hooks/usePortalRecordFiltersState";

interface PortalRecordsFiltersProps {
  onFilterChange: (filters: PortalRecordFilters) => void;
  needsAttentionCount: number;
}

export function PortalRecordsFilters({ onFilterChange }: PortalRecordsFiltersProps) {
  const { 
    filters, 
    handleFilterChange,
    handleSearchChange,
    handleRemoveFilter,
    handleResetFilters
  } = usePortalRecordFiltersState(onFilterChange);

  const portalOptions = ["All", "Ariba", "Coupa", "Bill", "Tipalti", "Oracle"];
  const buyerOptions = ["All", "Acme Corporation", "Global Enterprises", "European Partners GmbH", "Tech Solutions Ltd", "Retail Chain Inc", "Manufacturing Co"];
  const statusOptions = ["All", "Approved", "Paid", "Rejected", "Pending"];
  const transactionTypeOptions = ["All", "Invoice", "Credit Note", "Debit Note", "Purchase Order"];
  const recordTypeOptions = ["Primary", "Alternate", "Unmatched", "Conflict"];

  const handleDateChange = (fromDate: string, toDate: string) => {
    handleFilterChange("dueDate", { from: fromDate, to: toDate });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
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

          <FilterDropdown
            label="Transaction Type"
            value={filters.transactionType}
            options={transactionTypeOptions}
            onSelect={(value) => handleFilterChange("transactionType", value)}
          />

          <FilterDropdown
            label="Record Type"
            value={filters.recordType}
            options={recordTypeOptions}
            onSelect={(value) => handleFilterChange("recordType", value)}
            multiSelect
          />

          <DateRangePicker
            fromDate={filters.dueDate.from}
            toDate={filters.dueDate.to}
            onDateChange={handleDateChange}
          />
          
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

        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 flex items-center gap-1"
          onClick={handleResetFilters}
        >
          <RefreshCw className="h-3 w-3" />
          <span className="text-[14px]">Clear All</span>
        </Button>
      </div>
      
      <ActiveFiltersList 
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />
    </div>
  );
}
