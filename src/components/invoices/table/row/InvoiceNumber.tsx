
import { AlertTriangle, SquareStack } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InvoiceNumberProps {
  number: string;
  hasWarning?: boolean;
  status: string;
  isCreditMemo?: boolean;
  isDuplicate?: boolean;
}

export function InvoiceNumber({
  number,
  hasWarning,
  status,
  isCreditMemo,
  isDuplicate
}: InvoiceNumberProps) {
  const isPendingAction = status === "Pending Action";
  
  return (
    <div className="flex items-center gap-2 text-[14px]">
      {hasWarning && <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />}
      <div className="flex items-center gap-1.5 overflow-hidden max-w-[180px]">
        <span className={`truncate ${isPendingAction ? "text-black font-semibold" : "font-semibold"}`}>
          {number}
        </span>
        
        {isDuplicate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SquareStack className="h-4 w-4 text-red-500 flex-shrink-0" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicated invoice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {isCreditMemo && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex-shrink-0">
                  CM
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Credit Memo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
