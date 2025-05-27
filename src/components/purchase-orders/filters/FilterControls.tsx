
import { motion } from "framer-motion";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { PurchaseOrderFilters } from "./types";
import { filterConfig } from "./filterConfig";

interface FilterControlsProps {
  filters: PurchaseOrderFilters;
  onFilterChange: (key: keyof PurchaseOrderFilters, value: any) => void;
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
    </motion.div>
  );
}
