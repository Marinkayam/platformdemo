
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace(/[^a-z]/g, '');
    
    switch (normalizedStatus) {
      case 'approved':
      case 'paid':
      case 'settled':
      case 'active':
      case 'connected':
      case 'success':
        return 'bg-success-main text-success-contrast-text';
      
      case 'pending':
      case 'awaitingapproval':
      case 'processing':
      case 'inprogress':
        return 'bg-warning-main text-warning-contrast-text';
      
      case 'rejected':
      case 'failed':
      case 'error':
      case 'disconnected':
      case 'inactive':
        return 'bg-error-main text-error-contrast-text';
      
      case 'rtp':
      case 'requesttopay':
        return 'bg-info-main text-info-contrast-text';
      
      case 'partiallysettled':
      case 'partiallyprocessed':
        return 'bg-primary-main text-primary-contrast-text';
      
      case 'excluded':
      case 'cancelled':
      case 'draft':
        return 'bg-grey-500 text-grey-0';
      
      default:
        return 'bg-grey-500 text-grey-0';
    }
  };

  const getStatusText = (status: string) => {
    // Update RTP terminology
    if (status.toLowerCase().includes('rtp') || status.toLowerCase().includes('real-time payment')) {
      return 'Request to Pay';
    }
    return status;
  };

  return (
    <Badge 
      variant={variant}
      className={cn(
        "text-xs font-medium",
        variant === "default" && getStatusColor(status),
        className
      )}
    >
      {getStatusText(status)}
    </Badge>
  );
}
