
import { Badge } from "@/components/ui/badge";

interface PortalStatusBadgeProps {
  status: 'Active' | 'Inactive' | 'Pending' | 'Error';
}

export function PortalStatusBadge({ status }: PortalStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          className: "bg-green-100 text-green-700 border-green-200",
          text: "Active"
        };
      case 'Inactive':
        return {
          className: "bg-gray-100 text-gray-700 border-gray-200",
          text: "Inactive"
        };
      case 'Pending':
        return {
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
          text: "Pending"
        };
      case 'Error':
        return {
          className: "bg-red-100 text-red-700 border-red-200",
          text: "Error"
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700 border-gray-200",
          text: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant="outline" className={config.className}>
      {config.text}
    </Badge>
  );
}
