
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ActiveFilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function ActiveFilterBadge({ label, value, onRemove }: ActiveFilterBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-normal"
    >
      <span>{label}: {value}</span>
      <button
        onClick={onRemove}
        className="hover:bg-purple-100 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
