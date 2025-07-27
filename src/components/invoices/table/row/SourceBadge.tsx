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
    return null;
  }

  const isPaymentReport = submitMethod === 'Payment Report';
  const badgeClass = isPaymentReport 
    ? "bg-blue-100 text-blue-700 border border-blue-200" 
    : "bg-green-100 text-green-700 border border-green-200";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
            <FileBarChart className="h-3 w-3" />
            {isPaymentReport ? 'Payment' : 'A/R'}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Created from {submitMethod}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}