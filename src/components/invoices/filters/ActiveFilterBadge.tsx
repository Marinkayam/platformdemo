
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActiveFilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function ActiveFilterBadge({ label, value, onRemove }: ActiveFilterBadgeProps) {
  return (
    <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1">
      {label}: {value}
      <X 
        className="ml-1 h-3 w-3 cursor-pointer" 
        onClick={onRemove}
      />
    </Badge>
  );
}
