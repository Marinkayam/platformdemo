
import { motion, AnimatePresence } from "framer-motion";
import { ActiveFilterBadge } from "@/components/invoices/filters/ActiveFilterBadge";
import { PurchaseOrderFilters } from "./types";
import { getActiveFilters } from "./utils/getActiveFilters";

interface ActiveFiltersListProps {
  filters: PurchaseOrderFilters;
  onRemoveFilter: (key: string, value: string) => void;
}

export function ActiveFiltersList({ filters, onRemoveFilter }: ActiveFiltersListProps) {
  const activeFilters = getActiveFilters(filters);

  if (activeFilters.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="flex flex-wrap gap-2 pt-2 filter-transition"
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: activeFilters.length > 0 ? 1 : 0,
        height: activeFilters.length > 0 ? 'auto' : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {activeFilters.map((filter) => (
          <ActiveFilterBadge
            key={filter.key}
            label={filter.label}
            value={filter.value}
            onRemove={() => onRemoveFilter(filter.key, filter.value)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
