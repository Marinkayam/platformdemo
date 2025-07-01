
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PortalRecordFilters } from "./types";
import { getActiveFilters } from "./utils/getActiveFilters";

interface ActiveFiltersListProps {
  filters: PortalRecordFilters;
  onRemoveFilter: (key: string, value: string) => void;
}

function ActiveFilterBadge({ label, value, onRemove }: { label: string; value: string; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-normal rounded-full"
      style={{ backgroundColor: '#EFEBFF', color: '#7B59FF' }}
    >
      <span>{label}: {value}</span>
      <button
        onClick={onRemove}
        className="rounded-full p-0.5 transition-colors"
        style={{ color: '#7B59FF' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(123, 89, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
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
