
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActiveFilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function ActiveFilterBadge({ label, value, onRemove }: ActiveFilterBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Badge 
        variant="outline" 
        className={cn(
          "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
          "px-2.5 py-1.5 gap-2 items-center transition-all duration-200"
        )}
      >
        <span className="font-medium">{label}:</span> {value}
        <X 
          className="h-3.5 w-3.5 cursor-pointer hover:text-primary/80 transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      </Badge>
    </motion.div>
  );
}
