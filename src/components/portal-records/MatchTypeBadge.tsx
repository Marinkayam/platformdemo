
import { Badge } from "@/components/ui/badge";

interface MatchTypeBadgeProps {
  type: 'Primary' | 'Alternate' | 'Unmatched' | 'Conflict';
}

export function MatchTypeBadge({ type }: MatchTypeBadgeProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'Primary':
        return {
          className: "bg-blue-100 text-blue-700 border-blue-200",
          text: "Primary"
        };
      case 'Alternate':
        return {
          className: "bg-purple-100 text-purple-700 border-purple-200",
          text: "Alternate"
        };
      case 'Unmatched':
        return {
          className: "bg-orange-100 text-orange-700 border-orange-200",
          text: "Unmatched"
        };
      case 'Conflict':
        return {
          className: "bg-red-100 text-red-700 border-red-200",
          text: "Conflict"
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700 border-gray-200",
          text: type
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Badge variant="outline" className={config.className}>
      {config.text}
    </Badge>
  );
}
