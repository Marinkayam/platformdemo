
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActiveFilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function ActiveFilterBadge({ label, value, onRemove }: ActiveFilterBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
        "px-2 py-1 gap-1 items-center animate-fade-in transition-all duration-200"
      )}
    >
      <span className="font-medium">{label}:</span> {value}
      <X 
        className="h-3 w-3 cursor-pointer hover:text-primary/80" 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </Badge>
  );
}
