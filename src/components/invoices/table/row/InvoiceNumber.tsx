
import { AlertTriangle } from "lucide-react";
import { TableCell } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InvoiceNumberProps {
  number: string;
  hasWarning?: boolean;
  isPending: boolean;
  isCreditMemo?: boolean;
}

export function InvoiceNumber({ number, hasWarning, isPending, isCreditMemo }: InvoiceNumberProps) {
  return (
    <TableCell className="font-medium flex items-center gap-2 text-[14px]">
      {hasWarning && (
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      )}
      <div className="flex items-center gap-1.5">
        <span className={isPending ? "text-red-600 font-medium" : ""}>
          {number}
        </span>
        
        {isCreditMemo && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
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
    </TableCell>
  );
}
