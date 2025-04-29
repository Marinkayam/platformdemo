
import { AlertTriangle } from "lucide-react";
import { Invoice } from "@/types/invoice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FieldLabelsProps {
  fields: Array<{ key: keyof Invoice, label: string }>;
  differences: Record<string, boolean>;
}

export function FieldLabels({ fields, differences }: FieldLabelsProps) {
  return (
    <div className="col-span-1">
      <div className="h-14 flex items-center font-medium text-sm">Field</div>
      {fields.map((field) => {
        const hasDifference = differences[field.key as string];
        
        return (
          <div 
            key={field.key} 
            className={`h-12 flex items-center justify-between font-medium text-sm ${
              hasDifference ? 'text-primary-700' : ''
            }`}
          >
            <span>{field.label}</span>
            {hasDifference && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">This field has different values across invoices</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      })}
    </div>
  );
}
