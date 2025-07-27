import { Invoice } from "@/types/invoice";
import { FileBarChart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SourceBadgeProps {
  submitMethod?: Invoice['submitMethod'];
}

export function SourceBadge({ submitMethod }: SourceBadgeProps) {
  if (submitMethod !== 'Payment Report' && submitMethod !== 'A/R Report') {
    return <span className="text-muted-foreground text-sm">-</span>;
  }

  const isPaymentReport = submitMethod === 'Payment Report';
  const displayText = isPaymentReport ? 'Payment Report' : 'A/R Report';
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-sm font-medium text-primary cursor-help whitespace-nowrap">
            {displayText}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">Created from {submitMethod}</p>
            <p className="text-xs text-muted-foreground">
              This invoice was automatically generated from a {isPaymentReport ? 'payment' : 'accounts receivable'} report
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}