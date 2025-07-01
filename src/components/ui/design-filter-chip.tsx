
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DesignFilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function DesignFilterChip({ label, value, onRemove }: DesignFilterChipProps) {
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
