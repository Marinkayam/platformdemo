
import { motion } from "framer-motion";
import { FilterDropdown } from "./FilterDropdown";
import { DateRangePicker } from "./DateRangePicker";
import { InvoiceFilters } from "./types";
import { filterConfig } from "./filterConfig";

interface FilterControlsProps {
  filters: InvoiceFilters;
  onFilterChange: (key: keyof InvoiceFilters, value: any) => void;
}

export function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  return (
    <motion.div 
      className="flex flex-wrap items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FilterDropdown 
        label="Status" 
        value={filters.status} 
        options={filterConfig.statusOptions}
        onSelect={(value) => onFilterChange("status", value)}
        multiSelect
        searchable
      />
      <FilterDropdown 
        label="Buyer" 
        value={filters.buyer} 
        options={filterConfig.buyerOptions}
        onSelect={(value) => onFilterChange("buyer", value)}
        multiSelect
        searchable
      />
      <FilterDropdown 
        label="Portal" 
        value={filters.portal} 
        options={filterConfig.portalOptions}
        onSelect={(value) => onFilterChange("portal", value)}
        multiSelect
        searchable
      />
      <FilterDropdown 
        label="Transaction Type" 
        value={filters.transactionType} 
        options={filterConfig.transactionOptions}
        onSelect={(value) => onFilterChange("transactionType", value as string)}
      />
      <FilterDropdown 
        label="Owner" 
        value={filters.owner} 
        options={filterConfig.ownerOptions}
        onSelect={(value) => onFilterChange("owner", value)}
        multiSelect
        searchable
      />
      <div className="ml-auto">
        <DateRangePicker
          fromDate={filters.dueDate.from}
          toDate={filters.dueDate.to}
          onDateChange={(from, to) => onFilterChange("dueDate", { from, to })}
        />
      </div>
    </motion.div>
  );
}
