
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { PortalRecordFilters } from "./types";
import { getActiveFilters } from "./utils/getActiveFilters";

interface ActiveFiltersListProps {
  filters: PortalRecordFilters;
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
          <Badge
            key={filter.key}
            variant="outline"
            className="px-2.5 py-1 text-sm cursor-pointer hover:bg-purple-50 bg-purple-50 text-purple-700 border-purple-200"
            onClick={() => onRemoveFilter(filter.key, filter.value)}
          >
            {filter.label}: {filter.value}
            <span className="ml-1 text-purple-400">×</span>
          </Badge>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
