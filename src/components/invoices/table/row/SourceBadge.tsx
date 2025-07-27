import { Invoice } from "@/types/invoice";
import { Sparkles } from "lucide-react";
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
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full cursor-help whitespace-nowrap">
            <Sparkles className="h-3 w-3" />
            {isPaymentReport ? 'PR' : 'AR'}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">Created from {submitMethod}</p>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}