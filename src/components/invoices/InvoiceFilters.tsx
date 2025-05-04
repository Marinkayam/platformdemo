
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FilterDropdown } from "./filters/FilterDropdown";
import { DateRangePicker } from "./filters/DateRangePicker";
import { ActiveFilterBadge } from "./filters/ActiveFilterBadge";
import { SearchSection } from "./filters/SearchSection";
import { MoreFiltersSection } from "./filters/MoreFiltersSection";
import { InvoiceFilters as InvoiceFiltersType, defaultFilters } from "./filters/types";
import { filterConfig } from "./filters/filterConfig";

interface InvoiceFiltersProps {
  onFilterChange: (filters: InvoiceFiltersType) => void;
}

export function InvoiceFilters({ onFilterChange }: InvoiceFiltersProps) {
  const [filters, setFilters] = useState<InvoiceFiltersType>(defaultFilters);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  
  // Get all active filter values (non-default) for displaying as chips
  const getActiveFilters = () => {
    const active: { key: string; label: string; value: string }[] = [];
    
    if (filters.status.length > 0) {
      filters.status.forEach(status => {
        active.push({
          key: `status-${status}`,
          label: "Status",
          value: status
        });
      });
    }
    
    if (filters.buyer.length > 0) {
      filters.buyer.forEach(buyer => {
        active.push({
          key: `buyer-${buyer}`,
          label: "Buyer",
          value: buyer
        });
      });
    }
    
    if (filters.portal.length > 0) {
      filters.portal.forEach(portal => {
        active.push({
          key: `portal-${portal}`,
          label: "Portal",
          value: portal
        });
      });
    }
    
    if (filters.dueDate.from || filters.dueDate.to) {
      let dateValue = "";
      if (filters.dueDate.from && filters.dueDate.to) {
        dateValue = `${filters.dueDate.from} - ${filters.dueDate.to}`;
      } else if (filters.dueDate.from) {
        dateValue = `From ${filters.dueDate.from}`;
      } else if (filters.dueDate.to) {
        dateValue = `Until ${filters.dueDate.to}`;
      }
      
      active.push({
        key: "date-range",
        label: "Due Date",
        value: dateValue
      });
    }
    
    if (filters.transactionType !== "All") {
      active.push({
        key: "transaction-type",
        label: "Transaction Type",
        value: filters.transactionType
      });
    }
    
    if (filters.owner.length > 0) {
      filters.owner.forEach(owner => {
        active.push({
          key: `owner-${owner}`,
          label: "Owner",
          value: owner
        });
      });
    }
    
    return active;
  };

  const handleFilterChange = (key: keyof InvoiceFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleRemoveFilter = (key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (key.startsWith("status")) {
      newFilters.status = newFilters.status.filter(s => s !== value);
    } else if (key.startsWith("buyer")) {
      newFilters.buyer = newFilters.buyer.filter(b => b !== value);
    } else if (key.startsWith("portal")) {
      newFilters.portal = newFilters.portal.filter(p => p !== value);
    } else if (key === "date-range") {
      newFilters.dueDate = { from: "", to: "" };
    } else if (key === "transaction-type") {
      newFilters.transactionType = "All";
    } else if (key.startsWith("owner")) {
      newFilters.owner = newFilters.owner.filter(o => o !== value);
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default values",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown 
            label="Status" 
            value={filters.status} 
            options={filterConfig.statusOptions}
            onSelect={(value) => handleFilterChange("status", value)}
            multiSelect
            searchable
          />
          <DateRangePicker
            fromDate={filters.dueDate.from}
            toDate={filters.dueDate.to}
            onDateChange={(from, to) => handleFilterChange("dueDate", { from, to })}
          />
          <FilterDropdown 
            label="Buyer" 
            value={filters.buyer} 
            options={filterConfig.buyerOptions}
            onSelect={(value) => handleFilterChange("buyer", value)}
            multiSelect
            searchable
          />
          <FilterDropdown 
            label="Portal" 
            value={filters.portal} 
            options={filterConfig.portalOptions}
            onSelect={(value) => handleFilterChange("portal", value)}
            multiSelect
            searchable
          />
          
          <MoreFiltersSection
            isOpen={moreFiltersOpen}
            onOpenChange={setMoreFiltersOpen}
            transactionType={filters.transactionType}
            onTransactionTypeChange={(value) => handleFilterChange("transactionType", value)}
            owner={filters.owner}
            onOwnerChange={(value) => handleFilterChange("owner", value)}
            transactionOptions={filterConfig.transactionOptions}
            ownerOptions={filterConfig.ownerOptions}
          />
        </div>
        
        <SearchSection
          searchTerm={filters.search}
          onSearchChange={(value) => handleFilterChange("search", value)}
          onResetFilters={handleResetFilters}
        />
      </div>
      
      {getActiveFilters().length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {getActiveFilters().map((filter) => (
            <ActiveFilterBadge
              key={filter.key}
              label={filter.label}
              value={filter.value}
              onRemove={() => handleRemoveFilter(filter.key, filter.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export type { InvoiceFiltersType };
